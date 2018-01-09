const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const webpack = require('webpack');

const cssLoaderOptions = {
  camelCase: true,
  localIdentName: "[path][name]__[local]--[hash:base64:5]",
  modules: true,
  minimize: false,
  namedExport: true,
  scss: true,
  sourceMap: true
}

const sassLoaderOptions = {
  sourceMap: true
}

module.exports = merge(common(cssLoaderOptions, sassLoaderOptions), {
  devServer: {
    compress: true,
    port: 3000
  },

  plugins: [
    new webpack.WatchIgnorePlugin([
      /css\.d\.ts$/
    ]),
    new webpack.SourceMapDevToolPlugin({
      filename: null, // inline sourcemap
      test: /\.(tsx?|js)($|\?)/i // case-insensitive match for ts/js files
    })
  ]
});