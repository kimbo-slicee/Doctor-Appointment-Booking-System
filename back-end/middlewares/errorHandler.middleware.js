import {StatusCodes} from "http-status-codes";
import {CustomError} from "../Error/index.js";
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomError) {
       return res.status(err.statusCode).json({ success:false, message: err.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success:false,
        message: 'Something went wrong, please try again later.',
        error:err.message
    });
};

export default errorHandlerMiddleware;
