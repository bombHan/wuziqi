/**
 * Created by swchen on 2017/2/14.
 */

import MainActionTypes from "../actiontype/MainActionTypes";
import BaseUtil from "../util/BaseUtil";
import EmbedUtil from "../util/EmbedUtil";
import WebpackConstants from "../constant/WebpackConstants";
import Constants from "../constant/Constants";

const initState = {
    isExecuting: false,
    error: null,


    openKeys: [],
    selectedKey: null,
    showMenu: true,
};


export default function mainViewModel(state = initState, action) {
    switch (action.type) {

        case MainActionTypes.IS_EXECUTING: {
            return {
                ...state,
                isExecuting: action.payload,
            };
        }
        case MainActionTypes.DATA: {
            return {
                ...state,
                ...action.payload,
            };
        }

        case MainActionTypes.ERROR: {
            const error = action.payload;
            // console.log(process.env);
            // if (process.env.TARGET === WebpackConstants.TARGET.DINGDING) {
            //     if (error.code === Constants.NO_AUTH_CODE) {
            //         window.location.href = "login.html";
            //
            //         return state;
            //     }
            //
            //     return {
            //         ...state,
            //         error,
            //     };
            //
            // } else {
            // if (error.code === Constants.NO_AUTH_CODE) {
            //
            //     // 如果nursecare-web 嵌入 iframe 中,
            //     // 登录超时的时候需要调用父window的登录方法
            //     if (EmbedUtil.showLogin(error)) {
            //         return state;
            //     }
            // }

            if (error.code === Constants.NO_AUTH_CODE) {
                location = "https://oapi.dingtalk.com/connect/qrconnect?appid=dingoapqfbyog9yxkdjcda&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=https://dashboard.paiban.lianfan.com/api/nursecare/dashbord/noAuth/qrLogin";

                return state;
            }

            return {
                ...state,
                error,
            };
            // }
        }
        case MainActionTypes.MERGE_DEEP:
            return BaseUtil.mergeDeep(state, action.payload);
        default:
            return state;
    }
}

