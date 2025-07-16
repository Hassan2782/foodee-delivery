import mongoose from "mongoose";
 
export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://Hasnain:412696719@cluster0.xfk9xqm.mongodb.net/food-del').then(()=>console.log("DB connected"))
}