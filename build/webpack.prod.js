const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const webpack = require('webpack');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const common = require("./webpack.common.js");

const cssLoaderOptions = {
    camelCase: true,
    modules: true,
    minimize: true,
    namedExport: true,
    scss: true,
    localIdentName: "[hash:base64:5]",
};

const sassLoaderOptions = {};

module.exports = merge(common(cssLoaderOptions, sassLoaderOptions), {
    plugins: [
        new WebpackDeepScopeAnalysisPlugin(),
        new CleanWebpackPlugin(['dist'], {
            root: __dirname
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
    ]
});