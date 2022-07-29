// 配置路由信息
// 导入文件配置信息
const { readHtmlFile, readimgFile, readjsonFile } = require('../files');

// 导入地址对象
const url = require('url');
// 导入文件对象
const fs = require('fs');

// 暴露路由配置信息
module.exports={
    home(req,res){
        readHtmlFile('../day03/view/home.html',req,res);
    },
    login(req,res){
        readHtmlFile('../day03/view/login.html',req,res);
    },
    regist(req,res){
        readHtmlFile('../day03/view/regist.html',req,res);
    },
    search(req,res){
        readHtmlFile('../day03/view/search.html',req,res);
    },
    404(req,res){
    readHtmlFile('../day03/view/notFund.html',req,res);
    },
    zou(req,res){
    readimgFile('../day03/img/zou.png',req,res);
    },
    data(req,res){
        readjsonFile('../day04/movie.json',req,res);
    },
    img(req,res){
        const pathname = url.parse(req.url).pathname.replace(/\//,'');
        if(fs.existsSync(pathname)){
            readimgFile(pathname,req,res);
        }else{
            readHtmlFile('../day03/view/notFund.html',req,res);
        }
    }
}