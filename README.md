# 💻 PC Builder

Este projeto consiste numa aplicação web desenvolvida em React que permite aos utilizadores criar configurações de computadores (builds) personalizadas com base no orçamento e tipo de utilização (gaming ou escritório).

---

## 🚀 Funcionalidades

- 🔐 Sistema de login e criação de conta
- 💰 Inserção de orçamento
- 🎮 Escolha do tipo de build (Gaming / Escritório)
- ⚙️ Geração automática de builds
- 📊 Visualização das peças e preço total
- 💾 Guardar builds no perfil do utilizador
- 🗑️ Apagar builds guardadas
- 🧩 Visualização de componentes disponíveis
- 🔗 Links para compra de componentes

---

## 🧠 Estrutura da Base de Dados (3FN)

O sistema segue a Terceira Forma Normal (3FN), garantindo:
- ausência de redundância
- organização eficiente dos dados
- integridade entre entidades

### Entidades principais:
- Utilizador
- Build
- Componente
- Categoria
- Build_Componente

---

## 📊 Diagrama Entidade-Relação

O sistema inclui um diagrama ER com:
- chaves primárias (PK)
- chaves estrangeiras (FK)
- relações 1:N e N:N

---

## ⚙️ Tecnologias Utilizadas

- ⚛️ React
- ⚡ Vite
- 💾 LocalStorage (persistência de dados)
- 🌐 HTML, CSS, JavaScript

---

## 📦 Instalação

```bash
# Clonar o projeto
git clone <url-do-repositorio>

# Entrar na pasta
cd pc-builder

# Instalar dependências
npm install

# Iniciar o servidor
npm run dev
