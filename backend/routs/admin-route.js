import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin-controller.js";
import { listOrders } from "../controllers/order-controller.js";

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/orders", listOrders);

export default adminRouter; 