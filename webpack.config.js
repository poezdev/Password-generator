const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev; 

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        compress: true,
        port: 8080,
        hot: true,
    },

    plugins: [
        new HTMLWebpackPlugin({
            filename: `index.html`,
            template: `${path.resolve(__dirname, '.')}/src/index.pug`
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CleanWebpackPlugin(),
    ],
    devtool: isProd ? false : 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(?:ico|gif|png|jpeg|jpg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline'
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  { 
                    loader: MiniCssExtractPlugin.loader,
                  },
                  {
                    loader: 'style-loader',
                  },
                  {
                    loader: 'css-loader',
                  },
                  {
                    loader: 'resolve-url-loader',
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true,
                    },
                  },
                ],
              },
        ]
    }
}

// Разобраться со стилями - не появляется в dist 
// Построить зависимости - 1) Импорт всех pug-компонентов в index.pug 2) Импорт всех sсss компонентов в js-
// компоненты, а js-компоненты в index.js