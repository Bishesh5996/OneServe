import net from "node:net";

import { connectDatabase } from "./src/config/database.js";
import { env } from "./src/config/env.js";
import { createApp } from "./src/app.js";
import { ensureAdminUser } from "./src/scripts/ensure-admin-user.js";

const findOpenPort = async (preferredPort) =>
  new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        resolve(findOpenPort(preferredPort + 1));
      } else {
        reject(error);
      }
    });
    server.listen(preferredPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });

const start = async () => {
  await connectDatabase();
  await ensureAdminUser();

  const port = await findOpenPort(env.port);
  const app = createApp();

  if (port !== env.port) {
    console.warn(`Port ${env.port} in use. Using fallback port ${port}. Update frontend VITE_API_URL if needed.`);
  }

  app.listen(port, () => {
    console.log(`API ready on http://localhost:${port}`);
  });
};

start().catch((error) => {
  console.error("Failed to start API", error);
  process.exit(1);
});
