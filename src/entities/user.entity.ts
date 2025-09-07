import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

/*

Estamos criando as tabelas do banco de dados usando TypeOrm.
A @Entity define o nome da tabela
O @PrimaryGeneratedColumn define a chave primaria auto increment
O @Column define as colunas da tabela
O ! antes do dois pontos indica que a propriedade nunca será nula ou indefinida
O ? antes do dois pontos indica que a propriedade pode ser nula ou indefinida
Quando colocamos dentro do parenteses {} do @Column podemos definir algumas propriedades da coluna
Alguns exemplos:
{ unique: true } -> define que o valor da coluna deve ser único
{ name: "is_active", type: "boolean", default: true } -> define o nome da coluna no banco, o tipo e o valor padrão
{ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" } -> define o nome da coluna no banco, o tipo e o valor padrão como a data e hora atual

No nosso caso todos os campos são obrigatórios, exceto o id que é auto incrementado

*/
@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true})
    email!: string;

    @Column()
    role!: string;

    @Column({ name: "is_active", type: "boolean", default: true })
    is_active!: boolean;

    @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

}