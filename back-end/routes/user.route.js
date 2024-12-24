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
    onlinePayment, capturePayment, deleteAppointment,deleteUserProfile
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const userRoute=express.Router();
// USER AUTHENTICATION ROUTES
userRoute.route('/register').post(register);
userRoute.route('/login').post(login);
// USER PROFILE ROUTES
userRoute.route('/profile')
    .get(authMiddleware,userData)
    .delete(authMiddleware,deleteUser)
    .patch(authMiddleware,upload.single("image"),upDateUserData)
    .delete(authMiddleware,deleteUserProfile)
// USER APPOINTMENTS ROUTES
userRoute.route('/appointment')
    .get(authMiddleware,appointmentsList)
    .post(authMiddleware,bookAppointment)
    .patch(authMiddleware,cancelAppointment)
    .delete(authMiddleware,deleteAppointment)
// USER PAYMENT ROUTES
userRoute.route('/appointment/create-payment').post(authMiddleware,onlinePayment)
userRoute.route('/appointment/capture-payment/:orderId').post(authMiddleware,capturePayment)
export default userRoute
