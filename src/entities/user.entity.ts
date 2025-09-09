import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/*

Estou utilizando a tecnologia: TypeORM

Aqui vamos criar um entidade, ou seja, uma representação de uma tabela no banco de dados. Para isso vamos usar decorators fornecidos pelo TypeORM.

A entidade é chamada User e representa a tabela "users" no banco de dados.

Para fazermos isso vamos usar o decorator @Entity para definir a entidade e o nome da tabela.

Cada propriedade da classe User representa uma coluna na tabela "users".

O Decorator @PrimaryGeneratedColumn indica que a coluna "id" é a chave primária e será gerada automaticamente.

O Decorator @Column é usado para definir outras colunas na tabela, como "name", "email", "role", "is_active" e "created_at".

E podemos passar opções para o decorator @Column, como definir uma coluna como única (unique), definir o tipo da coluna (type), e definir valores padrão (default).

A (!) antes do (:) indica que a coluna em si não pode ser nula, ou seja, é obrigatória.

A coluna "created_at" tem um valor padrão que é a data e hora atual quando o registro é criado.

*/

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  role!: string;

  @Column({ name: "is_active", type: "boolean", default: true })
  is_active!: boolean;

  @Column({ name: "created_at", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
}
