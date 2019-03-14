/************************************************* Setting *************************************************/

import "../exceptionReport";
import "../polyfill";

// 1
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

/************************************************* style **************************************************/

// 这里之所以把antd style 一次性载入, 是为了方便后面style覆盖
//(NOTE: 这种方式会载入所有组件的样式，无法和按需加载插件 babel-plugin-import 的 style 属性一起使用.)
// .babelrc
// [
//     "import",
//     {
//         "libraryName": "antd",
//         "style": "css"
//     }
// ]

// 2
import "antd/dist/antd.min.css";
// 自定义字体
import "../../asset/font";

// 重定义 ant.design 组件样式
import "../../custom/style";

// nursecare-web main style
import "../../style";

/**************************************************************************************************/

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {HashRouter, Route} from "react-router-dom";
import {AppContainer} from "react-hot-loader";

// NOTE: LocaleProvider 用的是 antd/es/locale-provider/index.js 的代码
import {LocaleProvider} from "antd";
import zhCN from "antd/es/locale-provider/zh_CN";

import createStore from "../createStore";
import AppContext from "../AppContext";
// 3.
import rootViewModel from "../../viewmodel/index";
import MainView from "../../view/main/default/MainView";

const store = createStore(rootViewModel);
AppContext.store = store;


const layoutRoot = document.getElementById("layoutRoot");
const renderApp = root => {
    ReactDOM.render(
        <AppContainer>
            <LocaleProvider locale={zhCN}>
                <Provider store={store}>
                    <HashRouter>
                            <Route path="/" component={root}/>
                    </HashRouter>
                </Provider>
            </LocaleProvider>
        </AppContainer>,
        layoutRoot);
};



if (module.hot) {
    module.hot.accept("../../viewmodel/index", () => {
        const nextRootViewModel = require("../../viewmodel/index").default;
        store.replaceReducer(nextRootViewModel);
    });
    module.hot.accept("../../view/main/default/MainView", () => {
        const nextMainView = require("../../view/main/default/MainView").default;
        renderApp(nextMainView);
    });
}

renderApp(MainView);
