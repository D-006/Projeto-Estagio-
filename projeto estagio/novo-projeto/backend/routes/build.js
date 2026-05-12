const express = require('express');
const router = express.Router();

// Import components data (in a real app, this would come from a database)
const components = require('./components-data');

router.post('/generate', (req, res) => {
  try {
    const { budget, type } = req.body;

    if (!budget || !type) {
      return res.status(400).json({ error: 'Budget and type are required' });
    }

    const budgetNum = parseFloat(budget);
    if (isNaN(budgetNum) || budgetNum <= 0) {
      return res.status(400).json({ error: 'Invalid budget amount' });
    }

    // Generate build based on type and budget
    const build = generateBuild(budgetNum, type);

    if (!build) {
      return res.status(400).json({ error: 'Unable to generate build with given budget and type' });
    }

    res.json(build);
  } catch (error) {
    console.error('Error generating build:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function generateBuild(budget, type) {
  // Component categories needed for a complete build
  const categories = ['cpu', 'gpu', 'ram', 'storage', 'motherboard', 'psu', 'case'];

  // Priority order based on build type
  let priorityOrder;
  if (type === 'gaming') {
    priorityOrder = ['gpu', 'cpu', 'ram', 'storage', 'motherboard', 'psu', 'case'];
  } else if (type === 'office') {
    priorityOrder = ['cpu', 'ram', 'storage', 'motherboard', 'gpu', 'psu', 'case'];
  } else {
    priorityOrder = ['cpu', 'gpu', 'ram', 'storage', 'motherboard', 'psu', 'case'];
  }

  let selectedComponents = {};
  let totalPrice = 0;
  let remainingBudget = budget;

  // First pass: select minimum viable components
  for (const category of categories) {
    const categoryComponents = components.filter(comp => comp.type === category);
    categoryComponents.sort((a, b) => a.price - b.price); // Cheapest first

    // Take the cheapest component for now
    if (categoryComponents.length > 0) {
      const component = categoryComponents[0];
      selectedComponents[category] = component;
      totalPrice += component.price;
      remainingBudget = budget - totalPrice;
    }
  }

  // Check if basic build is within budget
  if (totalPrice > budget) {
    return null; // Even cheapest components exceed budget
  }

  // Second pass: upgrade high-priority components if budget allows
  for (const category of priorityOrder.slice(0, 3)) {
    const currentComponent = selectedComponents[category];
    const categoryComponents = components.filter(comp => comp.type === category);
    categoryComponents.sort((a, b) => b.price - a.price); // Most expensive first

    for (const component of categoryComponents) {
      const priceDifference = component.price - currentComponent.price;
      if (priceDifference > 0 && totalPrice + priceDifference <= budget) {
        selectedComponents[category] = component;
        totalPrice += priceDifference;
        remainingBudget = budget - totalPrice;
        break;
      }
    }
  }

  return {
    components: selectedComponents,
    totalPrice: Math.round(totalPrice * 100) / 100,
    budget: budget,
    type: type,
    remainingBudget: Math.round(remainingBudget * 100) / 100
  };
}

module.exports = router;