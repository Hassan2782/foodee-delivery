import express from 'express';
import multer from 'multer';
import { addFood,listFood } from '../controllers/food-controller.js';

const foodRouter = express.Router();

// Simple multer storage config
const storage = multer.diskStorage({
  destination: 'uploads', // Make sure this folder exists
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route to add food with image upload
foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get("/list",listFood)

export default foodRouter;
