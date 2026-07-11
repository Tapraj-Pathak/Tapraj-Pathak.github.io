import dotenv from "dotenv";

dotenv.config();

const toBoolean = (value, fallback = false) => {
  if (value === undefined) return fallback;
  return value === "true";
};

const toArray = (value = "") =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  allowedOrigins: toArray(
    process.env.ALLOWED_ORIGINS ||
      process.env.CLIENT_URL ||
      "http://localhost:5173",
  ),
  mongoUri: process.env.MONGODB_URI,
  primaryEmail: process.env.PRIMARY_EMAIL,
  secondaryEmail: process.env.SECONDARY_EMAIL,
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: toBoolean(process.env.SMTP_SECURE, false),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  allowVisitorFrom: toBoolean(process.env.ALLOW_VISITOR_FROM, false),
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};
