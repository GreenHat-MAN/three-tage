const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false, //去除eslint的警告

  devServer: {  //开发的服务器配置 
    host: "localhost", // 0.0.0.0
    port: 7000,
    // inline:true, 
    hot: true,  // 自动刷新页面
    open: true,  // 自动打开浏览器 
    proxy: {
      // 配置反向代理解决跨域问题
      "/api": {   // 没有公共的代理  自己设置公共路径 api 
        target: "http://localhost:2206/",
        pathRewrite: {  // 人为添加公共路径的代理 需要重置为 ''
          "^/api": ""
        }
      },
      "/captcha":{
        target:"http://121.196.235.163:3000/"
      },
      "/bshop": {   
        target: "https://mall.bilibili.com/",
        pathRewrite: {  
          "^/bshop": ""
        }
      },
      "/shop": {   
        target: "https://mall.bilibili.com/",
        pathRewrite: {  
          "^/shop": ""
        }
      },
      "/cate": {   
        target: "https://mall.bilibili.com/",
        pathRewrite: {  
          "^/cate": ""
        }
      },
      "/search": {   
        target: "https://mall.bilibili.com/",
        pathRewrite: {  
          "^/search": ""
        }
      },
      "/gory": {   
        target: "https://mall.bilibili.com/",
        pathRewrite: {  
          "^/gory": ""
        }
      },
      "/vtwo": {   
        target: "https://mall.bilibili.com/",
        pathRewrite: {  
          "^/vtwo": ""
        }
      },
    }
  },

  // 浏览器适配问题
  chainWebpack: config => {
    config.module
      .rule('scss')  // 基于SCSS 
      .oneOf('vue')
      .use('px2rem-loader')  // px => rem 
      .loader('px2rem-loader')
      .before('postcss-loader')
      .options({ remUnit: 37.5 }) // 这里的16数字要和rem.js里面的一致  网易 100 淘宝 75   vantUI设计稿 375 
      .end()
  },

})
