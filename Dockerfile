# Etapa 1: Build do Frontend
FROM node:20-alpine as builder

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do projeto para o container
COPY . .

# Passar argumentos e configurá-los como variáveis de ambiente
ARG VITE_APP_BACKEND_ADDRESS
ENV VITE_APP_BACKEND_ADDRESS=$VITE_APP_BACKEND_ADDRESS

# Instalar dependências e gerar os arquivos de build
RUN npm install
RUN npm run build

# Etapa 2: Exportar os arquivos de build para o sistema host
FROM alpine:latest

# Criar um diretório de trabalho para exportar os arquivos
WORKDIR /output

# Copiar os arquivos de build da etapa anterior
COPY --from=builder /app/dist ./

# Instrução para fins de debug (opcional)
CMD ["ls", "-la"]
