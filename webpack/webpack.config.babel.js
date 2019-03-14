import path from "path";


import WebpackConstants from "../src/constant/WebpackConstants";
import plugins from "./plugins";
import rules from "./rules";
import config from "./config";


const isProduction = config.nodeEnv === WebpackConstants.NODE_ENV.PRODUCTION;


let proxy = {
    "/api/*": {
        target: config.proxyServer,
        secure: false
    },
    // 文书引擎
    "/web/*": {
        target: config.proxyServer,
        secure: false
    },
    "/mock/*": {
        target: "http://localhost:6455",
        secure: false
    },
    // numas
    "/normal/*": {
        target: config.proxyServer,
        secure: false
    },
    "/login*": {
        target: config.proxyServer,
        secure: false
    }
};


let entry = {

    index: path.join(process.cwd(), "src/application/default/index.js"),
    polyfill: [
        "babel-polyfill", "whatwg-fetch", "react-hot-loader/patch"
    ],
    "base": [
        "classnames", "lodash", "moment", "url-join",
        "raven-js", "add-dom-event-listener", "component-classes", "mathjs",
        "query-string", "shallowequal",
    ],
    react: [
        "react", "react-dom", "redux", "redux-thunk",
        "react-redux", "react-router-dom", "react-router",
    ],
    echarts : ["echarts", "echarts-for-react"],
    "antd": ["antd"],

};


//-----------------------------------------------------------------------------


export default {
    context: path.join(process.cwd(), "src"),
    devtool: isProduction
        ? "source-map"
        : "cheap-module-eval-source-map",

    output: {
        path: path.join(process.cwd(), "dist"),
        filename: isProduction
            ? "[name].[chunkhash].js"
            : "[name].js",
        chunkFilename: isProduction
            ? "[name].[chunkhash].js"
            : "[name].js",
    },

    entry,

    plugins,

    module: {
        rules,
    },

    node: {
        __filename: true,
        __dirname: true
    },


    devServer: {
        // --host 0.0.0.0 Not working #882
        // https://github.com/webpack/webpack-dev-server/issues/882
        host: "0.0.0.0",

        disableHostCheck: true,

        proxy,
    },
};
