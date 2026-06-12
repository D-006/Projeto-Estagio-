const express = require('express');
const { getMarketplaceComponents } = require('../services/componentSources');

const router = express.Router();

// Listar todos os componentes. Busca dados de marketplaces externos ou utiliza fallback local.
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const components = await getMarketplaceComponents();

    const filtered = category
      ? components.filter((item) => item.category === category || item.type === category)
      : components;

    res.json(filtered);
  } catch (error) {
    console.error('Erro ao carregar componentes do marketplace:', error);
    res.status(500).json({ error: 'Falha ao carregar componentes.' });
  }
});

// Detalhe de um componente
router.get('/:id', async (req, res) => {
  try {
    const components = await getMarketplaceComponents();
    const component = components.find((item) => String(item.id) === String(req.params.id));

    if (!component) return res.status(404).json({ error: 'Componente não encontrado.' });
    res.json(component);
  } catch (error) {
    console.error('Erro ao buscar detalhe do componente:', error);
    res.status(500).json({ error: 'Falha ao carregar o componente.' });
  }
});

module.exports = router;
