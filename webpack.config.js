var path = require('path');

var webpack = require('webpack');


module.exports = {
    // devtool: 'source-maps',
    entry: {
        app: ['./src/main.js']
    },
    output: {
        path: path.resolve(__dirname),
        publicPath: '/',
        filename: '/main.js',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            mangle: {},
            sourceMap: false,
        }),
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
