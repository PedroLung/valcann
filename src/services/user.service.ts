import { userRepository } from "../repositories/user.repository";

/*

Estamos criando um serviço para gerenciar usuários, com funções para listar usuários com paginação e filtros, e para obter um usuário por ID.

A função listUsers aceita parâmetros para paginação (page, page_size) e filtros (q para busca por nome ou email, role, is_active).

Estamos utilizando o repositório de usuários (userRepository) para interagir com o banco de dados.

A função getUserById busca um usuário específico pelo seu ID.

*/

// Importante: Aqui não estamos lidando com requisições HTTP diretamente, mas sim com a lógica de negócio relacionada aos usuários. Essa separação ajuda a manter o código organizado e facilita a manutenção.

// Interface para os parâmetros de listagem de usuários
export interface ListUsersParams {
  page?: number;
  page_size?: number | string;
  q?: string;
  role?: string;
  is_active?: boolean | string;
}

type userWhere = {
  role?: string;
  is_active?: boolean;
}

export async function listUsers({ page = 1, page_size = 10, q, role, is_active }: ListUsersParams) {
  const repo = userRepository(); // Obtém o repositório de usuários
  const take = Math.min(Number(page_size) || 10, 50); // Limita o tamanho da página a no máximo 50
  const skip = (Number(page) - 1) * take; // Calcula o número de registros a pular com base na página atual

  // Construindo o objeto 'where' para os filtros
  // role -> filtra por papel (role)
  // is_active -> filtra por status ativo/inativo

  const where: userWhere = {};
  if (role) where.role = role;
  if (typeof is_active !== "undefined") where.is_active = is_active === "true" || is_active === true;

  // Criando a query com os filtros e paginação
  // Se 'q' for fornecido, adiciona uma condição para buscar por nome ou email que contenha 'q'
  const qb = repo.createQueryBuilder("user").where(where);

  // Filtro de busca por nome ou email
  if (q) {
    qb.andWhere("(user.name LIKE :q OR user.email LIKE :q)", { q: `%${q}%` });
  }

  // Executa a query com paginação e retorna os resultados junto com informações de paginação
  // orderBy -> ordena os resultados pelo ID do usuário em ordem crescente
  // skip -> pula os primeiros 'skip' registros
  // take -> limita o número de registros retornados a 'take'
  // getManyAndCount -> retorna os registros e a contagem total de registros que correspondem aos filtros
  const [data, total] = await qb.orderBy("user.id", "ASC").skip(skip).take(take).getManyAndCount();

  // Retorna os dados e informações de paginação
  return {
    data,
    pagination: {
      page: Number(page),
      page_size: take,
      total,
      total_pages: Math.ceil(total / take)
    }
  };
}

// Função para obter um usuário por ID
export async function getUserById(id: number) {
  const repo = userRepository();
  return repo.findOneBy({ id });
}
