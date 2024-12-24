import {StatusCodes} from "http-status-codes";
import {v2 as cloudinary} from "cloudinary";
import DoctorModel from "../models/doctor.model.js";
import {CustomError,unauthenticatedError,BadRequestError} from "../Error/index.js";
import AppointmentModel from "../models/appointment.model.js";
import userModel from "../models/user.model.js";
import UserModel from "../models/user.model.js";
import {STATES} from "mongoose";
/*Admin Login Controller*/
 const login=async (req,res)=>{
     const {email, password}=req.body;
     if(!email || !password)throw new BadRequestError("Email or password not Valid !");
     const admin=await UserModel.findOne({email})
     if(!admin) throw new unauthenticatedError("Unauthenticated");
     const passwordValidation=await admin.comparePassword(password);
     if(!passwordValidation) throw new unauthenticatedError("Unauthenticated")
     const token=admin.createJWT()
     res.status(StatusCodes.OK).json({success:true,token,error:"Login Succfuly"})
 }
 // Admin Add New Doctor Controller
const createDoc=async (req,res)=>{
    const {name,email,password,experience,phone,degree,about,fess,speciality,available,address}=req.body
    const imageFile=req.file;
    if(!name || !email || !password || !phone || !degree || !about || !fess || !speciality || !address){
    throw new BadRequestError("All Fields Are Required ")   }
    const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
    const imageUrl=imageUpload.secure_url;
    const newDoctor={name, email, password, phone, degree, about, fess, experience, image:imageUrl, speciality, available, address, date:Date.now()};
    const doctor = await DoctorModel.create(newDoctor);
    if(!doctor)throw new CustomError("Can't Found this User ",StatusCodes.NOT_FOUND)
    res.status(StatusCodes.OK).json({success:true,data:doctor})
}

// Admin Controller To Fetch All Doctors
const getAllDoctors=async (req, res)=>{
     const {user:{role}}=req.body;
     if(!role || role!=="Admin") throw new CustomError("You don't have permission to access ",StatusCodes.FORBIDDEN)
     /* if you have more then one admin account withe different levels of authorisation you need to check the admin
     permissions if that's include "read" before sending the response */
     const doctors=await DoctorModel.find({}).select('-password')
     res.status(StatusCodes.OK).json({success:true,data:doctors,message:"Doctors Are Here"})
}
// Admin Controller To Fetch All Appointments
const getAllAppointments=async (req,res)=>{
    const {user:{role}}=req.body;
    if(!role || role!=="Admin") throw new CustomError("You don't have permission to access ",StatusCodes.FORBIDDEN)
    const appointments=await AppointmentModel.find({});
    if(!appointments)throw new CustomError("Appointments Doesn't Existe",StatusCodes.BAD_REQUEST);
     res.status(StatusCodes.OK).json(
         {
              success:true
             ,data: appointments
             ,amount:appointments.length
         });
}
// Admin Cancel Appointment
const cancelAppointment=async (req, res)=>{
const {appointmentId,user:{role}}=req.body;
if(!role || role!=="Admin") throw new CustomError("You don't have permission to access ",StatusCodes.FORBIDDEN)
if(!appointmentId)throw new CustomError("Appointment Id Not Found",StatusCodes.BAD_REQUEST)
const updatedAppointment=await AppointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true},{new:true,runValidators:true})
    res.status(StatusCodes.OK).json({success:true,data:updatedAppointment,message:"Appointment Canceled Successfully"})
}
// Get All Data for Admin DashBoard
const adminDashBoard=async (req,res)=>{
    const {user:{role}}=req.body;
    if(!role || role!=="Admin") throw new CustomError("You don't have permission to access ",StatusCodes.FORBIDDEN)
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
// Delete Appointment Controller
const deleteAppointment=async (req,res)=>{
    const {user:{role}}=req.body;
    const {appointmentId}=req.params;
    if(!role || role!=="Admin") throw new CustomError("You don't have permission to access ",StatusCodes.FORBIDDEN);
    if(!appointmentId) throw new BadRequestError("appointment not Found");
    // Here also you have to check if the admin has permissions to delete Appointments
    await AppointmentModel.findOneAndDelete(appointmentId);
    // if the appointment doesn't Exist mongoose error will be returned so make sur you have handled mongoose errors
    // also
    res.status(StatusCodes.OK).json({success:true,message:"Appointment has ben Delete Succfuly "})
}
// Delete Doctor Controller
const deleteDoctor=async (req,res)=>{
    const {user:{role}}=req.body;
    const {doctorId}=req.params;
    if(!role || role!=="Admin") throw new CustomError("You don't have permission to access ",StatusCodes.FORBIDDEN);
    if(!doctorId) throw new BadRequestError("appointment not Found");
    // Here also you have to check if the admin has permissions to delete Doctor if not return error
    const doctor=await DoctorModel.findOneAndDelete(doctorId);
    console.log(doctor);
    res.status(StatusCodes.OK).json({success:true,message:"Appointment has ben Delete Succfuly "})
}
// Delete User Profile Controller 
const deleteUser=async (req,res)=>{
    const {user:{role}}=req.body;
    const {userId}=req.params;
    if(!role || role!=="Admin") throw new CustomError("You don't have permission to access ",StatusCodes.FORBIDDEN);
    if(!userId) throw new BadRequestError("appointment not Found");
    // Here also you have to check if the admin has permissions to delete Doctor if not return error
    const doctor=await UserModel.findOneAndDelete({_id:userId,role:"User"});
    // Admin Can not Delete Admin Account but that's depends on your Conception
    console.log(doctor);
    res.status(StatusCodes.OK).json({success:true,message:"Appointment has ben Delete Succfuly "})
}
export {
    login,
    createDoc,
    getAllDoctors,
    getAllAppointments,
    cancelAppointment,
    adminDashBoard,
    deleteAppointment,
    deleteDoctor
}