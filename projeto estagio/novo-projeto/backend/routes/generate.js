const express = require('express');

// Rota dedicada para gerar uma build para o front.
// O front espera: { budget, type, totalPrice, remainingBudget, components }

const router = express.Router();

router.post('/generate', (req, res) => {
  const { budget, type } = req.body;

  const budgetNum = Number(budget);
  if (!Number.isFinite(budgetNum) || budgetNum <= 0) {
    return res.status(400).json({ error: 'Orçamento inválido.' });
  }

  const buildType = type === 'office' ? 'office' : 'gaming';

  // Placeholder: esta implementação é determinística e só para fazer o front funcionar.
  // Se quiseres, mais tarde substituímos por uma regra/heurística real.
  const totalPrice = Math.round(budgetNum * 0.95 * 100) / 100;
  const remainingBudget = Math.round((budgetNum - totalPrice) * 100) / 100;

  const base =
    buildType === 'office'
      ? {
          cpu: { name: 'Intel Core i5', price: 300, specs: 'Boa eficiência para produtividade' },
          gpu: { name: 'Sem placa dedicada', price: 0, specs: 'Gráficos integrados suficientes' },
          ram: { name: '32GB DDR4', price: 90, specs: 'Multitarefa e estabilidade' },
          storage: { name: '1TB NVMe SSD', price: 70, specs: 'Arranque rápido e apps leves' },
        }
      : {
          cpu: { name: 'Intel Core i7-13700K', price: 450, specs: 'Alto desempenho multi-core' },
          gpu: { name: 'NVIDIA RTX 4070', price: 550, specs: 'Excelente em 1440p' },
          ram: { name: '32GB DDR5', price: 140, specs: 'Frequência e capacidade para gaming' },
          storage: { name: '1TB NVMe SSD', price: 90, specs: 'Velocidade para jogos e carregamentos' },
        };

  const components = {
    processador: { ...base.cpu, price: base.cpu.price },
    placa_de_video: { ...base.gpu, price: base.gpu.price },
    memoria: { ...base.ram, price: base.ram.price },
    armazenamento: { ...base.storage, price: base.storage.price },
  };

  return res.json({
    budget: budgetNum,
    type: buildType,
    totalPrice,
    remainingBudget,
    components,
  });
});

module.exports = router;

