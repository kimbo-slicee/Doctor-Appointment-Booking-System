import express from "express";
const doctorRouter=express.Router();
import {
    appointmentDetails,
    cancelAppointment,
    completeAppointments,
    deleteDoctorProfile,
    doctorProfile,
    getAllocators,
    getDocAppointments,
    login, updateDoctorProfile
} from '../controllers/doctorController.js'
import upload from "../middlewares/multer.js";
import authMiddleware from "../middlewares/auth.middleware.js";
doctorRouter.route('/').get(getAllocators);//
doctorRouter.route('/login').post(login);// Doctor Login Routing API
// Doctor BackOffice Routing
doctorRouter.route('/dashboard')
    .get(authMiddleware,getDocAppointments)
    .patch(authMiddleware,completeAppointments)
    .put(authMiddleware,cancelAppointment);
doctorRouter.route('/dashboard/details').get(authMiddleware,appointmentDetails);
doctorRouter.route('/profile')
    .get(authMiddleware,doctorProfile)
    .patch(upload.single("image"),authMiddleware,updateDoctorProfile)
    .delete(authMiddleware,deleteDoctorProfile);

export default doctorRouter;
