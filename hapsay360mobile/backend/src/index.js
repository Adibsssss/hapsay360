import express from "express";
import cors from "cors";
import "dotenv/config.js";

import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import blotterRoutes from "./routes/blotterRoutes.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/blotter", blotterRoutes);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message || err);
    process.exit(1);
  }
};

start();
