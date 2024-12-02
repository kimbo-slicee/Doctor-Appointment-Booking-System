import express from "express";
import {createDoc} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
const adminRouter =express.Router();
adminRouter.route('/admin').post(upload.single('image'),createDoc)
export default adminRouter;
