FROM node:20-alpine as builder

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do projeto
COPY . .

# Adicionar argumentos e variáveis de ambiente
ARG VITE_APP_BACKEND_ADDRESS
ENV VITE_APP_BACKEND_ADDRESS $VITE_APP_BACKEND_ADDRESS

# Instalar dependências e criar a build de produção
RUN npm install
RUN npm run build

# Etapa 2: Preparar os arquivos de build
FROM alpine:3.18
WORKDIR /app

# Copiar apenas os arquivos estáticos gerados
COPY --from=builder /app/dist /app