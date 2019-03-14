/**
 * Created by swchen on 2017/3/9.
 */

import Raven from "raven-js";
import WebpackConstants from "../constant/WebpackConstants";

const isProduction = process.env.NODE_ENV === WebpackConstants.NODE_ENV.PRODUCTION;
let isInited = false;


window.onerror = (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) => {
    if (isProduction && isInited) {
        Raven.captureException(errorObj);
    }
};

window.onunhandledrejection = event => {
    if (isProduction && isInited && !event.reason.code) {
        Raven.captureException(event.reason);
    }
};

function init(key, version) {
    if (!isInited) {
        Raven.config(key, {
            release: version
        }).install();

        isInited = true;
    }
}

export default {
    init,
}