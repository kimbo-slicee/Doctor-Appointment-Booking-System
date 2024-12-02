import 'express-async-errors'
import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinaryStorage.js";
import adminRoute from "./routes/adminRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

// App Config
const app=express();
const port =process.env.PORT || 5000;
connectDB().then(_ => console.log("connectDB Working "));// connectDB make Connection to mogoos Atlas
connectCloudinary().then(_ =>console.log("connectCloudinary Working "));// connectCloudinary connect my app to
// Cloud Storage
// Middleware
app.use(express.json());
app.use(cors());
// api end point
app.use('/api/v1',adminRoute);
// Error Middlewares
app.use(notFound);
// Global error handler (for other types of errors)
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`server Listing in Port ${port}`)
})