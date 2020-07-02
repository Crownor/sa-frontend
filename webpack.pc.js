const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/main/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'js/[name].js',
        publicPath: '/dist/'
    },
    devServer: {
        port: 80,
        contentBase: path.join(__dirname, './public'),
        proxy: {
            "/api": {
                target: "http://sa.crownor.com:8000",
                changeOrigin: true,
                //   pathRewrite: {"^/api" : ""}
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // {
            //     test: /\.jsx?$/,
            //     loader: 'babel-loader',
            //     options: {
            //         presets: ['@babel/preset-env', '@vue/babel-preset-jsx'],
            //         plugins: ['@babel/plugin-syntax-dynamic-import']
            //     }
            // },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {

                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'media/[name].[ext]'
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.jsx', 'json'],
        alias: {
            '@': path.resolve('./src'),
            'vue$': 'vue/dist/vue.esm.js',
            'vuex$': 'vuex/dist/vuex.esm.js',
            'vue-router$': 'vue-router/dist/vue-router.esm.js',
        }
    }
};