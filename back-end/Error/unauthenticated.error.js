import {CustomError} from "./CustomAPIError.error.js";
import {StatusCodes} from "http-status-codes";
class UnauthenticatedError extends CustomError{
    constructor(message) {
        super(message);
        this.statusCode=StatusCodes.UNAUTHORIZED;
    }
}
export default UnauthenticatedError;