# Task Manager - Projeto Backend com NestJS, Prisma e Docker

## 📖 Sobre o Projeto

O Task Manager é um projeto backend desenvolvido com NestJS, Prisma e PostgreSQL, rodando em um ambiente Docker para garantir facilidade no desenvolvimento e na implantação.

---

## 🚀 Tecnologias Utilizadas

* **NestJS**: Framework backend
* **Prisma**: ORM para banco de dados
* **PostgreSQL**: Banco de dados relacional
* **Docker**: Containerização
* **Nodemon**: Hot reload durante o desenvolvimento
* **Docker Compose**: Orquestração de containers

---

## ✅ Pré-requisitos

* Docker e Docker Compose instalados
* Node.js (versão 20 ou superior)
* npm (versão 9 ou superior)

---

## ⚙️ Configuração do Ambiente

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/task-manager.git
   cd task-manager
   ```

2. Crie um arquivo `.env` na raiz do projeto:

   ```bash
   touch .env
   ```

3. Adicione as seguintes variáveis ao arquivo `.env`:

   ```bash
   DATABASE_URL=postgresql://admin:admin@task-manager-db:5432/taskdb
   ```

---

## 🐋 Rodando a Aplicação (Desenvolvimento)

1. Suba os containers com o Docker Compose:

   ```bash
   docker-compose up --build
   ```

2. Acesse o container da API para rodar as migrações:

   ```bash
   docker exec -it task-manager-api sh
   npx prisma migrate dev --name init
   ```

3. Acesse a aplicação no navegador:

   ```
   ```

[http://localhost:3000](http://localhost:3000)

````

---

## 🛠️ Rodando a Aplicação (Produção)
1. Gere o build da aplicação:
```bash
npm run build
````

2. Suba os containers em modo produção:

   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

---

## 🗃️ Comandos Prisma

* Gerar cliente Prisma:

  ```bash
  npx prisma generate
  ```
* Rodar migrações:

  ```bash
  npx prisma migrate dev --name init
  ```
* Acessar o Prisma Studio:

  ```bash
  npx prisma studio
  ```

---

## 🌐 Acessando o Banco de Dados

1. Acesse o container do banco de dados:

   ```bash
   docker exec -it task-manager-db psql -U admin -d taskdb
   ```
2. Listar tabelas:

   ```sql
   \dt
   ```
3. Sair do PostgreSQL:

   ```sql
   \q
   ```

---

## 🔧 Troubleshooting

* Se o hot reload não funcionar, verifique o arquivo `nodemon.json` e o mapeamento de volumes no `docker-compose.yml`.
* Para limpar volumes e reconstruir os containers:

  ```bash
  docker-compose down -v --rmi all
  docker-compose up --build
  ```

---

## 📝 Contato

Caso tenha dúvidas ou sugestões, entre em contato com o desenvolvedor pelo email: [danisluz@gmail.com](mailto:danisluz@gmail.com)
