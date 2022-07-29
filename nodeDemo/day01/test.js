// Nodejs第一个web服务器程序开始

// 一个服务器应用包括协议、主机加端口

// 创建协议
const http=require("http");

// 创建主机
const hostName="localhost";

// 创建端口
const postName=8888; //随意只要不被占用


// 调用模块user
const User=require('./user');
// console.log(User);
const u1=new User(22,'罗先略','男');

// 创建服务
// req请求信息
// res响应信息
http.createServer((req,res)=>{

    // 响应操作反馈数据给前端
    res.writeHead(200,{'content-Type':'text/html;charset=utf8'});
    res.write('<h1>我是一个页面标签标签</h1>');
    res.write(`
        <ol>
            <li>什么都可以写</li>
            <l1>${User}</li>
            <l1>${u1.age}</li>
            <l1>${u1.name}</li>
            <l1>${u1.sex}</li>
            <l1>${u1.say()}</li>
        </ol>
    `);
    // end方法只执行一次
    res.end('我是结束程序最后一条语句');
    // res.write('<h1>结束后的标签!!!</h1>');
}).listen(postName,hostName,()=>{
    console.log('第一个node服务器已启动');
})