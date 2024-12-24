import jwt from "jsonwebtoken"
import {unauthenticatedError} from "../Error/index.js";

const authMiddleware=async (req, res, next)=>{
  // Im Handling try and catch block by using the package 'express-async-errors'
    const authHeader =req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer"))throw new unauthenticatedError("unauthenticated")
    const token = authHeader.split(" ")[1];// to split token from Bearer key word from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) throw new unauthenticatedError("unauthenticated");
    req.body={
        user:{
        userId: decoded.userID,
        name: decoded.name,
        role: decoded.role,
        email: decoded.email
        }
    }
    next();
}
export default authMiddleware