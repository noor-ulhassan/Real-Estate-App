import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/db.js";

dotenv.config({ path: "./server/.env" });
connectDB();

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Routes Imports

import authRouter from "./routes/auth.route.js";

// Routes use

app.use("/api/auth", authRouter);
