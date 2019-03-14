/**
 * Created by swchen on 2017/6/17.
 */

// https://github.com/facebook/fbjs/tree/master/packages/fbjs


/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        // Added the nonzero y check to make Flow happy, but it is redundant
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
    }
}


/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB, isEqual) {

    if (is(objA, objB)) {

        return true;
    }

    if (typeof objA !== "object" || objA === null ||
        typeof objB !== "object" || objB === null) {

        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {

        return false;
    }

    const hasOwnProperty = Object.prototype.hasOwnProperty;
    // Test for A"s keys different from B.
    for (let i = 0; i < keysA.length; i++) {

        if (!hasOwnProperty.call(objB, keysA[i]) ||
            !isEqual(objA[keysA[i]], objB[keysA[i]])) {

            return false;
        }
    }

    return true;
}


const defaultIsEqual = (x, y) => {
    if (Object.is) {
        return Object.is(x, y)
    } else {
        return is(x, y);
    }
};

function memoize(func, isEqual = defaultIsEqual) {
    let lastArgs = null;
    let lastResult = null;

    // we reference arguments instead of spreading them for performance reasons
    return function () {
        if (!shallowEqual(lastArgs, arguments, isEqual)) {
            // apply arguments instead of spreading for performance.
            lastResult = func.apply(null, arguments);
        }
        lastArgs = arguments;
        return lastResult;
    }
}

export default {
    memoize
}


// 1. https://github.com/sebmarkbage/ecmascript-shallow-equal

// 2. https://github.com/dashed/shallowequal/blob/master/index.js
// function shallowEqual(objA, objB, compare, compareContext) {
//
//     // NOTE: 这段会导致永远返回 false
//     let ret = compare
//         ? compare.call(compareContext, objA, objB)
//         : void 0;
//     if (ret !== void 0) {
//         return !!ret;
//     }
//
//
//     if (objA === objB) {
//         return true;
//     }
//     if (typeof objA !== "object" || !objA ||
//         typeof objB !== "object" || !objB) {
//         return false;
//     }
//
//     const keysA = Object.keys(objA);
//     const keysB = Object.keys(objB);
//
//     if (keysA.length !== keysB.length) {
//         return false;
//     }
//
//     const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
//
//     // Test for A"s keys different from B.
//     for (let idx = 0; idx < keysA.length; idx++) {
//
//         const key = keysA[idx];
//         if (!bHasOwnProperty(key)) {
//             return false;
//         }
//
//         const valueA = objA[key];
//         const valueB = objB[key];
//
//         ret = compare
//             ? compare.call(compareContext, valueA, valueB, key)
//             : void 0;
//
//         if (ret === false ||
//             ret === void 0 && valueA !== valueB) {
//             return false;
//         }
//     }
//
//     return true;
// }


// 3. reselect
// function defaultEqualityCheck(a, b) {
//     return a === b
// }
// function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
//     if (prev === null || next === null || prev.length !== next.length) {
//         return false
//     }
//
//     // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
//     const length = prev.length
//     for (let i = 0; i < length; i++) {
//         if (!equalityCheck(prev[i], next[i])) {
//             return false
//         }
//     }
//
//     return true
// }
// export function defaultMemoize(func, equalityCheck = defaultEqualityCheck) {
//     let lastArgs = null
//     let lastResult = null
//     // we reference arguments instead of spreading them for performance reasons
//     return function () {
//         if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
//             // apply arguments instead of spreading for performance.
//             lastResult = func.apply(null, arguments)
//         }
//
//         lastArgs = arguments
//         return lastResult
//     }
// }
//


// 4. fbjs
