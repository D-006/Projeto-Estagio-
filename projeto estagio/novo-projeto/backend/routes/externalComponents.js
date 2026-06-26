const express = require('express');
const path = require('path');

const router = express.Router();

// Endpoint somente para testar/conectar uma fonte externa que retorna JSON.
// Serve os dados de backend/data/components.json
router.get('/', (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'data', 'components.json');
    // eslint-disable-next-line import/no-dynamic-require
    const payload = require(filePath);
    res.json(payload);
  } catch (err) {
    console.error('Erro ao ler components.json:', err);
    res.status(500).json({ error: 'Falha ao carregar fonte externa de componentes.' });
  }
});

module.exports = router;

