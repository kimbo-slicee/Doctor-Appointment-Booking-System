import express from "express";
const doctorRouter=express.Router();
import {getAllocators} from '../controllers/doctorController.js'
doctorRouter.route('/').get(getAllocators);
export default doctorRouter;
