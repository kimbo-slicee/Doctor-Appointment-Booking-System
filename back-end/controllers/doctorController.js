import DoctorModel from "../models/doctor.js";
import {StatusCodes} from "http-status-codes";

const getAllocators=async(req, res)=>{
    // add Pagination
    const limit=Number(req.query.limit) || 5;
    const page=Number(req.query.page) || 1 ;// in FrontEnd we should increment page number when we add new Items
    const skip  =(page-1)*limit; // pagination algorithm
    const allDoctors=await DoctorModel.find({})
        .sort("-createdAt")
        .limit(limit)
        .skip(skip).select(['-password','-email']);
    res.status(StatusCodes.OK).json({success:true,allDoctors,count:allDoctors.length});
}
const changeAvailability=async (req,res)=>{
    const {
        params:{id:docId},
    }=req;
    if(!docId) res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"Please provide a valid id"})
    const doctor=await DoctorModel.findById(docId);
    if(!doctor) res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"doctor withe this ID not found "});
    const upDatedDoctorAvailability =await DoctorModel.findByIdAndUpdate(
        docId, {available:!doctor.available},{new:true,runValidators:true});
    res.status(StatusCodes.OK).json({success:true,availability:upDatedDoctorAvailability["available"]});
}

export {changeAvailability,getAllocators}