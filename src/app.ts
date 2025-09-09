import cors from "cors";
import express from "express";
import "reflect-metadata";
import { errorHandler } from "./middlewares/error.handler";
import { userRouter } from "./routes/user.routes";

/*

Estamos criando a aplicação Express, configurando middlewares globais e registrando as rotas.
O Cors serve para permitir requisições de diferentes origens.
O userRouter contém todas as rotas relacionadas a usuários.
E o errorHandler é um middleware para tratar erros de forma centralizada.

Primeiro importamos os módulos necessários, incluindo o Express, CORS, e o roteador de usuários.
Depois, criamos uma função createApp que configura a aplicação Express. 

Após isso adicionamos o middleware CORS para permitir requisições de diferentes origens. 

Em seguida, configuramos o middleware para parsear JSON no corpo das requisições.
Depois, registramos o roteador de usuários na rota "/users".

Finalmente, adicionamos um middleware de tratamento de erros para capturar e responder a erros de forma consistente.

*/

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/users", userRouter);
  app.use(errorHandler);
  return app;
};
