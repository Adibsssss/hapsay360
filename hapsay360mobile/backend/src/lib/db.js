import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ensure .env is loaded even when running from different working dirs
dotenv.config({ path: join(__dirname, "..", "..", ".env") });

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log("MongoDB connected:", conn.connection.host);
    return conn;
  } catch (err) {
    console.error("MongoDB connection error:", err.message || err);
    throw err;
  }
};

export const isDbConnected = () => mongoose.connection.readyState === 1;
