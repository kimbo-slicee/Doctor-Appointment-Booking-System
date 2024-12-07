// Register Controller
import {StatusCodes} from "http-status-codes";
import validator from "validator";
import userModel from "../models/user.js";
import NotFound from "../Error/notFound.js";
import unauthenticatedError from "../Error/unauthenticatedError.js";
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
const checkPassword= user.comparePassword(password);
if(!checkPassword) throw new unauthenticatedError("invalid credentials");
const token=user.createJWT();
res.status(StatusCodes.OK).json({success:true,token});
}
export {
    register,
    login
}