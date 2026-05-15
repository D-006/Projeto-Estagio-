# 💻 PC Builder

Uma aplicação web desenvolvida em React que permite aos utilizadores criar configurações de computadores (builds) personalizadas com base no orçamento e tipo de utilização (gaming ou escritório).

---

## 🚀 Funcionalidades

- 🔐 **Sistema de autenticação** — Login e criação de conta
- 💰 **Orçamento flexível** — Define o teu orçamento
- 🎮 **Tipos de build** — Gaming ou Escritório
- ⚙️ **Geração automática** — Recomendações de componentes
- 📊 **Visualização detalhada** — Peças, specs e preço total
- 💾 **Persistência de dados** — Guarda builds criadas
- 🧩 **Catálogo de componentes** — Lista completa com links de compra
- 🎨 **Interface moderna** — Design responsivo e intuitivo

---

## 🛠️ Stack Tecnológico

### Frontend
- ⚛️ **React** — UI library
- ⚡ **Vite** — Build tool e dev server
- 🌐 **React Router** — Navegação
- 📡 **Axios** — HTTP requests

### Backend
- 🟢 **Node.js** — Runtime
- 📦 **Express** — Web framework
- 🔐 **JWT** — Autenticação
- 🔒 **bcryptjs** — Hash de senhas
- 📚 **Sequelize** — ORM (preparado para DB)

---

## 📁 Estrutura do Projeto

```
novo-projeto/
├── src/                    # Frontend React
│   ├── App.jsx
│   ├── Home.jsx
│   ├── Build.jsx
│   ├── Components.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Layout.jsx
│   ├── styles.css
│   └── main.jsx
├── backend/                # Backend Node.js/Express
│   ├── routes/
│   │   ├── auth.js
│   │   ├── components.js
│   │   ├── build.js
│   │   └── components-data.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
├── package.json
├── vite.config.js
├── start-dev.sh           # Script para Linux/Mac
├── start-dev.ps1          # Script para Windows
└── README.md
```

---

## ⚡ Quick Start

### Opção 1: Script automático (Windows)
```powershell
powershell -ExecutionPolicy Bypass -File start-dev.ps1
```

### Opção 2: Script automático (Linux/Mac)
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Opção 3: Manual

#### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
# Servidor em http://localhost:5000
```

#### Terminal 2 - Frontend
```bash
npm install
npm run dev
# Aplicação em http://localhost:5173
```

---

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/signup` — Criar conta
  - Body: `{ "email": "user@example.com", "password": "pass123" }`
- `POST /api/auth/login` — Fazer login
  - Body: `{ "email": "user@example.com", "password": "pass123" }`
- `GET /api/auth/profile` — Ver perfil (requer token)

### Componentes
- `GET /api/components` — Listar todos
- `GET /api/components/:type` — Filtrar por tipo (cpu, gpu, ram, etc)
- `GET /api/components/component/:id` — Detalhe específico

### Build
- `POST /api/build/generate` — Gerar build
  - Body: `{ "budget": 1000, "type": "gaming" }`

### Health Check
- `GET /api/health` — Status do servidor

---

## 🔐 Autenticação

O sistema usa **JWT (JSON Web Tokens)** para autenticação segura.

**Credenciais de teste:**
- Email: `admin@pcbuilder.com`
- Senha: `admin123`

---

## 🎨 Interface

- **Tema escuro** — Reduz fadiga ocular
- **Cards responsivos** — Adapta-se a qualquer tamanho
- **Navegação intuitiva** — Menu em header
- **Autenticação em destaque** — Login/Signup no topo

---

## 🚀 Deploy

### Frontend
```bash
npm run build
# Outputs para `dist/`
```

### Backend
Configurar variáveis de ambiente em `.env` e fazer deploy em plataformas como Heroku, Railway, Render, etc.

### Docker
```bash
docker compose up --build
```

- Frontend: http://localhost/
- Backend: http://localhost:5000/

Se desejar, defina `JWT_SECRET` no ambiente antes de iniciar:
```bash
JWT_SECRET=super-secret docker compose up --build
```

---

## 📝 Notas

- O banco de dados está atualmente em **mock** (em memória)
- Para produção, integrar com **MySQL** ou **MongoDB**
- Configurar `JWT_SECRET` em ambiente seguro
- Adicionar HTTPS em produção

---

## 👨‍💻 Autor

Desenvolvido para aprender Full Stack Development.

---

## 📄 Licença

ISC
