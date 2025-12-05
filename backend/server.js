import { connectDatabase } from "./src/config/database.js";
import { env } from "./src/config/env.js";
import { createApp } from "./src/app.js";
import { ensureAdminUser } from "./src/scripts/ensure-admin-user.js";

const start = async () => {
  await connectDatabase();
  await ensureAdminUser();
  const app = createApp();
  app.listen(env.port, () => {
    console.log(`API ready on http://localhost:${env.port}`);
  });
};

start().catch((error) => {
  console.error("Failed to start API", error);
  process.exit(1);
});
