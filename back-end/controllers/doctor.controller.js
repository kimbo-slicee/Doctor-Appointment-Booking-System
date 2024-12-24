import DoctorModel from "../models/doctor.model.js";
import {StatusCodes} from "http-status-codes";
import UnauthenticatedError from "../Error/unauthenticated.error.js";
import {CustomError} from "../Error/index.js";
import AppointmentModel from "../models/appointment.model.js";
import {v2 as cloudinary} from "cloudinary";
const getAllocators=async(req, res)=>{
    // ++ Pagination and search
    const allDoctors=await DoctorModel.find({})
        .sort("-createdAt").select('-password');
    res.status(StatusCodes.OK).json({success:true,allDoctors,count:allDoctors.length});
}
// Change Change Doctor Availability API
const changeAvailability=async (req,res)=>{
    const {
        params:{id:docId},
    }=req;
    if(!docId) return  res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"Please provide a valid id"})
    const doctor=await DoctorModel.findById(docId);
    if(!doctor) return  res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"doctor withe this ID not found "});
    const upDatedDoctorAvailability =await DoctorModel.findByIdAndUpdate(
        docId, {available:!doctor.available},{new:true,runValidators:true});
    res.status(StatusCodes.OK).json({success:true,availability:upDatedDoctorAvailability["available"]});
}
// Doctor Login API
const login=async (req,res)=>{
        // get Doctor Email and Password From the body
        const {email,password}=req.body
        if(!email || !password)return res.status(StatusCodes.UNAUTHORIZED).json({success:false,message:"Invalid Email or password"});
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
      if(!docId) throw new CustomError("Please Provide A Doctor ID",StatusCodes.BAD_REQUEST);
      const doctorAppointments=await AppointmentModel.find({docId});
      res.status(StatusCodes.OK).json({success:true,doctorAppointments,amount:doctorAppointments.length})
}
// Doctor Complete Appointment Controller
const completeAppointments=async (req, res)=>{
    const {
        body:{appointmentId},
        docId
    }=req
    if(!appointmentId || !docId) throw new CustomError("Please Provide Doctor Id or Appointments Id ",StatusCodes.BAD_REQUEST);
    const appointment=await AppointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
    if(!appointment && !docId===appointment.docId) throw new CustomError("Appointment Not Found",StatusCodes.BAD_REQUEST)
    res.status(StatusCodes.OK).json({
        success:true
        ,data:appointment
        ,message:"Appointment Has been completed Successfully"})
}
// Doctor Cancel Appointments Controller
const cancelAppointment=async (req,res)=>{
   const {
       body:{appointmentId},
       docId
   }=req
    console.log(appointmentId,docId)
    if(!appointmentId || !docId) throw new CustomError("Please Provide Doctor Id or Appointments Id ",StatusCodes.BAD_REQUEST);
    const cancelledAppointment=await AppointmentModel.findById(appointmentId);
    // we will check if the Appointment Cancelled By user Or the admin we will return message "Appointment Already
    // Canceled " if Not we Will Cancel it Lol
    if(cancelledAppointment.cancelled){
        return res.status(StatusCodes.OK).json({success:true,message:"This Appointment Already Canceled" })
    }else {
        await AppointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
        return res.status(StatusCodes.OK).json({success:true,message:"Appointment Canceled Successfully"})
    }
}
// Doctor Appointments Details Controller
const appointmentDetails=async (req,res)=>{
const {docId}=req;
let docWallet=0
let patients=[]
 if(!docId) throw new CustomError("docId Messing",StatusCodes.BAD_REQUEST);
 const appointments=await AppointmentModel.find({docId});
 if(!appointments) throw new CustomError("Appointments Not Found",StatusCodes.BAD_REQUEST)
 appointments.map(appointment=>{
     if(appointment.isCompleted || appointment.payment) docWallet+=appointment.amount;
     if(!patients.includes(appointment.userID)) patients.push(appointment.userID);

 })
    const dashData={
        docWallet,
        appointmentsList:appointments.length,
        patientsList:patients.length,
        lastAppointments:appointments.reverse()
    }
 res.status(StatusCodes.OK).json({success:true,data:dashData,message:"Appointments Doctor Data Loaded seccsufuly"})

}
// Doctor Profile Data Controller
const doctorProfile=async (req,res)=>{
    const {docId}=req;
    const doctor=await DoctorModel.findById(docId).select("-password");
    if(!doctor) throw new CustomError("Doctor Not Found ",StatusCodes.BAD_REQUEST);
    res.status(StatusCodes.OK).json({success:true,data:doctor,message:"Doctor Profile Loaded"});
}
// Update Doctor Profile Controller
const updateDoctorProfile=async (req,res)=>{
    const {
        body:{name,speciality,experience,email,phone,address,about,fess,available},
        docId,
        file
    }=req
    if(!docId) throw new CustomError("Doctor Not Found ",StatusCodes.BAD_REQUEST);
    if(!name||!speciality||!experience||!email||!phone||!address||!about||!fess||!available) throw new CustomError("All Fields are Required ",StatusCodes.BAD_REQUEST)
    // check about the image if has been UpDate or not if image Uploaded we will changer if Not we will use just the
    // previous one
    console.log(req.body)
    if(file){
        const imageUpload=await cloudinary.uploader.upload(file.path,{resource_type:"image"});
        const imageURL=imageUpload.secure_url;
        await DoctorModel.findByIdAndUpdate(docId,{image:imageURL});
    }
    const updatedDoctorData=await DoctorModel.findByIdAndUpdate(docId,{name,speciality,experience,email,phone,address,about,fess,available})
    res.status(StatusCodes.OK).json({success:true,data:updatedDoctorData,message:"Profile Updated successfully"})

}
// Delete Doctor Profile Controller
const deleteDoctorProfile=async (req, res)=>{


}


export {
    changeAvailability,
    getAllocators,
    login,
    getDocAppointments,
    completeAppointments,
    cancelAppointment,
    appointmentDetails,
    doctorProfile,
    deleteDoctorProfile,
    updateDoctorProfile
}