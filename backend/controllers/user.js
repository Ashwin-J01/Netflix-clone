import {User} from "../models/userModel.js";

export const Register =async (req,res) => {
    try {
        const { fullName, email, password } = req.body;
        if(!fullName || !email || !password) {
            return res.status(401).json({ 
                message: "Invalid data", 
                success: false
            })
        }
        const user = await User.findOne({ email });
        if(user) {
            return res.status(401).json({ 
                message: "This email is already registered", 
                success: false 
            });
        }
        await User.create({ fullName, email, password });
        return res.status(201).json({
            message: "User registered successfully"
        });
        }
       catch (error) {
        console.error(error);
    }
}