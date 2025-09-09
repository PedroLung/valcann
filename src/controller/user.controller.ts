import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { ListUsersParams } from "../services/user.service";

// Extendendo a interface Request para incluir validatedQuery
interface RequestWithValidatedQuery extends Request {
  validatedQuery: ListUsersParams;
}

/*

Estamos criando um controller para gerenciar as requisições relacionadas a usuários.

A função listUsersHandler lida com requisições para listar usuários, aplicando paginação e filtros.
A função getUserHandler lida com requisições para obter um usuário específico pelo seu ID.

Cada função extrai os parâmetros necessários da requisição, chama o serviço correspondente e retorna a resposta apropriada.

*/

export async function listUsersHandler(req: RequestWithValidatedQuery, res: Response, next: NextFunction) {
  // Extrai os parâmetros de paginação e filtros da requisição (req.validatedQuery)
  // Chama o serviço userService.listUsers para obter a lista de usuários
  // Retorna a resposta com os dados e informações de paginação
  // Em caso de erro, passa o erro para o próximo middleware (next)
  try {
    const result = await userService.listUsers((req.validatedQuery!));
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getUserHandler(req: Request, res: Response, next: NextFunction) {
  // Extrai o ID do usuário dos parâmetros da requisição (req.params)
  // Chama o serviço userService.getUserById para obter o usuário pelo ID
  // Se o usuário não for encontrado, retorna um erro 404
  // Se encontrado, retorna a resposta com os dados do usuário
  // Em caso de erro, passa o erro para o próximo middleware (next)
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
}
