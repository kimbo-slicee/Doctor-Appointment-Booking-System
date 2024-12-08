import {StatusCodes} from "http-status-codes";
import {CustomError} from "../Error/index.js";
const errorHandler = (err, req, res,next) => {
    if (err instanceof CustomError) {
        next();
        return res.status(err.statusCode).json({ msg: err.message });
    }
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: 'Something went wrong, please try again later.',
    });
};

export default errorHandler;
