const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Nome, email e senha são necessários.' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Senha deve ter pelo menos 6 caracteres.' });

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: 'Email já registrado.' });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username: name.trim(), email, password_hash });

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

    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.username }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ error: 'Token de acesso necessário.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ error: 'Token inválido.' });
    req.user = user;
    next();
  });
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

  await user.destroy();
  res.json({ message: 'Conta apagada com sucesso.' });
});

module.exports = router;
module.exports.authenticateToken = authenticateToken;