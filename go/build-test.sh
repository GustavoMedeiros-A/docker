#!/bin/sh

set -e

echo "Gerando binário Go otimizado..."

CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o app main.go

echo "Construindo imagem Docker..."

docker build -t gutsmedeiros/fullcycle:latest .

echo "✅ Imagem criada com sucesso!"
docker images | grep fullcycle

