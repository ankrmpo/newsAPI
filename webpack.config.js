const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './assets/ts/src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader", options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                loaders: ["style-loader","css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=.]+)?$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img/',
                    publicPath: url => '../public/img/' + url
                }
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                loader: 'file-loader',
                include: [/fonts/],
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: url => '../public/fonts/' + url
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', ".sass", ".css" ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public')
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'bundle.css',
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
            "window.$": "jquery"
        })
    ]
};