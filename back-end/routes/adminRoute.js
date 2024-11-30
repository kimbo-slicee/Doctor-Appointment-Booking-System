import express from "express";
import {addDoctor} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
const adminRouter =express.Router();
adminRouter.route('/admin').post(upload.single('image'),addDoctor)
export default adminRouter;
