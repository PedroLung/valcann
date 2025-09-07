import { Request, Response, NextFunction } from "express";
import Joi from "joi";

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

  // 🚀 adiciona um campo novo em vez de sobrescrever req.query
  (req as any).validatedQuery = value;

  return next();
}
