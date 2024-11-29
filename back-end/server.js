import express from "express";
import cors from "cors";
import "dotenv/config.js";
// App Config
const app=express();
const port =process.env.PORT || 5000;
// Middleware
app.use(express.json());
app.use(cors());
// api end point
app.get("/",(req, res)=>{
    res.send("API WORKS GOOD")

})
app.listen(port,()=>{
    console.log(`server Listing in Port ${port}`)
})