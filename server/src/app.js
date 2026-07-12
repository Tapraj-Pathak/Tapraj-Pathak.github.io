import { existsSync } from "fs";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../../client/dist");

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    methods: ["GET", "POST"],
  }),
);
app.use(express.json({ limit: "32kb" }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.use(
  "/api/contact",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many messages. Please try again later." },
  }),
  contactRoutes,
);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

if (existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;
