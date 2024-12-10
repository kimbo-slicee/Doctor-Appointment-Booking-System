import express from "express";
import {register, login, userData, upDateUserData, deletUser, bookAppointement} from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";
const userRoute=express.Router();
userRoute.route('/register').post(register);
userRoute.route('/login').post(login);
userRoute.route('/profile').get(userAuth,userData)
    .delete(userAuth,deletUser)
    .patch(upload.single("image"),userAuth,upDateUserData);
userRoute.route('/appointments').post(userAuth,bookAppointement)

export default userRoute
