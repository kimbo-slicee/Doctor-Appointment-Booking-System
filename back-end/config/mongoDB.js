import  mongoose from "mongoose";
import UserModel from "../models/user.model.js";
const connectDB =async ()=>{
    mongoose.connection.on('connected',async ()=>{
        console.log("MONGO DB CONNECTED SUCCESSFULLY ✅")
        const adminExists = await UserModel.findOne({ role: "Admin" });
        if (!adminExists) {
            // Create the first admin using .env variables
            const admin = new UserModel({
                name: process.env.ADMIN_NAME,
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                phone: process.env.ADMIN_PHONE,
                role: "Admin"
            });
            await UserModel.create(admin);
            console.log("First admin account created:", admin);
        }else {
            console.log("Admin already exists.")
        }

    })
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
}
export default  connectDB;
