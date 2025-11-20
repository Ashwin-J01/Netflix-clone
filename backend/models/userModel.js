import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isSubscribed:{
        type:Boolean,
        default:false
    },
    subscriptionTier:{
        type:String,
        enum:['none','basic','standard','premium'],
        default:'none'
    }
},{timestamps:true});

export const User = mongoose.model("User", userSchema);