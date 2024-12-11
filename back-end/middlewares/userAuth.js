import {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";const userAuth =async (req, res, next)=>{
    const authHeader =req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(StatusCodes.UNAUTHORIZED).json({success:false,message:"Authentication invalid"})
    }
    const token = authHeader.split(" ")[1];
    try{
    const payload =  jwt.verify(token, process.env.JWT_SECRET);
    req.userID=payload.userID;
    next();
    }catch (error){
        return res.status(403).json({ message: 'Unauthorised', error: error.message });
    }
}
export default userAuth;