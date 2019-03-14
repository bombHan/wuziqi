import DingTalk from "ding-talk-pc";

// https://stackoverflow.com/questions/1788923/parameter-vs-argument
//
const promisify = (fn, context) => {
    return arg => {
        return new Promise((resolve, reject) => {
            fn.call(context, {
                ...arg,
                onSuccess: resolve,
                onFail: reject,
            });
        });
    };
};


const readyAsync = () => new Promise((resolve, reject) => {
    DingTalk.ready(resolve);
});


const requestAuthCodeAsync = promisify(DingTalk.runtime.permission.requestAuthCode);
const openLinkAsync = promisify(DingTalk.biz.util.openLink);


export default {
    promisify,
    readyAsync,
    requestAuthCodeAsync,
    openLinkAsync,
}





















