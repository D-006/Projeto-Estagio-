#!/bin/bash
# Development startup script for PC Builder

echo "🚀 PC Builder - Iniciando Frontend e Backend..."
echo ""

# Check if node_modules exists in backend
if [ ! -d "backend/node_modules" ]; then
  echo "📦 Instalando dependências do backend..."
  cd backend
  npm install
  cd ..
fi

# Check if node_modules exists in frontend
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependências do frontend..."
  npm install
fi

echo ""
echo "✅ Dependências instaladas com sucesso!"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "🔌 Backend: http://localhost:5000"
echo ""
echo "Iniciando servidores..."
echo ""

# Install concurrently if not already installed
if ! npm list concurrently &> /dev/null; then
  npm install --save-dev concurrently
fi

# Start both servers
concurrently \
  "cd backend && npm run dev" \
  "npm run dev"
