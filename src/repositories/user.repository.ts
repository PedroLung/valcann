import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/user.entity";

export const userRepository = () => AppDataSource.getRepository(User);
