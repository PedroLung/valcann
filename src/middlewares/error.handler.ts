import { Request, Response, NextFunction } from "express";

// Definindo uma interface para erros HTTP que podem ter um status opcional
export interface HttpError extends Error {
  status?: number;
}

/*

Estamos criando um middleware de tratamento de erros para uma aplicação Express.

O middleware errorHandler captura erros que ocorrem durante o processamento das requisições e envia uma resposta apropriada ao cliente.

Ele loga o erro no console para fins de depuração.

Se os cabeçalhos da resposta já foram enviados, ele passa o erro para o próximo middleware.

Se não, ele define o status da resposta (padrão 500 para erros internos do servidor) e envia um JSON com a mensagem de erro e o código de status.

*/

export function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  if (res.headersSent) return next(err); // Se os cabeçalhos já foram enviados, passa o erro adiante
  // Define o status da resposta (padrão 500) e envia a mensagem de erro em formato JSON
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
      code: status
    }
  });
}
