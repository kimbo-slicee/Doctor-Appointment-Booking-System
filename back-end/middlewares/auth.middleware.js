import jwt from "jsonwebtoken"
import unauthenticatedError from "../Error/unauthenticatedError.js";
const authMiddleware=async (req, res, next)=>{
  // Im Handling try and catch block by using the package 'express-async-errors'
    const authHeader =req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer"))throw new unauthenticatedError("unauthenticated User")
    const token = authHeader.split(" ")[1];// to split token from Bearer key word from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    next();
}
export default authMiddleware