import { AppDataSource } from "../ormconfig";
import { createApp } from "./app";

/* 

Estamos inicializando a conexão com o banco de dados e iniciando o servidor Express.
A variável PORT é obtida das variáveis de ambiente para definir a porta em que o servidor irá escutar.

Caso a inicialização do banco de dados falhe, o erro será capturado e logado no console.

O AppDataSource é responsável por gerenciar a conexão com o banco de dados, utilizando TypeORM.

O app é criado chamando a função createApp que configura a aplicação Express com todos os middlewares e rotas necessários.

Depois, o servidor começa a escutar na porta definida, e uma mensagem é logada no console indicando que o servidor está rodando.

Caso falhe em qualquer etapa do processo de inicialização, o erro será capturado e exibido no console.

*/

const PORT = process.env.PORT;

async function start() {
  await AppDataSource.initialize();
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start().catch(err => {
  console.error("Failed to start:", err);
});
