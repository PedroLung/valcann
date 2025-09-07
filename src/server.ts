import { createApp } from "./app";
import { AppDataSource } from "../ormconfig";

const PORT = process.env.PORT ?? 3000;

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
