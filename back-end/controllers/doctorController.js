import DoctorModel from "../models/doctor.js";
import {StatusCodes} from "http-status-codes";
import UnauthenticatedError from "../Error/unauthenticatedError.js";
import {CustomError} from "../Error/index.js";
import AppointmentModel from "../models/appointment.js";
const getAllocators=async(req, res)=>{
    const allDoctors=await DoctorModel.find({})
        .sort("-createdAt").select('-password');
    res.status(StatusCodes.OK).json({success:true,allDoctors,count:allDoctors.length});
}
// Change Change Doctor Availability API
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
// Doctor Login API
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
// Get Doc Appointments API
const getDocAppointments=async (req,res)=>{
    const {docId}=req;
    console.log(docId)
      if(!docId) throw new CustomError("Please Provide A Doctor ID",StatusCodes.BAD_REQUEST);
      const doctorAppointments=await AppointmentModel.find({docId});
      res.status(StatusCodes.OK).json({success:true,doctorAppointments,amount:doctorAppointments.length})
}
// Doctor Complete Appointment Controller
const completeAppointments=async (req, res)=>{
    const {appointmentsId}=req.body;
    const {docId}=req;
    if(!appointmentsId || !docId) throw new CustomError("Please Provide Doctor Id or Appointments Id ",StatusCodes.BAD_REQUEST);
    const appointment=await AppointmentModel.findByIdAndUpdate(appointmentsId,{isCompleted:true});
    console.log(appointment);
    if(!appointment && !docId===appointment.docId) throw new CustomError("")
    res.status(StatusCodes.OK).json({success:true ,data:appointment,message:"Appointment Has been completed" +
            " Successfully"})
}
// Doctor Cancel Appointments Controller
export {changeAvailability,getAllocators,login,getDocAppointments,completeAppointments}