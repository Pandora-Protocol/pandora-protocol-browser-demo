const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')

const config = merge(base, {
    target: 'web',

    node: {
        console: false,
        child_process: "empty",
        dgram: "empty",
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        uws: 'empty'
    },

    //define entry point
    entry: {
        app: "./src/main.js",
    },
    output: {
        filename: 'bundle.js',
    },

});

module.exports = config