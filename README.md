# 📚 Library CRUD API

API REST para gerenciamento de biblioteca, permitindo o controle total (CRUD) de livros e suas respectivas editoras.

## 🛠️ Tecnologias
- **TypeScript** & Node.js
- **Express** (Framework)
- **PostgreSQL** (Banco de dados)
- **Docker** (Containerização)

## 📂 Estrutura de Pastas
- `src/`: Código fonte do projeto.
- `routes/`: Definição das rotas (Router).
- `infra/`: Configurações de infraestrutura (Banco de dados).

## 🗄️ O que o sistema faz?
- **CRUD de Livros:** Cadastro, listagem (com JOIN de editoras), atualização e deleção.
- **CRUD de Editoras:** Gerenciamento completo das entidades responsáveis pelos livros.
- **Relacionamento:** Modelagem 1:N (uma editora para muitos livros) via Foreign Keys.

## 🚀 Como rodar
1. Instale as dependências: `npm install`
2. Suba o banco com Docker: `docker-compose up -d`
3. Inicie o servidor: `npm run dev`

## 📍 Principais Rotas
- `GET /books`: Lista livros com dados das editoras.
- `POST /books`: Cadastra novo livro (exige `publisher_id`).
- `GET /publishers`: Lista todas as editoras cadastradas.
- `POST /publishers`: Cadastra nova editora.
- `PUT` / `DELETE`: Disponíveis para ambas as entidades via `/id`.

---
💡 *Projeto desenvolvido para estudos de backend relacional com TypeScript.*
