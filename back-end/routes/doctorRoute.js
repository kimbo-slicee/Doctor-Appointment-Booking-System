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
import doctorAuth from "../middlewares/doctorAuth.js";
import upload from "../middlewares/multer.js";
doctorRouter.route('/').get(getAllocators);//
doctorRouter.route('/login').post(login);// Doctor Login Routing API
// Doctor BackOffice Routing
doctorRouter.route('/dashboard')
    .get(doctorAuth,getDocAppointments)
    .patch(doctorAuth,completeAppointments)
    .put(doctorAuth,cancelAppointment);
doctorRouter.route('/dashboard/details').get(doctorAuth,appointmentDetails);
doctorRouter.route('/profile')
    .get(doctorAuth,doctorProfile)
    .patch(upload.single("image"),doctorAuth,updateDoctorProfile)
    .delete(doctorAuth,deleteDoctorProfile);

export default doctorRouter;
