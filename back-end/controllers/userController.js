import {StatusCodes} from "http-status-codes";
import validator from "validator";
import userModel from "../models/user.js";
import NotFound from "../Error/notFound.js";
import unauthenticatedError from "../Error/unauthenticatedError.js";
import {CustomError} from "../Error/index.js";
import {v2 as cloudinary} from "cloudinary";
import DoctorModel from "../models/doctor.js";
import AppointmentModel from "../models/appointment.js";
import paypal from "@paypal/checkout-server-sdk";
import {getAccessToken} from "../config/paypal.js";
import axios from "axios";

// Register Controller
const register=async (req, res)=>{
const {name,email,password,phone}=req.body;
console.log(req.body);
if(!name || !email || !password || !phone){
    return req.status(StatusCodes.BAD_REQUEST).json({success:false,message:"Missing Details"})
}
if(!validator.isEmail(email)){
}
if(password.length<0){
    return req.status(StatusCodes.BAD_REQUEST).json({success:false,message:"Enter a Strong password"});
}
// hash user Password
    const user=await userModel.create({...req.body});
    const token=user.createJWT();
    res.status(StatusCodes.CREATED).json({success:true,token});
}

//Login Controller
const login=async (req,res)=>{
const {email,password}=req.body;
if(!email || !password)return  res.status(StatusCodes.NOT_FOUND).json({success:false,msg:"Invalid Email or password"});
const user=await userModel.findOne({email});
if(!user)throw new NotFound("User doesn't Existe")
const checkPassword= user.comparePassword(password);//check User password if it's the same in DB
if(!checkPassword) throw new unauthenticatedError("invalid credentials");
const token=user.createJWT();
res.status(StatusCodes.OK).json({success:true,token});
}
// Get User Data API
const userData=async (req,res)=>{
    const {userID}=req;
    const user=await userModel.findById({_id:userID}).select("-password")
    if(!user) throw new CustomError("User Not Found");
    res.status(StatusCodes.OK).json({success:true,data:user});
}
//  Update User Data API
const upDateUserData=async (req,res)=>{
    const {userID}=req;
    const {name,email,phone,password,address,gender,dob}=req.body;
    const fileImage=req.file;
    if(!name || !email || !phone || !address || !gender || !dob ){
        throw new CustomError("All Files Are Require",StatusCodes.BAD_REQUEST);
    }

    const user=await userModel.findByIdAndUpdate(userID,{name,email,phone,password,address,gender,dob});
    if(fileImage){
        const imageUpload=await cloudinary.uploader.upload(fileImage.path,{resource_type:"image"});
        const imageURL=imageUpload.secure_url;
        await userModel.findByIdAndUpdate(userID,{image:imageURL});
    }
    res.status(StatusCodes.OK).json({success:true,message:"Profile updated Succfuly"})
}
//  Delte Profie
const deleteUser= async (req, res)=>{
    const {userId}=req.user;
    if(!userId){
        throw new CustomError("User Id Not Found",StatusCodes.BAD_REQUEST);
    }
    await userModel.findByIdAndDelete(userId);
    res.status(StatusCodes.OK).json({success:true,message:"User Account Deleted Succfuly"});
}
//  API to book Appointment
const bookAppointment=async (req, res)=>{
    const {docId,slotDate,slotTime,userData}=req.body;
    const {userID}=req
    console.log(slotTime);
    if(!userID || !docId || !slotDate ||
        !slotTime || !userData){
        throw new CustomError("ALL Fields Required to book Appointment",StatusCodes.BAD_REQUEST)
    }
    const doctor=await DoctorModel.findById({_id:docId}).select("-password");
    if(!doctor.getAvilibality()){
        return res.status(StatusCodes.OK).json({success:false,message:"Sorry but this Doctor not Available for this" +
                " moment"})
    }
    let slots_booked=doctor.slots_booked;
    if(slots_booked[slotDate]){
        if(slots_booked[slotDate].includes(slotTime)){
            return res.status(StatusCodes.OK).json({success:false,message:"You can not Take Slot twos in same Day"})
        }else {
            slots_booked[slotDate].push(slotTime)
        }
    }else {
        slots_booked[slotDate]=[];
        slots_booked[slotDate].push(slotTime)
    }
    const user =await userModel.findById({_id:userID}).select("-password");
    delete doctor.slots_booked;
    const appointment=await AppointmentModel.create(
        {
            userId:userID,
            docId,
            userData:user,
            docData:doctor,
            amount:doctor.fess,
            slotTime,
            slotDate,
            date:Date.now()
        })
    // create new Slots Date for Doctor
    await DoctorModel.findByIdAndUpdate({_id:docId},{slots_booked})
    res.status(StatusCodes.OK).json({success:true,message:"Appointment Has been booked succfuly",data:appointment});
}
// Get All User Appointment
const appointmentsList=async (req,res)=>{
    const {userID}=req;
    const userAppointment=await AppointmentModel.find({userId:userID})// Using user ID I will fetch all appointment
    if(!userAppointment){
        return res.status(StatusCodes.OK).json({message:"This User Has No Appointment"})
    }
    res.status(StatusCodes.OK).json({success:true,data:userAppointment,count:userAppointment.length});
    // related with this user

}
// Cancel Appointment
const cancelAppointment=async (req,res)=>{
    const {userID}=req;
    const {appointmentId}=req.body;
    const updatedAppointment= await AppointmentModel.findByIdAndUpdate({_id:appointmentId, userId:userID},{cancelled:true},{new:true,runValidators:true})
    const {docId,slotDate,slotTime}=updatedAppointment;
    const doctorData=await DoctorModel.findById(docId);
    let slots_booked=doctorData.slots_booked;
    slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)// remove Appointment SlotTime From Doctor
    // Slots_Booked
    res.status(StatusCodes.OK).json({success:true,message:"Appointment Canceled"})

}

// User Oline Payment
const onlinePayment = async (req, res) => {
    const { userID } = req;
    const { appointmentId } = req.body;

    try {
        const accessToken = await getAccessToken();

        const response = await axios({
            url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, // Ensure the URL is correct
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            data: {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        description: "Book Appointment from Doctor", // Description of the purchase
                        amount: {
                            currency_code: "USD",
                            value: "100.00",
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: "100.00",
                                },
                            },
                        },
                    },
                ],
                application_context: {
                    return_url: `${process.env.FRONT_END_URL}/myAppointments`,
                    cancel_url: `${process.env.FRONT_END_URL}/myAppointments`,
                    user_action:"CONTINUE"
                },
            },
        });

        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error("Error creating PayPal order:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: "Failed to create PayPal order" });
    }
};

export {
    register,
    login,
    userData,
    upDateUserData,
    deleteUser,
    bookAppointment,
    appointmentsList,
    cancelAppointment,
    onlinePayment
}