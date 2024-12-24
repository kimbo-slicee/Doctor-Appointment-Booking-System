import express from "express";
const adminRouter =express.Router();
import upload from "../middlewares/multer.middleware.js";
import authAdminMiddleware from "../middlewares/auth.middleware.js";
import {changeAvailability} from "../controllers/doctor.controller.js";
import {
    createDoc,
    login,
    getAllDoctors,
    getAllAppointments,
    cancelAppointment,
    adminDashBoard
} from "../controllers/admin.controller.js";
adminRouter.route('')
    .get(authAdminMiddleware,getAllDoctors)
    .post(authAdminMiddleware,upload.single('image'),createDoc);
adminRouter.route('/login').post(login);
adminRouter.route('/doctor/:id').patch(authAdminMiddleware,changeAvailability);
adminRouter.route('/appointments')
    .get(authAdminMiddleware,getAllAppointments)
    .patch(authAdminMiddleware,cancelAppointment);
adminRouter.route('/dashboard').get(authAdminMiddleware,adminDashBoard)
export default adminRouter;
