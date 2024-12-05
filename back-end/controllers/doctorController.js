import DoctorModel from "../models/doctor.js";
import NotFound from "../Error/index.js";
import {StatusCodes} from "http-status-codes";

const changeAvailability=async (req,res)=>{
    const {
        body:{available},
        params:{id:docId},
    }=req;
    console.log(available);
    console.log(docId)
    const upDatedDoctorAvailability =await DoctorModel.findByIdAndUpdate(
        {_id:docId}, req.body, {new:true,runValidators:true});
    if(!upDatedDoctorAvailability) throw new NotFound("DOCTOR DOESN'T EXIST ");

    res.status(StatusCodes.OK).json({data:upDatedDoctorAvailability});


}
export {changeAvailability}