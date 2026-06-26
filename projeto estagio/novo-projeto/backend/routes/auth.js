const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, RefreshToken } = require('../models');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || `${JWT_SECRET}_refresh`;
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || '3h';
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || '3h';

function signAccessToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email, name: user.username, type: 'access' },
    JWT_SECRET,
    { expiresIn: ACCESS_EXPIRES }
  );
}

async function createRefreshSession(user) {
  const jti = crypto.randomUUID();
  const refreshToken = jwt.sign(
    { userId: user.id, type: 'refresh', jti },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES }
  );
  const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  await RefreshToken.create({
    user_id: user.id,
    jti,
    expires_at: new Date(decoded.exp * 1000),
  });
  return refreshToken;
}

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Nome, email e senha são necessários.' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Senha deve ter pelo menos 6 caracteres.' });

    const username = name.trim();

    const existingByEmail = await User.findOne({ where: { email } });
    if (existingByEmail) {
      return res.status(400).json({ message: 'Email já registrado.' });
    }

    const existingByUsername = await User.findOne({ where: { username } });
    if (existingByUsername) {
      return res.status(400).json({ message: 'Nome de utilizador já está em uso.' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password_hash });

    res.status(201).json({
      message: 'Conta criada com sucesso!',
      user: { id: user.id, email: user.email, name: user.username }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ error: 'Credenciais inválidas.' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(401).json({ error: 'Credenciais inválidas.' });

    const accessToken = signAccessToken(user);
    const refreshToken = await createRefreshSession(user);

    res.json({
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.username }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Renovar access token (rotação do refresh token)
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken || typeof refreshToken !== 'string')
      return res.status(400).json({ error: 'refreshToken é obrigatório.' });

    let payload;
    try {
      payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch {
      return res.status(401).json({ error: 'Refresh token inválido ou expirado.' });
    }

    if (payload.type !== 'refresh' || !payload.jti || !payload.userId)
      return res.status(401).json({ error: 'Refresh token inválido.' });

    const session = await RefreshToken.findOne({
      where: { jti: payload.jti, revoked_at: null },
    });

    if (!session || session.user_id !== payload.userId)
      return res.status(401).json({ error: 'Sessão inválida.' });

    if (new Date(session.expires_at) < new Date()) {
      await session.update({ revoked_at: new Date() });
      return res.status(401).json({ error: 'Refresh token expirado.' });
    }

    const user = await User.findByPk(payload.userId);
    if (!user) {
      await session.update({ revoked_at: new Date() });
      return res.status(401).json({ error: 'Utilizador não encontrado.' });
    }

    await session.update({ revoked_at: new Date() });
    const accessToken = signAccessToken(user);
    const newRefreshToken = await createRefreshSession(user);

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Logout (revoga o refresh token enviado)
router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken || typeof refreshToken !== 'string')
      return res.status(400).json({ error: 'refreshToken é obrigatório.' });

    let payload;
    try {
      payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch {
      return res.json({ message: 'Sessão já inválida.' });
    }

    if (payload.type === 'refresh' && payload.jti) {
      await RefreshToken.update(
        { revoked_at: new Date() },
        { where: { jti: payload.jti, revoked_at: null } }
      );
    }

    res.json({ message: 'Logout efetuado.' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Middleware de autenticação (access token)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ error: 'Token de acesso necessário.' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.type === 'refresh')
      return res.status(403).json({ error: 'Use o access token.' });
    if (payload.type && payload.type !== 'access')
      return res.status(403).json({ error: 'Token inválido.' });
    req.user = payload;
    next();
  } catch {
    return res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
};

// Perfil
router.get('/profile', authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.user.userId);
  if (!user)
    return res.status(404).json({ error: 'Utilizador não encontrado.' });

  res.json({ user: { id: user.id, email: user.email, name: user.username } });
});

// Apagar conta
router.delete('/delete-account', authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.user.userId);
  if (!user)
    return res.status(404).json({ error: 'Utilizador não encontrado.' });

  await RefreshToken.destroy({ where: { user_id: user.id } });
  await user.destroy();
  res.json({ message: 'Conta apagada com sucesso.' });
});

module.exports = router;
module.exports.authenticateToken = authenticateToken;
