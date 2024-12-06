import express from "express";
const doctorRouter=express.Router();
import {getAlldoctors} from '../controllers/doctorController.js'
doctorRouter.route('/').get(getAlldoctors);
export default doctorRouter;
