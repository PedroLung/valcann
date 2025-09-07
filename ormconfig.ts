import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./src/entities/user.entity";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,      // sqlite | postgres
  database: process.env.DB_DATABASE,     // dev.sqlite
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ["src/migrations/*.ts"],
});
