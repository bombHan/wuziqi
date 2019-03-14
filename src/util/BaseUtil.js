import _ from "lodash";

/**
 * Created by swchen on 2017/6/6.
 */





const nop = function () {
    /* do nothing */
};

const uuid = () => {
    let d = new Date().getTime();

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
};


// https://nodejs.org/api/url.html#url_url_resolve_from_to
// url.resolve('/one/two/three', 'four');         // '/one/two/four'
// url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
// url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'


function urlresolve(/* ...urls */) {
    const len = arguments.length;
    if (len === 0) {
        throw new Error("resolveUrl requires at least one argument; got none.")
    }

    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
    let base = document.createElement("base");
    base.href = arguments[0];

    if (len === 1) {
        return base.href
    }

    const head = document.getElementsByTagName("head")[0];
    head.insertBefore(base, head.firstChild);

    let a = document.createElement("a");
    let resolved;

    for (let i = 1; i < len; i++) {
        a.href = arguments[i];
        resolved = a.href;
        base.href = resolved;
    }

    head.removeChild(base);

    return resolved
}


function mergeDeep(object1, object2) {


    if (object1 == null || object2 == null) {

        return object2;

    } else if (!_.isPlainObject(object1) || !_.isPlainObject(object2)) {

        return object2;

    } else if (object1 === object2) {

        return object2;

    } else {

        if ("_isMergeAtom" in object2) {

            const isMergeAtom = object2._isMergeAtom;
            delete object2._isMergeAtom;

            if (isMergeAtom) {
                return object2;
            }
        }


        let obj = {
            ...object1
        };
        _.forEach(object2, (value, key) => {

            if (key in object1) {

                obj[key] = mergeDeep(object1[key], value);

            } else {
                obj[key] = value;
            }
        });

        return obj;
    }
}


export default {
    nop,
    uuid,
    urlresolve,
    mergeDeep,
};
