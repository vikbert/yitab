/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
    entry: {
        options: path.join(__dirname, 'src/options/index.tsx'),
        background: path.join(__dirname, 'src/background.ts'),
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                exclude: /node_modules/,
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(less|css)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader?name=/images/[name].[ext]',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
};
