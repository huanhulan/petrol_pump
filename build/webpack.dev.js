const merge = require("webpack-merge");
const webpack = require('webpack');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const path = require('path');
const common = require("./webpack.common.js");

const cssLoaderOptions = {
    camelCase: true,
    localIdentName: "[path][name]__[local]--[hash:base64:5]",
    modules: true,
    minimize: false,
    namedExport: true,
    scss: true,
    sourceMap: true
};

const sassLoaderOptions = {
    sourceMap: true
};

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(merge(common(cssLoaderOptions, sassLoaderOptions), {
    mode: "development",
    devServer: {
        hotOnly: true,
        compress: true,
        port: 3000
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "/../dist"),
        publicPath: "/dist/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.WatchIgnorePlugin([
            /css\.d\.ts$/
        ]),
        new ProgressBarPlugin(),
        new DashboardPlugin(),
    ],
    devtool: "inline-source-map"
}));