import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"Invalid data",
                success:false
            })
        };
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Invalid email or password",
                success:false
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid email or password",
                success:false
            });
        }
       const tokenData = {
        id:user._id,
        isSubscribed: user.isSubscribed,
        subscriptionTier: user.subscriptionTier
       }
        const token = await jwt.sign(tokenData, "dfbvdkjzfnvkjzdnfvkzdnjf",{expiresIn:"1h"});

        const { password: _pw, ...safeUser } = user.toObject();
        return res.status(200)..cookie("token", token, {
  httpOnly: true,
  secure: true,        // required on https
  sameSite: "none",    // required for cross-domain
}).json({
            message:`Welcome back ${user.fullName}`,
            user: safeUser,
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}

export const Logout = async (req,res) => {
    return res.status(200)..cookie("token", "", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  expires: new Date(0)
})
.json({
        message:"User logged out successfully.",
        success:true,
    });
}

export const Register = async (req,res) =>{
    try {
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password){
            return res.status(401).json({
                message:"Invalid data",
                success:false
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"This email is already used",
                success:false,
            })
        }

        const hashedPassword = await bcryptjs.hash(password,16);

        const created = await User.create({
            fullName,
            email,
            password:hashedPassword,
            isSubscribed:false,
            subscriptionTier:'none'
        });

        const tokenData = {
            id: created._id,
            isSubscribed: created.isSubscribed,
            subscriptionTier: created.subscriptionTier
        };
        const token = await jwt.sign(tokenData, "dfbvdkjzfnvkjzdnfvkzdnjf",{expiresIn:"1h"});
        const { password: _pw, ...safeUser } = created.toObject();

        return res.status(201).cookie("token", token, { httpOnly: true }).json({
            message:"Account created successfully.",
            success:true,
            user: safeUser
        })

    } catch (error) {
        console.log(error);
    }
};
