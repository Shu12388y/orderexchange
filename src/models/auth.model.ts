import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    }
});


export const User = mongoose.models.User || mongoose.model("User",UserSchema);