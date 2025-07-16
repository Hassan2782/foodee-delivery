import orderModel from "../models/order-model.js";

// List all orders (admin)
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user, items, total } = req.body;
    if (!user || !items || !Array.isArray(items) || items.length === 0 || !total) {
      return res.status(400).json({ success: false, message: "Missing order data" });
    }
    const newOrder = new orderModel({ user, items, total });
    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating order" });
  }
};

export { listOrders, createOrder }; 