import express from "express";
import cors from "cors";
import "reflect-metadata";
import { userRouter } from "./routes/user.routes";
import { errorHandler } from "./middlewares/error.handler";

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/users", userRouter);
  app.use(errorHandler);
  return app;
};
