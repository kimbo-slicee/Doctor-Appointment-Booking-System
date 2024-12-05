import {StatusCodes} from "http-status-codes";
import {v2 as cloudinary} from "cloudinary";
import DoctorModel from "../models/doctor.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import {CustomError} from "../Error/CustomAPIError.js";
const createDoc=async (req,res)=>{
    const {name,email,password,experience,phone,degree,about,fess,speciality,available,address}=req.body
    const imageFile=req.file;
    if(    !name
        || !email
        || !password
        || !phone
        || !degree
        || !about
        || !fess
        || !speciality
        || !address
    ){
        res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"All Fields Are Require "})
    }
    if(!validator.isEmail(email)){
        res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"Please Enter a Valid Email"})
    }
    const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
    const imageUrl=imageUpload.secure_url;
    const newDoctor={
        name,
        email,
        password,
        phone,
        degree,
        about,
        fess,
        experience,
        image:imageUrl,
        speciality,
        available,
        address,
        date:Date.now()
    };
    const doctor = await DoctorModel.create(newDoctor);
    res.status(StatusCodes.OK).json({success:true,data:doctor})
}
// login Controller
 const login=async (req,res)=>{
    const {email,password}=req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        try{
            const token=await jwt.sign({email,password},process.env.JWT_SECRET);// create new Jwt Token
            res.status(StatusCodes.OK).json({success:true,token:token});
        }catch (error){
           throw new  CustomError("UNAUTHORIZED USER",StatusCodes.UNAUTHORIZED)
        }

    }else{
            res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"Email or password are not Valid"});

    }

 }
 // add Controller to Fetch all doctors
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
export {
    createDoc,
    login,
    getAllDoctors
}