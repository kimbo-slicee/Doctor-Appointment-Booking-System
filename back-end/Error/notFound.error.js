import {CustomError} from "./CustomAPIError.error.js";
import {StatusCodes} from "http-status-codes";
class NotFoundError extends CustomError{
    constructor(message) {
        super(message);
        this.statusCode=StatusCodes.NOT_FOUND;
    }
}
export default NotFoundError;