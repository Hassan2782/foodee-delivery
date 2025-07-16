// backend/controllers/food-controller.js

import foodModel from '../models/food-models.js';
//add food
 const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

   
    const newFood = new foodModel({
      name,
      description,
      price,
      category,
      image: "default.jpg" // Or remove from schema required:true
    });

    await newFood.save();
    res.status(201).json({ success: true, data: newFood });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//list food
 const listFood= async (req, res) => {
 try{
const Foods=await foodModel.find({})
res.json({success:true,data:Foods})
 }catch(error){
  console.log(error)
  res.json({success:false,message:"Error"})
 }
};
export{listFood,addFood}




