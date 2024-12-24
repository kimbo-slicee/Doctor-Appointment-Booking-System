import {StatusCodes} from "http-status-codes";
import {v2 as cloudinary} from "cloudinary";
import DoctorModel from "../models/doctor.js";
import {CustomError,unauthenticatedError} from "../Error/index.js";
import AppointmentModel from "../models/appointment.js";
import userModel from "../models/user.js";
import BadRequestError from "../Error/badRequest.js";
import UserModel from "../models/user.js";
import UnauthenticatedError from "../Error/unauthenticatedError.js";
/*Admin Login Controller*/
 const login=async (req,res)=>{
     const {email, password}=req.body;
     if(!email || !password)throw new BadRequestError("Email or password not Valid !");
     const admin=await UserModel.findOne({email})
     if(!admin) throw new unauthenticatedError("Unauthenticated");
     const passwordValidation=await admin.comparePassword(password);
     if(!passwordValidation) throw new UnauthenticatedError("Unauthenticated")
     const token=admin.createJWT()
     res.status(StatusCodes.OK).json({success:true,token,error:"Login Succfuly"})
 }
const createDoc=async (req,res)=>{
    // First we need To Check Admin Credentials
    const {user}=req.user
    const {name,email,password,experience,phone,degree,about,fess,speciality,available,address}=req.body

    // Starting Adding New Admin
    const imageFile=req.file;
    if(!name || !email || !password || !phone || !degree || !about || !fess || !speciality || !address){
        return  res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"All Fields Are Require "})
    }
    const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
    const imageUrl=imageUpload.secure_url;
    const newDoctor={name, email, password, phone, degree, about, fess, experience, image:imageUrl, speciality, available, address, date:Date.now()};
    const doctor = await DoctorModel.create(newDoctor);
    res.status(StatusCodes.OK).json({success:true,data:doctor})
}

// Get All Doctors
const getAllDoctors=async (req, res)=>{
    try{
    const doctors=await DoctorModel.find({}).select('-password')
        if(!doctors){
        res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"Oops No Doctor founded"})
        }
    res.status(StatusCodes.OK).json({success:true,data:doctors})

    }catch (error){
        res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"Server Error"})
    }

}
// Get All Appointments
const getAllAppointments=async (req,res)=>{
    const appointments=await AppointmentModel.find({});
    if(!appointments){
        throw new CustomError("Appointments Doesn't Existe",StatusCodes.BAD_REQUEST);
    }
     res.status(StatusCodes.OK).json(
         {
              success:true
             ,data: appointments
             ,amount:appointments.length
         });
}
// Cancel Appointment
const cancelAppointment=async (req, res)=>{
const {appointmentId}=req.body;
if(!appointmentId){
    throw new CustomError("Appointment Id Not Found",StatusCodes.BAD_REQUEST)
}
const updatedAppointment=await AppointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true},{new:true,runValidators:true})
    res.status(StatusCodes.OK).json({success:true,data:updatedAppointment,message:"Appointment Canceled"})
}
// Get All Data for Admin DashBoard
const adminDashBoard=async (req,res)=>{
    // get All Data From
    const doctors=await DoctorModel.find({});
    const users=await userModel.find({});
    const appointments=await AppointmentModel.find({});
    // add Pagination
    // Create response Data Object
    const data={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            appointmentsList:appointments
    }
    res.status(StatusCodes.OK).json({success:true,data});

}
export {
    login,
    createDoc,
    getAllDoctors,
    getAllAppointments,
    cancelAppointment,
    adminDashBoard
}