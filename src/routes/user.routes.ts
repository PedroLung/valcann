import { Router } from "express";
import { listUsersHandler, getUserHandler } from "../controller/user.controller";
import { validateQuery } from "../middlewares/validate.middleware";

/*

Estamos criando um roteador (router) para gerenciar as rotas relacionadas aos usuários.

O roteador define duas rotas GET: uma para listar usuários com suporte a paginação e filtros, e outra para obter detalhes de um usuário específico pelo ID.

As rotas utilizam o middleware validateQuery para validar os parâmetros de consulta (query parameters) antes de chamar os handlers correspondentes.

*/
export const userRouter = Router();

userRouter.get("/", validateQuery, listUsersHandler);
userRouter.get("/:id", getUserHandler);
