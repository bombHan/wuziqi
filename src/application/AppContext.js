import _ from "lodash";
import deepFreeze from "deep-freeze";

// menus

// 方案一 函数式 + 闭包模式
//


const constants = deepFreeze({
    SHIFT_DATE_DISPLAY_MODE: {
        DAYHOUR: "DAYHOUR",
        DAY: "DAY",
        HOUR: "HOUR",
    },
    PLATFORM: {
        DEFAULT: "default",
        DINGDING: "dingding",
    },
});


const normalizeUrlHash = hash => hash.replace(/^#\/?/, "");

let _config;
let _role;
let _permission;
let _menus;
let _user;
let _rootUnit;
let _platform;
const init = data => {

    const {
        user,
        config,
        roles,
        permissions,
        menus,

        rootUnit,
        platform,
    } = data;

    _user = user;

    _rootUnit = rootUnit;
    _platform = platform;


    // SHIFT_PLAN_EXCEL_MODE                是否可以开启Excel式排班
    // SHIFT_DEDUCT_STD_HOURS_AVAILABLE     扣除标准时数
    // SHIFT_DATE_DISPLAY_MODE              日期显示模式
    _config = _.chain(config)
        .keyBy(item => item.key)
        .mapValues((item, key) => {
            if (key === "SHIFT_DATE_DISPLAY_MODE") {
                if (item.value === 2) {
                    return constants.SHIFT_DATE_DISPLAY_MODE.DAY;

                } else if (item.value === 3) {
                    return constants.SHIFT_DATE_DISPLAY_MODE.HOUR;

                } else {
                    return constants.SHIFT_DATE_DISPLAY_MODE.DAYHOUR;
                }
            } else if (key === "SHIFT_DATE_DISPLAY_MODE_only_annual_leave") {   // NOTE: 服务端这个key名给取的...
                if (item.value === 2) {
                    return constants.SHIFT_DATE_DISPLAY_MODE.DAY;

                } else if (item.value === 3) {
                    return constants.SHIFT_DATE_DISPLAY_MODE.HOUR;

                } else {
                    return constants.SHIFT_DATE_DISPLAY_MODE.DAYHOUR;
                }
            } else {
                return item.value;
            }
        })
        .value();


    _role = _.chain(roles)
        .keyBy(item => item)
        .value();

    _permission = _.chain(permissions)
        .keyBy(item => item)
        .value();

    _menus = _.chain(menus)
        .forEach(menu => menu.pageIndex = normalizeUrlHash(menu.pageIndex))
        .keyBy(menu => menu.pageIndex)
        .value();


};


export default {

    store: null,


    constants,

    // or get/set ?? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    get user() {
        return _user;
    },
    get rootUnit() {
        return _rootUnit;
    },
    get platform() {
        return _platform;
    },

    get target() {
        return process.env.TARGET;
    },

    config: {
        get: key => {
            if (_config != null) {
                return _config[key];
            }
        },
    },
    role: {
        has: key => {
            if (_role != null && _role[key] != null) {
                return true;
            } else {
                return false;
            }
        },
    },

    permission: {
        has: key => {
            if (_permission != null && _permission[key] != null) {
                return true;
            } else {
                return false;
            }
        },
    },

    currentModule: {
        // 模块权限
        getPermission: () => {
            const modulePath = window.location.hash;
            if (_menus != null) {
                const module = _menus[normalizeUrlHash(modulePath)];
                if (module != null) {
                    return module.perm.perm;
                }
            }
        }
    },

    init,
}


// 方案二 仿单例模式
// AppContext.Current.Config.get(xxx)

// export default class AppContext {
//
//     static Constants = {
//         SHIFT_DATE_DISPLAY_MODE: {
//             DAYHOUR: "DAYHOUR",
//             DAY: "DAY",
//             HOUR: "HOUR",
//         }
//     };
//
//     static Current() {
//         return this._current;
//     }
//
//     get Config() {
//         return this._config;
//     }
//
//     get User() {
//         return this._user;
//     }
//
//
//
//     initUser(user) {
//         this._user = user;
//     }
//     initConfig(cfg) {
//
//         // SHIFT_DEDUT_STD_HOURS_AVAILABLE
//         // SHIFT_DATE_DISPLAY_MODE
//
//         const data = _.chain(cfg)
//             .keyBy(item => item.key)
//             .mapValues((item, key) => {
//                 if (key === "SHIFT_DATE_DISPLAY_MODE") {
//                     if (item.value === 2) {
//                         return AppContext.Constants.SHIFT_DATE_DISPLAY_MODE.DAY;
//
//                     } else if (item.value === 3) {
//                         return AppContext.Constants.SHIFT_DATE_DISPLAY_MODE.HOUR;
//
//                     } else {
//                         return AppContext.Constants.SHIFT_DATE_DISPLAY_MODE.DAYHOUR;
//                     }
//                 } else {
//                     return item.value;
//                 }
//             })
//             .value();
//
//
//         this._config = {
//             get: key => {
//                 if (data != null) {
//                     return data[key];
//                 }
//             },
//         }
//     }
// }

// 方案三 静态函数
// AppContext.Config.get(xxx)

// let _config;
// export default class AppContext {
//
//     static Constants = {
//         SHIFT_DATE_DISPLAY_MODE: {
//             DAYHOUR: "DAYHOUR",
//             DAY: "DAY",
//             HOUR: "HOUR",
//         }
//     };
//
//
//
//     static get Config() {
//         // (1)
//         return _config;
//     }
//     static get User() {
//         // (2)
//         return AppContext._user;
//     }
//
//
//
//     initUser(user) {
//         AppContext._user = user;
//     }
//     initConfig(cfg) {
//
//         // SHIFT_DEDUT_STD_HOURS_AVAILABLE
//         // SHIFT_DATE_DISPLAY_MODE
//
//         const data = _.chain(cfg)
//             .keyBy(item => item.key)
//             .mapValues((item, key) => {
//                 if (key === "SHIFT_DATE_DISPLAY_MODE") {
//                     if (item.value === 2) {
//                         return AppContext.Constants.SHIFT_DATE_DISPLAY_MODE.DAY;
//
//                     } else if (item.value === 3) {
//                         return AppContext.Constants.SHIFT_DATE_DISPLAY_MODE.HOUR;
//
//                     } else {
//                         return AppContext.Constants.SHIFT_DATE_DISPLAY_MODE.DAYHOUR;
//                     }
//                 } else {
//                     return item.value;
//                 }
//             })
//             .value();
//
//
//         _config = {
//             get: key => {
//                 if (data != null) {
//                     return data[key];
//                 }
//             },
//         }
//     }
// }
