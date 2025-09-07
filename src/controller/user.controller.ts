import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export async function listUsersHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await userService.listUsers((req as any).validatedQuery);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
}
