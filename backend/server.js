// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import foodRouter from "./routs/food-routs.js";
import { connectDB } from "./config/db.js";
import userRouter from "./routs/user-route.js";
import adminRouter from "./routs/admin-route.js";
import orderRouter from "./routs/order-route.js";
import 'dotenv/config.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/order", orderRouter);

app.use("/api/food", foodRouter);
// app.use("/api/food/list", foodRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
