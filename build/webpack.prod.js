const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const cssLoaderOptions = {
    camelCase: true,
    modules: true,
    minimize: true,
    namedExport: true,
    scss: true
};

const sassLoaderOptions = {};
const env = 'production';

module.exports = merge(common(cssLoaderOptions, sassLoaderOptions, env), {
    output: {
        publicPath: "/",
        filename: "bundle.[chunkhash].js"
    },
    plugins: [
        new ExtractTextPlugin("stylesheets/main.[contenthash].css"),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.template.ejs'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(['docs'], {
            root: __dirname
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        })
    ]
});
