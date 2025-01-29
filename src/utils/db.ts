import mongoose from "mongoose";


export const DB = async() =>{
    try {
        await mongoose.connect(process.env.DB!)
    } catch (error) {
        console.log("DB error")
        return
    }
}