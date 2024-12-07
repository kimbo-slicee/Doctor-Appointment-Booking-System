import {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";const userAuth =async (req, res, next)=>{
    const authHeader =req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(StatusCodes.UNAUTHORIZED).json({success:false,message:"Authentication invalid"})
    }
    const token = authHeader.split(" ")[1];
    const payload =  jwt.verify(token, process.env.JWT_SECRET);
    req.userID=payload.userID;
    next();
}
export default userAuth;