import express from "express";
import {
    register,
    login,
    userData,
    upDateUserData,
    deleteUser,
    bookAppointment,
    appointmentsList,
    cancelAppointment,
    onlinePayment, capturePayment
} from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";
const userRoute=express.Router();
userRoute.route('/register').post(register);
userRoute.route('/login').post(login);
userRoute.route('/profile').get(userAuth,userData)
    .delete(userAuth,deleteUser)
    .patch(upload.single("image"),userAuth,upDateUserData);
userRoute.route('/appointment')
    .post(userAuth,bookAppointment)
    .get(userAuth,appointmentsList)
    .patch(userAuth,cancelAppointment)
userRoute.route('/appointment/create-payment').post(userAuth,onlinePayment)
userRoute.route('/appointment/capture-payment/:orderId').post(userAuth,capturePayment)

export default userRoute
