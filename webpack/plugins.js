import webpack from "webpack";
import CleanPlugin from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import path from "path";

import config from "./config";
import WebpackConstants from "../src/constant/WebpackConstants";


const isProduction = config.nodeEnv === WebpackConstants.NODE_ENV.PRODUCTION;


const chunks = ["antd", "echarts", "react", "base", "polyfill"];
const indexChunks = ["polyfill", "base", "react", "echarts", "antd", "index"];


let plugins = [
        new CaseSensitivePathsPlugin(),

        new webpack.DefinePlugin({
            // https://github.com/ecomfe/echarts/issues/6111
            // https://github.com/ecomfe/echarts/issues/6535
            __DEV__: !isProduction,
            __SERVER__: !isProduction,
            __DEVELOPMENT__: !isProduction,
            __DEVTOOLS__: !isProduction,
            "process.env": {
                NODE_ENV: JSON.stringify(config.nodeEnv),
                // TARGET: JSON.stringify(WebpackConstants.TARGET.DEFAULT),
            },
        }),

        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
            minChunks: 2,
        }),

        new webpack.optimize.CommonsChunkPlugin({
            names: chunks,
            minChunks: Infinity,
        }),

        new HtmlWebpackPlugin({
            filename: "index.html",
            favicon: path.join(process.cwd(), "src/asset/image/favicon.ico"),
            template: path.join(process.cwd(), "src/application/default/index.ejs"),
            inject: true,
            chunks: indexChunks,
            chunksSortMode: (chunk1, chunk2) => {
                const order1 = indexChunks.indexOf(chunk1.names[0]);
                const order2 = indexChunks.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        })
    ]
;


if (isProduction) {

    plugins = plugins.concat([

        new CleanPlugin(["dist"], {
            root: process.cwd()
        }),

        new webpack.optimize.OccurrenceOrderPlugin(),

        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200,
        }),
    ]);
}


if (config.flags.includes(WebpackConstants.FLAG.COMPRESS)) {
    plugins = plugins.concat([

        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: true,
            compress: {
                warnings: false,
            },
        }),
    ]);
}


export default plugins;
