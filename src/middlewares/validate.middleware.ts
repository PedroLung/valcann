import { Request, Response, NextFunction } from "express";
import Joi from "joi";

/*

Estamos criando um middleware para validar os parâmetros de consulta (query parameters) em requisições HTTP.

O middleware validateQuery utiliza a biblioteca Joi para definir um esquema de validação para os parâmetros esperados na query string.

Se as validações falharem, o middleware responde com um erro 400 (Bad Request) e uma mensagem de erro.

Se as validações forem bem-sucedidas, os parâmetros validados são anexados ao objeto de requisição (req) para uso posterior nos handlers.

*/

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  page_size: Joi.number().integer().min(1).max(50).default(10),
  q: Joi.string().allow("", null),
  role: Joi.string().valid("manager", "analyst", "viewer", "admin"),
  is_active: Joi.any().valid("true", "false", true, false)
});

export function validateQuery(req: Request, res: Response, next: NextFunction) {
  const { error, value } = querySchema.validate(req.query, { convert: true });
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  (req as any).validatedQuery = value;

  return next();
}
