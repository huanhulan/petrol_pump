const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (cssLoaderOptions, sassLoaderOptions) {
  return {
    entry: "./app/index.tsx",
  
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist",
      publicPath: "/dist/"
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "typings-for-css-modules-loader",
            options: cssLoaderOptions
          }, {
            loader: "sass-loader",
            options: sassLoaderOptions
          }]
        })
      }, {
        test: /\.(png)$/i,
        use: [{
          loader: "file-loader",
          options: {
            name: "[hash].[ext]",
            outputPath: "images/",
            publicPath: "../"
          }
        }, {
          loader: "image-webpack-loader"
        }]
      }, {
        test: /\.modernizrrc\.json$/,
        use: [{
          loader: "modernizr-loader"
        }, {
          loader: "json-loader"
        }]
      }]
    },
     plugins: [
      new ExtractTextPlugin("stylesheets/main.css")
    ]
  }
};