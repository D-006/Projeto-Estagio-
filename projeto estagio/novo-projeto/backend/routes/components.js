const express = require('express');
const { Component } = require('../models');

const router = express.Router();

// Listar todos os componentes
router.get('/', async (req, res) => {
  const { category } = req.query;
  const where = category ? { category } : {};
  const components = await Component.findAll({ where });
  res.json(components);
});

// Detalhe de um componente
router.get('/:id', async (req, res) => {
  const component = await Component.findByPk(req.params.id);
  if (!component) return res.status(404).json({ error: 'Componente não encontrado.' });
  res.json(component);
});

module.exports = router;
