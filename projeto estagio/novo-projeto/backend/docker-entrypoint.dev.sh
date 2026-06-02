#!/bin/sh
set -e
cd /app
if [ ! -x node_modules/.bin/nodemon ] 2>/dev/null; then
  echo "[dev] A instalar dependências do backend..."
  npm install
fi
exec "$@"
