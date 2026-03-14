import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("views"))

connectDB();

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/users", userRoutes);
app.listen(5000,()=>{
  console.log("Server running on port 5000");
});