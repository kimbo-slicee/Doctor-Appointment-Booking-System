import express from "express";
import {createDoc, login ,getAllDoctors} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdminMiddleware from "../middlewares/auth.js";
const adminRouter =express.Router();
adminRouter.route('/admin').post(authAdminMiddleware,upload.single('image'),createDoc);
adminRouter.route('/admin/login').post(login);
adminRouter.route('/admin').get(authAdminMiddleware,getAllDoctors);

export default adminRouter;
