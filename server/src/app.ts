import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();
const localOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];
const configuredOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.CLIENT_URLS?.split(",").map((value) => value.trim()) || []),
].filter(Boolean) as string[];
const allowVercelPreviews = process.env.ALLOW_VERCEL_PREVIEWS !== "false";
const allowedOrigins = [...new Set([...configuredOrigins, ...localOrigins])];

app.use(
  cors({
    origin: (origin, callback) => {
      const isAllowedVercelPreview =
        allowVercelPreviews && !!origin && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

      if (!origin || allowedOrigins.includes(origin) || isAllowedVercelPreview) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
