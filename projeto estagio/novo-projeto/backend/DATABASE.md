# PC Builder Database

A base de dados foi configurada com sucesso no Docker MySQL.

## Estrutura da BD

### Tabelas Principais

1. **users** — Utilizadores registados
   - id, username, email, password_hash, first_name, last_name, profile_picture, bio
   
2. **component_categories** — Categorias de componentes
   - id, name, description, icon

3. **components** — Componentes de hardware
   - id, name, category_id, manufacturer, model, price, image_url, specifications, power_consumption, in_stock

4. **builds** — Builds de PC criadas por utilizadores
   - id, user_id, name, description, total_price, is_public

5. **build_components** — Relação entre builds e componentes
   - id, build_id, component_id, quantity, notes

6. **saved_builds** — Builds guardadas por utilizadores
   - id, build_id, user_id

## Conexão no Backend (Sequelize)

Os modelos Sequelize já foram criados em `backend/models/`:
- `User.js`
- `ComponentCategory.js`
- `Component.js`
- `Build.js`
- `index.js` (associações e exports)

### Importar os Modelos

```javascript
const db = require('./models');
const { User, Build, Component, ComponentCategory } = db;
```

### Exemplos de Uso

#### Criar um utilizador
```javascript
const user = await User.create({
  username: 'joao123',
  email: 'joao@example.com',
  password_hash: 'hashed_password',
  first_name: 'João',
  last_name: 'Silva',
});
```

#### Criar um componente
```javascript
const component = await Component.create({
  name: 'RTX 4080',
  category_id: 2, // GPU
  manufacturer: 'NVIDIA',
  model: '4080',
  price: 1299.99,
  power_consumption: 320,
  in_stock: true,
});
```

#### Criar uma build e adicionar componentes
```javascript
const build = await Build.create({
  user_id: 1,
  name: 'Gaming Beast 2026',
  description: 'High-end gaming build',
  is_public: true,
});

// Adicionar componentes à build
await build.addComponents([1, 2, 3]); // IDs dos componentes
```

#### Buscar uma build com componentes
```javascript
const build = await Build.findByPk(1, {
  include: ['Components', 'User'],
});
```

## Conexão no DBeaver

- **Host:** 127.0.0.1
- **Port:** 3307
- **Database:** pc_builder
- **User:** appuser
- **Password:** apppassword
- **SSL:** Disable

## Variáveis de Ambiente

Estas já estão configuradas em `.env`:
```
DB_HOST=db
DB_PORT=3306
DB_USER=appuser
DB_PASSWORD=apppassword
DB_NAME=pc_builder
DB_ROOT_PASSWORD=root
```

## Schema SQL

O arquivo `backend/schema.sql` contém o schema completo e pode ser re-importado se necessário.

## Próximos Passos

1. Adicionar rotas no backend para CRUD de componentes, builds, etc.
2. Adicionar autenticação (JWT com bcrypt para passwords)
3. Validação de compatibilidade entre componentes
4. API endpoints para a aplicação frontend

