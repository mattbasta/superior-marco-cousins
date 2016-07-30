var path = require('path');

var webpack = require('webpack');


module.exports = {
    devtool: 'source-map',
    entry: {
        app: ['./src/main.js']
    },
    output: {
        filename: '/main.js',
        path: path.resolve(__dirname),
        publicPath: '/',
        sourceMapFileName: '/main.js.map',
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {warnings: false},
        //     mangle: {},
        //     sourceMap: false,
        // }),
        new webpack.optimize.DedupePlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
