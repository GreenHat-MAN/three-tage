// 配置服务器信息
const http=require('http');
const hostName='localhost';
const portName=2206;
const url=require('url');
//导入路由文件
const route=require('./route');


const server=http.createServer((req,res)=>{
    if(req.url!='/favicon.ico'){
        const pathname=url.parse(req.url).pathname.replace(/\//,'');
        try {
            if(pathname.indexOf('img')!=-1){
                route['img'](req,res)
            }else{
                route[pathname](req,res);
            }
        } catch (error) {
            route['404'](req,res);
        }
    }
})

server.listen(portName,hostName,()=>{
    console.log('服务已启动!!!');
})