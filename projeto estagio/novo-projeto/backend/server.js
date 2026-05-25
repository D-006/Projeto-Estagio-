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

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

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
    process.exit(1);
  }
};

startServer();
module.exports = app;
