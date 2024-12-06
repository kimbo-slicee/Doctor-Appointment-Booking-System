import {CustomError} from "./CustomAPIError.js";
import {StatusCodes} from "http-status-codes";
class NotFound extends CustomError{
    constructor(message) {
        super(message);
        this.statusCode=StatusCodes.NOT_FOUND;
    }
}
export default NotFound;