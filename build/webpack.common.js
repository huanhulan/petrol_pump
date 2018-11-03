const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (cssLoaderOptions, sassLoaderOptions) {
    return {
        entry: "./app/index.tsx",
        output: {
            filename: "bundle.js",
            path: __dirname + "/../dist"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json", ".png", ".wav"]
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
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: sassLoaderOptions
                    }]
                })
            }, {
                test: /\.(wav|png)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1073741824
                    }
                }]
            }, {
                test: /\.modernizrrc\.json$/,
                type: 'javascript/auto',
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