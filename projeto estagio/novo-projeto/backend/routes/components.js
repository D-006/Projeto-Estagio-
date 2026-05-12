const express = require('express');
const router = express.Router();

// Import components data
const components = require('./components-data');

// Get all components
router.get('/', (req, res) => {
  try {
    res.json(components);
  } catch (error) {
    console.error('Error fetching components:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get components by type
router.get('/:type', (req, res) => {
  try {
    const { type } = req.params;
    const filteredComponents = components.filter(comp => comp.type === type);
    res.json(filteredComponents);
  } catch (error) {
    console.error('Error fetching components by type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get component by ID
router.get('/component/:id', (req, res) => {
  try {
    const { id } = req.params;
    const component = components.find(comp => comp.id === parseInt(id));
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }
    res.json(component);
  } catch (error) {
    console.error('Error fetching component:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;