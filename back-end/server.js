import 'express-async-errors'
import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinaryStorage.js";
import adminRoute from "./routes/admin.route.js";
import doctorRoute from "./routes/doctor.route.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";
import userRoute from "./routes/user.route.js";

// App Config
const app=express();
const port =process.env.PORT || 5000;
connectDB();// connectDB make Connection to mogoos Atlas
connectCloudinary().then(_ =>console.log("connectCloudinary Working "));// connectCloudinary connect my app to
// Cloud Storage
// Middleware
app.use(express.json());
// Cors Middleware
app.use(cors());
// api end point
app.use('/api/v1/admin',adminRoute);// invoking Admin Router Middleware API
app.use('/api/v1/doctor',doctorRoute);// Doctor Routes
app.use('/api/v1/user',userRoute);// User Routes
//Error Middlewares
app.use(notFound);
// Global error handler (for other types of errors)
app.use(errorHandlerMiddleware);
app.listen(port,()=>{
    console.log(`server Listing in Port ${port}`)
})