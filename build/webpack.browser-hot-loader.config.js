const path = require('path')
const webpack = require('webpack');
const base = require('./webpack.browser.config');
const merge = require('webpack-merge');

const config = merge(base, {

    devtool: 'cheap-module-eval-source-map',

    entry: [
        "babel-regenerator-runtime",
        './src/main.js'
    ],

    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: 'bundle.js',
    },

    devServer: {
        disableHostCheck: true,

        port: 8080,
        historyApiFallback: {
            index: '/demo.html'
        },

        compress: true,
        hot: true,
        open: true,
        overlay: true,
        stats: {
            normal: true
        },
    },



});

module.exports = config;