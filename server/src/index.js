import app from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";

const startServer = async () => {
  try {
    await connectDb();

    app.listen(env.port, "0.0.0.0", () => {
      console.log(`API running on http://0.0.0.0:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start API:", error.message);
    process.exit(1);
  }
};

startServer();
