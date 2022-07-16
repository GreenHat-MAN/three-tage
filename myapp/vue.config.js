const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false, //去除eslint的警告

  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },

  devServer: {  //开发的服务器配置 
    host: "localhost", // 0.0.0.0
    port: 7000,
    // inline:true, 
    hot: true,  // 自动刷新页面
    open: true,  // 自动打开浏览器 
  },

  // 浏览器适配问题
  chainWebpack:config=>{
    config.module
    .rule('scss')  // 基于SCSS 
    .oneOf('vue')
    .use('px2rem-loader')  // px => rem 
    .loader('px2rem-loader')
    .before('postcss-loader')
    .options({ remUnit: 37.5   }) // 这里的16数字要和rem.js里面的一致  网易 100 淘宝 75   vantUI设计稿 375 
    .end()
  },

})
