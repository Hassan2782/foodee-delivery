import userModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import validator from "validator"




const creatToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//login user
const loginUser=async(req,res)=>{
     const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exists" });
    }
      const isMatch = await bcrypt.compare(password,user.password)
    // 2. Validate email
    if (!isMatch) {
      return res.json({ success: false, message: "invalid credential" });
    }
    // 6. Create token
    const token = creatToken(user._id);

    return res.json({ success: true, token, role: 'user' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }

}

//registor user


const registorUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // 2. Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // 3. Validate password strength
    if (!password || password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword // ✅ use hashed password
    });

    const user = await newUser.save();

    // 6. Create token
    const token = creatToken(user._id);

    return res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};


export{loginUser,registorUser}