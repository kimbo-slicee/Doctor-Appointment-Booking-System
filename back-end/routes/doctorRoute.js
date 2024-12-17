import express from "express";
const doctorRouter=express.Router();
import {getAllocators, login} from '../controllers/doctorController.js'
doctorRouter.route('/').get(getAllocators);
doctorRouter.route('/login').post(login)
export default doctorRouter;
