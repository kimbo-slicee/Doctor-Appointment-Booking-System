// Register Controller
import {StatusCodes} from "http-status-codes";
import validator from "validator";
import userModel from "../models/user.js";
import NotFound from "../Error/notFound.js";
import unauthenticatedError from "../Error/unauthenticatedError.js";
import {CustomError} from "../Error/index.js";
import {v2 as cloudinary} from "cloudinary";
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
    if(!name || !email || !phone || !password || !address || !gender || !dob ){
        throw new CustomError("All Files Are Require");
    }

    const user=await userModel.findByIdAndUpdate(userID,{name,email,phone,password,address,gender,dob});
    if(fileImage){
        const imageUpload=await cloudinary.uploader.upload(fileImage.path,{resource_type:"image"});
        const imageURL=imageUpload.secure_url;
        await userModel.findByIdAndUpdate(userID,{image:imageURL});
    }
    res.status(StatusCodes.OK).json({success:true,message:"Profile Uploaded"})
}
//  Change User Appointments API
//  Remove User Data API
const deletUser=()=>{
}
export {
    register,
    login,
    userData,
    upDateUserData,
    deletUser
}