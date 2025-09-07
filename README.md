# Desafio Backend - Users API

## Como rodar (dev, local)
1. Instale dependências: `npm install`
2. Rodar seed: `npm run seed`
3. Subir servidor: `npm run dev`
4. API disponível em http://localhost:3000

## Endpoints
GET /users
Query params:
- page (default 1)
- page_size (default 10, max 50)
- q (busca por nome/email)
- role (manager|analyst|viewer|admin)
- is_active (true|false)

Exemplo:
curl "http://localhost:3000/users?page=1&page_size=10&q=Felipe&role=manager"

GET /users/{id}
Exemplo:
curl "http://localhost:3000/users/2"

## Observações
- Usamos TypeORM + SQLite (dev). Para Postgres ajustar `ormconfig.ts`.
- ESLint/Prettier configurados.
