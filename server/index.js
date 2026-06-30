import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/db.js";

dotenv.config({ path: "./server/.env" });
connectDB();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
