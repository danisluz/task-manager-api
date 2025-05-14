# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install

COPY . .

# Etapa de produção
FROM node:20-alpine

WORKDIR /app

# Copia o código compilado da etapa anterior
COPY --from=builder /app .

# Comando para iniciar o serviço em produção
CMD ["npm", "run", "start:prod"]
