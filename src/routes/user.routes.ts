import { Router } from "express";
import { listUsersHandler, getUserHandler } from "../controller/user.controller";
import { validateQuery } from "../middlewares/validate.middleware";

export const userRouter = Router();

userRouter.get("/", validateQuery, listUsersHandler);
userRouter.get("/:id", getUserHandler);
