import {StatusCodes} from "http-status-codes";
import {CustomError} from "./CustomAPIError.error.js";
class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = StatusCodes.BAD_REQUEST; // HTTP status for bad request
    }
}

export default  BadRequestError;