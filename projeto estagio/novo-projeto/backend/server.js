const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/components', require('./routes/components'));
app.use('/api/build', require('./routes/build'));
app.use('/api/build', require('./routes/generate'));
app.use('/api/build', require('./routes/generate'));

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// Debug: listar rotas registadas (temporário)
app.get('/debug/routes', (req, res) => {
  try {
    const routes = [];
    app._router.stack.forEach(mw => {
      if (mw.route) {
        const methods = Object.keys(mw.route.methods).join(',');
        routes.push({ path: mw.route.path, methods });
      } else if (mw.name === 'router' && mw.handle && mw.handle.stack) {
        mw.handle.stack.forEach(r => {
          if (r.route) {
            const methods = Object.keys(r.route.methods).join(',');
            routes.push({ path: r.route.path, methods });
          }
        });
      }
    });
    res.json(routes);
  } catch (e) {
    res.status(500).json({ error: 'Falha ao listar rotas.' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.use('*', (req, res) => res.status(404).json({ error: 'Rota não encontrada.' }));

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established successfully');
    app.listen(PORT, () => console.log(`✓ Server is running on port ${PORT}`));
  } catch (error) {
    console.error('✗ Failed to connect to database:', error);
    console.error('DB config:', {
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_NAME: process.env.DB_NAME,
    });
    console.warn('Continuing without a database connection — some features may be disabled.');
    // Start the server anyway so routes that don't require the DB (like /api/build/generate)
    // remain available for the frontend to call, improving developer experience.
    app.listen(PORT, () => console.log(`✓ Server is running on port ${PORT} (DB disconnected)`));
  }
};

startServer();
module.exports = app;
