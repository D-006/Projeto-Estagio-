const express = require('express');
const { Build, Component } = require('../models');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token necessário.' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido.' });
    req.user = user;
    next();
  });
};

// Listar builds do utilizador
router.get('/', authenticateToken, async (req, res) => {
  const builds = await Build.findAll({
    where: { user_id: req.user.userId },
    include: [Component],
  });
  res.json(builds);
});

// Criar build
router.post('/', authenticateToken, async (req, res) => {
  const { name, description, component_ids, total_price } = req.body;
  const build = await Build.create({ user_id: req.user.userId, name, description, total_price });
  if (component_ids?.length) await build.setComponents(component_ids);
  res.status(201).json(build);
});

// Apagar build
router.delete('/:id', authenticateToken, async (req, res) => {
  const build = await Build.findOne({ where: { id: req.params.id, user_id: req.user.userId } });
  if (!build) return res.status(404).json({ error: 'Build não encontrada.' });
  await build.destroy();
  res.json({ message: 'Build apagada.' });
});

module.exports = router;