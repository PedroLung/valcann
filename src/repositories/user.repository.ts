import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/user.entity";

/*

Estamos exportando uma função userRepository que retorna o repositório do TypeORM para a entidade User.

O repositório é obtido a partir do AppDataSource, que é a configuração de conexão com o banco de dados.

*/

export const userRepository = () => AppDataSource.getRepository(User);
