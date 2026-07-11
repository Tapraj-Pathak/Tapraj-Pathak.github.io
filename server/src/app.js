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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");
const clientDistPath = path.join(repoRoot, "client", "dist");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    credentials: true,
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

if (env.nodeEnv === "production") {
  app.use(express.static(clientDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;
