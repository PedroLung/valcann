# Users API - REST API Challenge

Uma API RESTful para gerenciamento de usuários com funcionalidades de listagem, busca e consulta individual, seguindo padrões de desenvolvimento e boas práticas.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express.js** para servidor HTTP
- **TypeORM** para ORM
- **SQLite** (desenvolvimento) / **PostgreSQL** (produção)
- **ESLint** + **Prettier** para padronização de código
- **CORS** habilitado

## 📁 Estrutura do Projeto

```
src/
├── controllers/     # Controladores HTTP
├── services/        # Lógica de negócio  
├── repositories/    # Acesso aos dados
├── models/          # Entidades do banco
├── middlewares/     # Middlewares customizados
├── utils/           # Utilitários e helpers
├── types/           # Definições de tipos TypeScript
└── config/          # Configurações da aplicação
```

## ⚙️ Configuração e Execução

### Pré-requisitos
- Node.js >= 16
- npm ou yarn

### Desenvolvimento Local

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env conforme necessário
   ```

3. **Popular banco com dados de teste**
   ```bash
   npm run seed
   ```

4. **Iniciar servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acessar a API**
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

```bash
npm run dev        # Inicia servidor em modo desenvolvimento
npm run build      # Compila TypeScript para JavaScript
npm run start      # Inicia servidor em modo produção
npm run seed       # Popula banco com dados de teste
npm run lint       # Executa ESLint
npm run format     # Formata código com Prettier
```

## 📡 Endpoints

### `GET /users`
Lista usuários com suporte a paginação, filtros e busca.

#### Parâmetros de Query
| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|---------|-----------|
| `page` | number | 1 | Página atual |
| `page_size` | number | 10 | Itens por página (máx: 50) |
| `q` | string | - | Busca por nome ou email |
| `role` | string | - | Filtro por função (`manager`, `analyst`, `viewer`, `admin`) |
| `is_active` | boolean | - | Filtro por status ativo |

#### Resposta de Sucesso (200)
```json
{
  "data": [
    {
      "id": 1,
      "name": "Felipe Silva",
      "email": "felipe@example.com",
      "role": "manager",
      "is_active": true,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "page_size": 10,
    "total_items": 25,
    "total_pages": 3,
    "has_next": true,
    "has_previous": false
  }
}
```

#### Exemplos de Uso
```bash
# Listar todos os usuários (página 1)
curl "http://localhost:3000/users"

# Buscar usuários por nome/email
curl "http://localhost:3000/users?q=Felipe"

# Filtrar por função e status
curl "http://localhost:3000/users?role=manager&is_active=true"

# Paginação personalizada
curl "http://localhost:3000/users?page=2&page_size=20"

# Combinando múltiplos filtros
curl "http://localhost:3000/users?page=1&page_size=10&q=Felipe&role=manager&is_active=true"
```

### `GET /users/{id}`
Retorna dados de um usuário específico.

#### Parâmetros de Path
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `id` | number | ID do usuário |

#### Resposta de Sucesso (200)
```json
{
  "data": {
    "id": 2,
    "name": "Ana Costa",
    "email": "ana@example.com",
    "role": "analyst",
    "is_active": true,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

#### Resposta de Erro (404)
```json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "Usuário não encontrado",
    "details": "Nenhum usuário encontrado com o ID fornecido"
  }
}
```

#### Exemplos de Uso
```bash
# Buscar usuário por ID
curl "http://localhost:3000/users/2"

# Caso de erro (usuário não encontrado)
curl "http://localhost:3000/users/999"
```

## 🔧 Padrões de Resposta

### Estrutura de Sucesso
```json
{
  "data": {}, // ou []
  "pagination": {} // apenas para listagens
}
```

### Estrutura de Erro
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem amigável",
    "details": "Detalhes técnicos (opcional)"
  }
}
```

### Códigos HTTP Utilizados
- `200` - Sucesso
- `400` - Requisição inválida
- `404` - Recurso não encontrado
- `422` - Entidade não processável
- `500` - Erro interno do servidor

## 🗄️ Banco de Dados

### Configuração
- **Desenvolvimento**: SQLite (arquivo local)
- **Produção**: PostgreSQL

Para alternar para PostgreSQL, ajuste as configurações em `src/config/ormconfig.ts`:

```typescript
export const dbConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // ...
}
```

### Modelo de Dados (User)
```typescript
{
  id: number;
  name: string;
  email: string;
  role: 'manager' | 'analyst' | 'viewer' | 'admin';
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
```

## 🔍 Logs e Monitoramento

A aplicação inclui logs estruturados para:
- Requisições HTTP (método, URL, status, tempo de resposta)
- Erros de aplicação e banco de dados
- Operações de busca e filtros aplicados

## 🌍 Variáveis de Ambiente

```bash
# App
PORT=3000

# Database (SQLite para desenvolvimento)
DB_TYPE=sqlite
DB_DATABASE=dev.sqlite

# Para PostgreSQL (produção), descomente e configure:
# DB_TYPE=postgres
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=postgres
# DB_PASSWORD=password
# DB_NAME=users_api
```

## 🧪 Exemplos de Teste

```bash
# Healthcheck
curl http://localhost:3000/health

# Listar usuários
curl http://localhost:3000/users

# Buscar usuário específico
curl http://localhost:3000/users/1

# Filtros avançados
curl "http://localhost:3000/users?q=admin&role=admin&is_active=true&page=1&page_size=5"
```

## 📝 Observações Técnicas

- CORS configurado para desenvolvimento local
- Validação de parâmetros de entrada
- Paginação com limites de segurança (máx 50 itens por página)
- Busca case-insensitive em nome e email
- Logs estruturados para debugging
- Tratamento padronizado de erros
- Código formatado com Prettier e ESLint

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request