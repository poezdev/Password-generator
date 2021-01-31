const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = proccess.env.NODE_ENV === 'development';
const isProd = !isDev; 

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    //Добавить сервер

    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
        }),

        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
    ],
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: ['babel-loader']

            },
            {
                test: /\.(?:ico|gif|png|jpeg|jpg)$/i,
                type: 'asset/resource',
            }
            //Добавить loader шрифты
            //Добавить loader css scss
            //Добавить loader pug
            
        ]
    }

}