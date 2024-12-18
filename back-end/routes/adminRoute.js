import express from "express";
import {
    createDoc,
    login,
    getAllDoctors,
    getAllAppointments,
    cancelAppointment,
    adminDashBoard
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdminMiddleware from "../middlewares/auth.js";
import {changeAvailability} from "../controllers/doctorController.js";
const adminRouter =express.Router();
adminRouter.route('')
    .get(authAdminMiddleware,getAllDoctors)
    .post(authAdminMiddleware,upload.single('image'),createDoc);
adminRouter.route('/login').post(login);
adminRouter.route('/doctor/:id').patch(authAdminMiddleware,changeAvailability);
adminRouter.route('/appointments').get(authAdminMiddleware,getAllAppointments).patch(authAdminMiddleware,cancelAppointment);
adminRouter.route('/dashboard').get(authAdminMiddleware,adminDashBoard)
export default adminRouter;
