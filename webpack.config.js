/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv = {}) => {
    const isProd = argv.mode === 'production';

    const config = {
        entry: {
            app: './src/index.tsx',
        },
        output: {
            path: path.join(__dirname, './dist'),
            publicPath: '/',
            filename: '[name].[hash].js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        optimization: {
            minimizer: [new UglifyJsPlugin()],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                files: {
                    js: ['app.[hash].js'],
                },
                template: './src/index.html',
                filename: './index.html',
                inject: false,
            }),
        ],
    };

    return config;
};
