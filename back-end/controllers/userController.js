import {StatusCodes} from "http-status-codes";
import validator from "validator";
import userModel from "../models/user.js";
import NotFound from "../Error/notFound.js";
import unauthenticatedError from "../Error/unauthenticatedError.js";
import {CustomError} from "../Error/index.js";
import {v2 as cloudinary} from "cloudinary";
import DoctorModel from "../models/doctor.js";
import AppointmentModel from "../models/appointment.js";
import {getAccessToken} from "../config/paypal.js";
import axios from "axios";
import {response} from "express";

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
// hash Doctor Password
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
    const userAppointment=await AppointmentModel.find({userId:userID})// Using Doctor ID I will fetch all appointment
    if(!userAppointment){
        return res.status(StatusCodes.OK).json({message:"This User Has No Appointment"})
    }
    res.status(StatusCodes.OK).json({success:true,data:userAppointment,count:userAppointment.length});
    // related with this Doctor

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
    const {userID}=req;
    const user=await userModel.findById(userID).select(["-password","-image"]);
    const { appointmentId } = req.body;
    const appointment=await AppointmentModel.findById({_id:appointmentId});
    const {
        docData:{fess}
    }=appointment;
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
                        reference_id:appointmentId,
                        description: `Book Appointment Doctor ${appointment.docData["name"]}`,
                        amount: {
                            currency_code: process.env.CURRENCY,
                            value: fess,
                            breakdown: {
                                item_total: {
                                    currency_code: process.env.CURRENCY,
                                    value: fess,
                                },
                            },
                        },
                    },
                ],
                shipping: {
                    name: {
                          full_name: user.name,
                    },
                    },
                    address: {
                            address_line_1: user.address.line1,
                            address_line_2: user.address.line2,
                            admin_area_1:JSON.parse(appointment.docData.address).line1,
                            admin_area_2:JSON.parse(appointment.docData.address).line2,
                        },
                        payer: {
                            name: {
                                given_name: user.name,
                            },
                            email_address: user.email,
                        },
                        application_context: {
                            return_url: `${process.env.FRONT_END_URL}/myAppointments`,
                            cancel_url: `${process.env.FRONT_END_URL}/myAppointments`,
                            user_action: "CONTINUE",
                            brand_name: "PresCripto"
                        },
                    },
        });
        const approvalLink = response.data.links.find((link) => link.rel === "approve").href;
        const {data:{id}}=response
        res.status(200).json({ success: true, approval_url: approvalLink , orderId:id});
    } catch (error) {
        console.error("Error creating PayPal order:", error.response?.data || error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Failed to create PayPal order" });
    }
};
// capturePayment
const capturePayment = async (req, res) => {
    const {userId}=req;
    const { orderId } = req.params;
    try {
        // Get PayPal access token
        const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64");
        const tokenResponse = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token",
            "grant_type=client_credentials", {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        const accessToken = tokenResponse.data.access_token;

        // Capture the payment
        const captureResponse = await axios.post(
            `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        // Check payment status
        const paymentStatus = captureResponse.data.status;
        if (paymentStatus === "COMPLETED") {
            const [a]=captureResponse.data.purchase_units;
            const {reference_id}=a
            await AppointmentModel.findByIdAndUpdate(reference_id,{payment:true})
            // Payment was successful
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Payment captured successfully.",
                data: captureResponse.data,
            });
        } else {
            return res.status(StatusCodes.OK).json({
                success: false,
                message: "Payment not completed.",
            });
        }
    } catch (error) {
        console.error("Error capturing payment:", error.response?.data || error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to capture payment.",
            error: error.response?.data || error.message,
        });
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
    onlinePayment,
    capturePayment
}