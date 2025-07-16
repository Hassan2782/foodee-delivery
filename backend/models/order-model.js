import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true }, // or ObjectId if you want to reference userModel
  items: [
    {
      foodId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel; 