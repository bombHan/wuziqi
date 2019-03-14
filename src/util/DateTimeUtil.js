// @flow

/**
 * Created by swchen on 2017/2/16.
 */


import moment from "moment";
import type moment$Moment from "moment";

function parse(time: string | number): moment$Moment {
    if (typeof(time) === "number") {
        return moment(time);
    }
    return moment(time, "YYYYMMDDHHmmssSSS");
}


function toString(dt: moment$Moment): string {
    return dt.format("YYYYMMDDHHmmssSSS");
}


export default {
    parse,
    toString
}

