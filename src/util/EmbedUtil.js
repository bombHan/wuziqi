/**
 * Created by swchen on 2017/7/7.
 */


const validate = () => {

    try {

        const parent = window && window.parent;

        if (!parent) {
            console.warn(`Please use "EmbedUtil" in web browser`);
            return false;
        }
        // 跨域环境下会触发错误
        // Uncaught DOMException: Blocked a frame with origin "http://localhost:3000" from accessing a cross-origin frame
        const ObjFactory = parent.Object;
        // 本来可以直接写 return true, 这里写!!ObjFactory是
        // 防止编译器优化掉const ObjFactory = parent.Object, 从而导致异常不能正确触发
        return !!ObjFactory;

    } catch (ex) {
        console.warn(`Please use "EmbedUtil" in same-origin`);

        return false;
    }
};


const showLogin = msg => {
    if (validate()) {
        if (window.parent.lockScreen) {
            window.parent.lockScreen(msg);
            return true;
        } else {
            console.warn(`window.parent.lockScreen is null`);
            return false;
        }
    } else {
        return false;
    }
};


const maximize = () => {

    if (validate()) {
        if (window.parent._maximize_) {
            window.parent._maximize_();
            return true;
        } else {
            console.warn(`window.parent._maximize_ is null`);
            return false;
        }
    } else {
        return false;
    }
};


const restore = () => {
    if (validate()) {
        if (window.parent._minimize_) {
            window.parent._minimize_();
            return true;
        } else {
            console.warn(`window.parent._minimize_ is null`);
            return false;
        }
    } else {
        return false;
    }
};


export default {
    maximize,
    restore,
    showLogin,
}

