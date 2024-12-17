import DoctorModel from "../models/doctor.js";
import {StatusCodes} from "http-status-codes";
import {CustomError} from "../Error/index.js";
import UnauthenticatedError from "../Error/unauthenticatedError.js";
const getAllocators=async(req, res)=>{
    //  Pagination
    const limit=Number(req.query.limit) || 5;
    const page=Number(req.query.page) || 1 ;
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
// Doctor Login
const login=async (req,res)=>{
        // get Doctor Email and Password From the body
        const {email,password}=req.body
        console.log(email,password)
        if(!email || !password)return  res.status(StatusCodes.UNAUTHORIZED).json({success:false,message:"Invalid Email" +
                "or password"});
        const doctor=await DoctorModel.findOne({email});
        // check if we Have this doctor email and password
        if(!doctor)throw new UnauthenticatedError("Invalid Email or Password");
        // check password is match
        const passwordValidation=await doctor.comparePassword(password)
        if(!passwordValidation) throw new UnauthenticatedError("Invalid credentials")
        // create new JWT Token withe Role equal Doctor
        const token=doctor.createJWT()
        res.status(StatusCodes.OK).json({success:true,token,message:"Login Successful"})
}
export {changeAvailability,getAllocators,login}