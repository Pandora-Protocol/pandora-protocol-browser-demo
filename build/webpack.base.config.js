const path = require('path');
const webpack = require('webpack');
const vueConfig = require('./vue-loader.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');

//const isAnalyze = false;


module.exports = {
    //define entry point
    entry: ['babel-regenerator-runtime'],
    devtool: isProd ? false : '#cheap-module-source-map',
    // send to distribution
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: [ '.js', '.vue' ],
        alias: {
            src: path.resolve(__dirname + '/../src'),
        }
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process

        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',

                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.css$/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        use: 'css-loader?minimize',
                        fallback: 'vue-style-loader'
                    })
                    : ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                query: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    plugins:

        [
            new VueLoaderPlugin(),

            new webpack.DefinePlugin({
                "process.env": {
                    BROWSER: 'true'
                }
            }),

            ... (isProd
                ? [
                    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),

                    new webpack.optimize.UglifyJsPlugin({
                        compress: { warnings: false }
                    }),
                    new ExtractTextPlugin({
                        filename: 'common.[chunkhash].css'
                    }),

                ]
                : [
                    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
                    new FriendlyErrorsPlugin(),
                ])

        ]

};

