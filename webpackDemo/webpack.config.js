// webpack配置文件
// JS CSS PNG HTML 
// webpack 项目的配置文件  
// 打包文件  模块化
//  JS 
//  PNG/JPG/GIF
//  css /less /scss
//  json / vue / react 
// 出口
// 入口
// scoure-map 
// 开发插件  plugins 
// HTML 打包 

// 导入地址和webpack配置文件
const path = require('path')
const webpack = require('webpack')


// 导入打包HTML配置项
const HtmlWebpackPlugin = require('html-webpack-plugin')


// 打开浏览器
const OpenBrowserPlugin = require('webpack-open-browser-plugin')


// 抽离css样式(成单独文件)
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 配置环境和文件入口和出口
module.exports = {

    //环境 --->开发环境和生产环境
    mode:'development',

    // 文件入口
    entry:['./src/main.js'],

    // 出口
    output:{
        // 讲根目录下的dist文件夹作为打包文件夹
        path:path.resolve(__dirname,'dist'),
        // 打包文件名为js后缀随机长度为8的字符串结尾
        filename:'js[name].[fullhash:8].js',
        // publicPath:'.'上线地址
    },

    // 路径别名
    resolve:{
        alias:{
            "@":path.resolve('src'),
            "~":path.resolve('src/utils'),
            "&":path.resolve('src/views')
        }
    },

    // 地图资源在控制台看见源码
    devtool:'source-map',


    // 打包规则
    module:{
        rules:[
            {   
                // 以以下后缀结尾的文件
                test:/\.(js|jsx|ts|tsx)$/,
                // 不包括以下文件
                exclude:/node_modules/,
                use:['babel-loader'],
            },
            {
                test:/\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:8192,  //  最大不能超大8M 
                            name:"imgs/[name].[hash:8].[ext]",  
                        }
                    }
                ]
            },
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test:/\.less$/,
                use:[MiniCssExtractPlugin.loader,'css-loader','less-loader']
            },
            {
                test:/\.(sass|scss)$/,
                use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            }
        ]
    },


    devServer:{
        host:"localhost", // 0.0.0.0
        port:8000,
        hot:true,  // 自动刷新页面
        open:true,  // 自动打开浏览器 
        compress:true, // 服务器压缩
    },

    // 安装插件
    plugins:[

        // 抽离css样式
        new MiniCssExtractPlugin({
            filename:"css/[name]/[contenthash].css",
            chunkFilename:"css/[id].[contenthash].scc",
        }),


        // 打开浏览器启动
        new OpenBrowserPlugin({
            url:'http://localhost:8000'
        }),

        new webpack.ProgressPlugin(),

        // 打包HTML
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            // 注入 css 和 JS
            inject:true,
            // 压缩 html 
            minify:true
        }),

        // 全局自动引入 
        new webpack.ProvidePlugin({
            React:['react'],
            Component:["react",'Component']
        })

    ]


    

}