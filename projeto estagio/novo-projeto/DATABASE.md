# Base de Dados - PC Builder

## Configuração da Base de Dados MySQL com Docker

A base de dados foi configurada para executar em um container Docker MySQL 8.0.

### Variáveis de Ambiente

O arquivo `.env` contém as seguintes configurações:

```env
# Database Configuration
DB_HOST=db          # Nome do serviço Docker
DB_PORT=3306        # Porta padrão MySQL
DB_USER=appuser     # Utilizador da base de dados
DB_PASSWORD=apppassword  # Senha do utilizador
DB_NAME=pc_builder  # Nome da base de dados
DB_ROOT_PASSWORD=root    # Senha do root MySQL
```

### Executar o Docker Compose

Para iniciar todos os serviços (frontend, backend e base de dados):

```bash
docker-compose up -d
```

Para parar os serviços:

```bash
docker-compose down
```

Para remover os dados da base de dados também:

```bash
docker-compose down -v
```

### Conectar à Base de Dados

**Via terminal/CLI:**

```bash
docker exec -it pc-builder-db mysql -u appuser -p pc_builder
# Inserir password quando pedido: apppassword
```

**Via ferramentas MySQL (como MySQL Workbench):**

- Host: `localhost`
- Port: `3306`
- User: `appuser`
- Password: `apppassword`
- Database: `pc_builder`

### Estrutura da Conexão no Backend

O backend utiliza:
- **ORM**: Sequelize
- **Driver**: mysql2
- **Arquivo de Configuração**: `backend/db.js`

O arquivo `backend/server.js` sincroniza automaticamente os modelos com a base de dados ao iniciar.

### Criar Modelos Sequelize

Exemplo de criar um modelo de User:

```javascript
// backend/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = User;
```

Depois, importe o modelo no `server.js` antes de iniciar:

```javascript
require('./models/User');
// ... outros modelos ...

await sequelize.sync();
```

### Health Check

A base de dados tem um health check configurado que verifica a conexão a cada 20 segundos.

### Dados Persistentes

Os dados da base de dados são armazenados em um volume Docker chamado `db_data`, mantendo os dados mesmo quando o container é parado.

## Troubleshooting

**Erro de conexão:**
- Certifique-se que o container MySQL está em execução: `docker ps`
- Verifique os logs: `docker logs pc-builder-db`

**Porta já em uso:**
- Altere a porta no `docker-compose.yml` para outra (ex: 3307:3306)

**Resetar base de dados:**
```bash
docker-compose down -v
docker-compose up -d
```
