import express from "express";
import {register} from "../controllers/userController.js";
const userRoute=express.Router();
userRoute.route('/register').post(register);
export default userRoute
