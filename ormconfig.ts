import { DataSource } from "typeorm";
import { User } from './src/entities/user.entity';

/*

Estamos criando a conexão com o banco de dados usando TypeOrm.
No nosso caso estamos usando o SQLite, que é um banco de dados leve e não precisa de servidor.
O database: 'dev.sqlite' indica o nome do arquivo do banco de dados
A propriedade synchronize: true indica que o TypeOrm deve criar as tabelas automaticamente
A propriedade logging: false indica que o TypeOrm não deve logar as queries no console
A propriedade entities indica onde estão as entidades (tabelas) do banco de dados
A propriedade migrations indica onde estão as migrations do banco de dados

E por fim o DataSource é exportado para ser usado no app.ts

*/

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'dev.sqlite',
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: ["src/migrations/*.ts"],
})