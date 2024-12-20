import express from "express";
const doctorRouter=express.Router();
import {
    appointmentDetails,
    cancelAppointment,
    completeAppointments,
    getAllocators,
    getDocAppointments,
    login
} from '../controllers/doctorController.js'
import doctorAuth from "../middlewares/doctorAuth.js";
doctorRouter.route('/').get(getAllocators);//
doctorRouter.route('/login').post(login);// Doctor Login Routing API
// Doctor BackOffice Routing
doctorRouter.route('/dashboard')
    .get(doctorAuth,getDocAppointments)
    .patch(doctorAuth,completeAppointments)
    .put(doctorAuth,cancelAppointment);
doctorRouter.route('/dashboard/details').get(doctorAuth,appointmentDetails);

export default doctorRouter;
