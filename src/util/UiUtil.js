/**
 * Created by swchen on 2017/5/31.
 */


import addDOMEventListener from "add-dom-event-listener";
import ReactDOM from "react-dom";

const measureScrollbarFactory = () => {

    // Measure scrollbar width for padding body during modal show/hide
    const scrollbarMeasure = {
        position: "absolute",
        top: "-9999px",
        width: "50px",
        height: "50px",
        overflow: "scroll",
    };

    let scrollbarSize;

    return function measureScrollbar() {
        if (typeof document === "undefined" ||
            typeof window === "undefined") {
            return 0;
        }
        if (scrollbarSize != null) {
            return scrollbarSize;
        }
        const scrollDiv = document.createElement("div");
        for (const scrollProp in scrollbarMeasure) {
            if (scrollbarMeasure.hasOwnProperty(scrollProp)) {
                scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
            }
        }
        document.body.appendChild(scrollDiv);
        const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        const height = scrollDiv.offsetHeight - scrollDiv.clientHeight;
        document.body.removeChild(scrollDiv);

        scrollbarSize = {
            width,
            height,
        };

        return scrollbarSize;
    }
};

const measureScrollbar = measureScrollbarFactory();

function addEventListener(target, eventType, cb) {
    /* eslint camelcase: 2 */
    // https://undefinedblog.com/what-happened-after-set-state/?utm_source=tuicool&utm_medium=referral
    const callback = ReactDOM.unstable_batchedUpdates
        ? e => ReactDOM.unstable_batchedUpdates(cb, e)
        : cb;
    return addDOMEventListener(target, eventType, callback);
}


function hasScrollbar(element) {
    const overflow = element.currentStyle
        ? element.currentStyle.overflow
        : window.getComputedStyle(element).getPropertyValue("overflow");

    if (overflow === "hidden") {
        return {
            horizontal: false,
            vertical: false
        };
    }
    if (element.scrollWidth > element.clientWidth) {
        if (element.scrollHeight > element.clientHeight) {
            const size = measureScrollbar();
            // webkit browser has a bug
            if (element.scrollWidth > element.clientWidth + size.width) {
                return {
                    horizontal: true,
                    vertical: true,
                }
            } else {
                return {
                    horizontal: false,
                    vertical: true,
                }
            }
        } else {
            return {
                horizontal: true,
                vertical: false,
            };
        }
    } else {
        if (element.scrollHeight > element.clientHeight) {
            return {
                horizontal: false,
                vertical: true,
            };

        } else {
            return {
                horizontal: false,
                vertical: false,
            };
        }
    }
}


function contains(root, node) {
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }

    return false;
}


export default {
    measureScrollbar,
    addEventListener,
    hasScrollbar,
    contains,
}