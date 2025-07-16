import adminModel from "../models/admin-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register admin
const registerAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Check if admin exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.json({ success: false, message: "Admin already exists" });
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
        // 5. Save admin
        const newAdmin = new adminModel({
            email,
            password: hashedPassword
        });
        const admin = await newAdmin.save();
        // 6. Create token
        const token = createToken(admin._id);
        return res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
    }
};

// Login admin
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Check if admin exists
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.json({ success: false, message: "Admin does not exist" });
        }
        // 2. Validate password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        // 3. Create token
        const token = createToken(admin._id);
        return res.json({ success: true, token, role: 'admin' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
    }
};

export { registerAdmin, loginAdmin }; 