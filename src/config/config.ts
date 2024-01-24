import { configDotenv } from "dotenv";

configDotenv();

export const port = process.env.PORT;
export const mongoURI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gromet";

export const secretKey = process.env.SECRET_KEY || "SECRET_KEY";
export const appname = process.env.APPNAME || "Gromet";
export const frontendBaseVerificationUrl =
  process.env.BASE_CLIENT_USER_EMAIL_VERIFICATION_URL || "";
export const frontendBaseUrl = process.env.BASE_CLIENT_URL || "";
