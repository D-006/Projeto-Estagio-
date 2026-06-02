# 💻 PC Builder

Uma aplicação web desenvolvida em React que permite aos utilizadores criar configurações de computadores (builds) personalizadas com base no orçamento e tipo de utilização (gaming ou escritório).

---

## 🚀 Funcionalidades

- 🔐 **Autenticação** — Access JWT curto + refresh token com rotação e sessões em base de dados
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
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── pages/              # Ecrãs (rotas)
│   │   ├── Home.jsx
│   │   ├── Build.jsx
│   │   ├── Components.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Profile.jsx
│   │   ├── AccountHome.jsx
│   │   └── NotFound.jsx
│   ├── components/         # UI partilhada
│   │   ├── Layout.jsx
│   │   └── SavedBuilds.jsx
│   ├── lib/                # Utilitários (tokens / JWT no cliente)
│   │   └── auth.js
│   ├── services/           # Cliente HTTP (Axios + renovação automática)
│   │   └── api.js
│   ├── styles/
│   │   └── globals.css
│   └── assets/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── migrations/         # SQL para BDs já existentes
│   ├── server.js
│   ├── db.js
│   ├── schema.sql
│   └── package.json
├── package.json
├── vite.config.js
├── start-dev.sh
├── start-dev.ps1
└── README.md
```

**BD existente:** executar uma vez o script `backend/migrations/001_add_refresh_sessions.sql` para criar a tabela de sessões de refresh (não altera credenciais de ligação).

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

Em desenvolvimento, o Vite encaminha os pedidos `/api/*` para o backend (`http://localhost:5000` por omissão). Podes alterar o destino com a variável de ambiente `VITE_DEV_PROXY_TARGET` ao arrancar o Vite.

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

### Docker (produção — Nginx + API empacotadas)

```bash
docker compose up --build
```

- Frontend: http://localhost/
- Backend: http://localhost:5000/

### Docker (desenvolvimento — código sincronizado + hot reload)

Volumes montam o teu código; o backend usa **nodemon** e o frontend **Vite** com proxy para a API.

```bash
npm run docker:dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

Com **`docker compose watch`**, o Docker **reconstrói** os serviços quando alteras `package.json` / `package-lock.json` (dependências novas):

```bash
npm run docker:dev:watch
```

### Atualização automática da imagem MySQL (Watchtower)

O serviço **Watchtower** (perfil `auto-update`) verifica imagens com etiqueta e faz *pull* de versões novas (por defeito a cada 24h). Só a base de dados está etiquetada para atualização — as imagens que constróis localmente (`build:`) não são substituídas pelo Hub.

```bash
npm run docker:watchtower
```

Para parar o Watchtower: `docker compose --profile auto-update down` (ou `docker stop` no contentor).

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
