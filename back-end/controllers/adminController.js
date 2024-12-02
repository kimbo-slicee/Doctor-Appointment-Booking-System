 import {StatusCodes} from "http-status-codes";
import {v2 as cloudinary} from "cloudinary";
import DoctorModel from "../models/doctor.js";
const createDoc=async (req,res)=>{
    const {name,email,password,experience,phone,degree,about,fees,speciality,available,address}=req.body
    const imageFile=req.file;
    if(!name|| !email || !password || !phone || !degree || !about || !fees|| !speciality || !available||!address){
        res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"All Fields Are Require "})
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
        fees,
        experience,
        image:imageUrl,
        speciality,
        available,
        address,
        date:Date.now()
    }
    const doctor = await DoctorModel.create(newDoctor);
    res.status(StatusCodes.OK).json({success:true,message:"Doctor Created"})
}
export {
    createDoc
}