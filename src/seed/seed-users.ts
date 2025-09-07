import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/user.entity";
import mock from '../../mock-users.json';

/*

Estamos criando um script para popular a tabela de usuários com dados iniciais (seed).
Esse script verifica se já existem usuários na tabela, se existirem ele não faz nada.
Se não existirem ele cria os usuários a partir do arquivo mock-users.json

*/

async function seed() {
    await AppDataSource.initialize(); // Inicializa a conexão com o banco de dados
    const repo = AppDataSource.getRepository(User); // Pega o repositório da entidade User
    const existCount = await repo.count(); // Conta quantos registros existem na tabela User
    if(existCount > 0) {
        console.log('Seed skipped: users already exist');
        await AppDataSource.destroy(); // Fecha a conexão com o banco de dados
        return;
    }
    // Cria os registros na tabela User a partir do mock
    const users = mock.map((u: any) => {
        const user = repo.create({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            is_active: u.is_active,
            created_at: new Date(u.created_at)
        });
        return user;
    })

    await repo.save(users); // Salva os registros na tabela User
    console.log('Seed finished:', users.length, 'users created');
    await AppDataSource.destroy(); // Fecha a conexão com o banco de dados
}

// Executa a função seed e trata erros
seed().catch(err => {
    console.error(err);
    process.exit(1);
})