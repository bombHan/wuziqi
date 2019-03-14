离线使用Icon资源
https://github.com/ant-design/ant-design/issues/645


Web Font
https://ant.design/docs/resource/download


定制主题
https://ant.design/docs/react/customize-theme-cn





字体覆盖方式1.

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

src/ddIndex.js

    import "antd/dist/antd.min.css";
    import "./asset/font/iconfont"





字体覆盖方式2.
src/custom/style/antd.less

    @import "~antd/dist/antd.less";
    @icon-url: "/src/asset/font/iconfont";












style和字体设置

{
    test: /\.(jpe?g|png|gif|svg|ico)$/i,
    // 排除
    exclude: [
        path.join(__dirname, "src/asset/font"),
    ],
    use: [
        // limit=8192 = 8K
        "url-loader?limit=10000&name=[path][name].[ext]",
    ]
}, {
    test: /\.(ttf|eot|svg|woff2?)(\?v=[a-z0-9=.]+)?$/i,
    // 包含
    include: [
        path.join(__dirname, "src/asset/font"),
    ],
    use: [
        "file-loader?name=[path][name].[ext]",
    ]
}, {
    test: /\.css$/i,
    use: [
        "style-loader",
        "css-loader",
    ]
}, {
    test: /\.less$/i,
    use: [
        "style-loader",
        "css-loader",
        "less-loader?sourceMap=true"
    ]
}, {
    test: /\.scss$/i,
    // 包含
    include: [
        path.join(__dirname, "src/style"),
        path.join(__dirname, "src/asset/font"),
        path.join(__dirname, "src/component"),
    ],

    use: [
        "style-loader",
        "css-loader",
        "sass-loader?sourceMap=true"
    ]
}, {
    test: /\.scss$/i,
    // 排除
    exclude: [
        path.join(__dirname, "src/style"),
        path.join(__dirname, "src/asset/font"),
        path.join(__dirname, "src/component"),
    ],
    use: [
        "style-loader",
        "css-loader?modules&localIdentName=[path]__[name]__[local]___[hash:base64:5]",
        "sass-loader?sourceMap=true"
    ]
}