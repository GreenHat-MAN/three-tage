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
  }

})
