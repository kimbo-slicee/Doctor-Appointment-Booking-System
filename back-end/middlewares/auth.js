import jwt from 'jsonwebtoken'
import {StatusCodes} from "http-status-codes";
const authAdminMiddleware=async (req, res, next)=>{
  // Im Handling try and catch block by using the package 'express-async-errors'
    const authHeader =req.headers.authorization;
    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({success:false,message:"Authentication invalid "})
    }
    const token_decode=jwt.verify(authHeader,process.env.JWT_SECRET);
    if(token_decode.email !== process.env.ADMIN_EMAIL && token_decode.password !==process.env.ADMIN_PASSWORD){
        return res.status(StatusCodes.UNAUTHORIZED).json({success:false,message:"Authentication invalid"})
    }
    next();


}
export default authAdminMiddleware