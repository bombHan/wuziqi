/**
 * Created by swchen on 2017/2/14.
 */

import NumasException from "./NumasException";

export default class ServiceException extends NumasException {

    static SERVER_ERROR = "Internal Server Error";
    static CLIENT_ERROR = "Client Error";
    
    constructor(code, message, level, path) {
        super(code, message, level);
        this.path = path;
    }
}

