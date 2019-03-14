/**
 * Created by swchen on 2017/3/2.
 */




export default function splitObject(obj, parts) {
    const left = {};
    const right = {};
    Object.keys(obj).forEach((k) => {
        if (parts.indexOf(k) !== -1) {
            left[k] = obj[k];
        } else {
            right[k] = obj[k];
        }
    });
    return [left, right];
}
