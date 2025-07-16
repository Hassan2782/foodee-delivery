import express from 'express';
import { createOrder, listOrders } from '../controllers/order-controller.js';

const orderRouter = express.Router();

// Create a new order
orderRouter.post('/', createOrder);

// List all orders (admin)
orderRouter.get('/', listOrders);

export default orderRouter; 