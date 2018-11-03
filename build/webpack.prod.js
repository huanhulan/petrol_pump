const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const webpack = require("webpack");
const WebpackDeepScopeAnalysisPlugin = require("webpack-deep-scope-plugin")
  .default;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const os = require("os");
const common = require("./webpack.common.js");

const cssLoaderOptions = {
  camelCase: true,
  modules: true,
  minimize: true,
  namedExport: true,
  scss: true,
  localIdentName: "[hash:base64:5]"
};

const sassLoaderOptions = {};

module.exports = merge(common(cssLoaderOptions, sassLoaderOptions), {
  mode: "production",
  plugins: [
    new WebpackDeepScopeAnalysisPlugin(),
    new CleanWebpackPlugin(["dist"], {
      root: __dirname
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: os.cpus().length - 1 || 1,
        extractComments: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        }
      })
    ]
  }
});
