import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinaryStorage.js";
import adminRoute from "./routes/adminRoute.js";
// App Config
const app=express();
const port =process.env.PORT || 5000;
//Routers
connectDB();
connectCloudinary();
// Middleware
app.use(express.json());
app.use(cors());
// api end point
app.use('/api/v1',adminRoute)
app.listen(port,()=>{
    console.log(`server Listing in Port ${port}`)
})