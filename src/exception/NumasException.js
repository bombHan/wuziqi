/**
 * Created by swchen on 2017/2/14.
 */





export default class NumasException extends Error {

    static UNKNOWN = "UNKNOWN";

    constructor(code, message, level) {
        super();
        this.code = code;
        this.message = message;
        this.level = level;
    }
}