import DoctorModel from "../models/doctor.js";
import {StatusCodes} from "http-status-codes";

const changeAvilibelt=async (req,res)=>{
    try{
    const {docId}=req.body
    const doctorData=await DoctorModel.findById(docId);
    if(!doctorData) {
        res.status(StatusCodes.NOT_FOUND).json({success:false,message:`doctor withe id ${docId} Doesn't exist`})
    }
    await doctorData.findByIdAndUpdate(docId,{available:!doctorData.available});
        res.status(StatusCodes.OK).json({success:true,message:"Availability Changed"});
    }catch (error){
        console.log(error);
        res.status(StatusCodes.NOT_MODIFIED)
    }


}
export {changeAvilibelt}