import path from "path";

export default [{
    //
    test: /\.html$/i,
    use: [
        "file-loader?name=[name].[ext]",
    ]
}, {
    test: /\.(jpe?g|png|gif|ico)$/i,
    use: [
        // limit=8192 = 8K
        "url-loader?limit=10000&name=[path][name].[ext]",
    ]
}, {
    // 将 Svg 转成 react 组件
    test: /\.svg$/i,
    // 排除
    exclude: [
        path.join(process.cwd(), "src/asset/font"),
    ],
    use: [
        "svg-react-loader",
    ]
}, {
    // 复制字体文件 如: CSS中url("ncicon.woff")
    test: /\.(ttf|eot|svg|woff2?)(\?v=[a-z0-9=.]+)?$/i,
    // 包含
    include: [
        path.join(process.cwd(), "src/asset/font"),
    ],
    use: [
        "file-loader?name=[path][name].[ext]",
    ]
}, {
    test: /\.js$/i,
    exclude: /(node_modules|bower_components)/,
    use: [
        "babel-loader",
    ]
}, {
    // css 和 less 不会加hash
    test: /\.css$/i,
    use: [
        "style-loader",
        "css-loader?modules&localIdentName=[local]",
    ]
}, {
    test: /\.less$/i,
    use: [
        "style-loader",
        "css-loader?modules&localIdentName=[local]",
        "less-loader?sourceMap=true"
    ]
}, {
    // NOTE: css module方式 不支持css url导入字体, 因此需要去掉css module
    test: /\.scss$/i,
    // 包含
    include: [
        path.join(process.cwd(), "src/asset/font"),
    ],
    use: [
        "style-loader",
        "css-loader",
        "sass-loader?sourceMap=true"
    ]
}, {
    // src/style, src/component 目录下不加hash
    // 只有使用css module方式, 才能在代码里写 customStyle["numas-classname"]
    test: /\.scss$/i,
    // 包含
    include: [
        path.join(process.cwd(), "src/style"),
        path.join(process.cwd(), "src/component"),
    ],
    use: [
        "style-loader",
        "css-loader?modules&localIdentName=[local]",
        "sass-loader?sourceMap=true"
    ]
}, {
    // 其他情况, css module有加Hash
    test: /\.scss$/i,
    // 排除
    exclude: [
        path.join(process.cwd(), "src/style"),
        path.join(process.cwd(), "src/asset/font"),
        path.join(process.cwd(), "src/component"),
    ],
    use: [
        "style-loader",
        "css-loader?modules&localIdentName=[path]__[name]__[local]___[hash:base64:5]",
        "sass-loader?sourceMap=true"
    ]
}];
