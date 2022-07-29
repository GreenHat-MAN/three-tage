// 配置读取文件的类型

const fs = require('fs');


// 读取HTML并暴露出去path地址、req请求、res响应
exports.readHtmlFile = function (path, req, res) {
    fs.readFile(path, "utf-8", (err, data) => {
        if(err) throw err;
        res.writeHead(200, { 'content-Type': 'text/html;charset=utf8' });
        res.write(data);
        res.end();
    })
}


// 读取json文件
exports.readjsonFile=function(path,req,res){
    fs.readFile(path,'utf-8',(err,data)=>{
        if(err) throw err;
        res.writeHead(200,{'content-Type':'application'});
        res.write(data);
        res.end();
    })
}

// 读取img文件
exports.readimgFile=function(path,req,res){
    fs.readFile(path,'binary',(err,data)=>{
        if(err) throw err;
        res.writeHead(200,{'content-Type':'image/jpeg'});
        res.write(data,'binary');
        res.end();
    })
}