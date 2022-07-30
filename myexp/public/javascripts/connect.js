// 数据库配置文件
// 连接mongoDB数据库的几个步骤

// 导入连接数据库的插件
const mongoose=require('mongoose');

// 1.定义数据库主机信息
const hostName='localhost';
// 2.定义数据库端口名称
const portName=27017;
// 3.定义需要连接数据库的名称
const dbName='Student';

// 4.用户名和密码(如果数据库有则需要)
const user='?'
const pwd='?'

// 5.组合连接地址
const DB_URL=`mongodb://${hostName}:${portName}/${dbName}`;

// 6.建立连接
mongoose.connect(DB_URL,(err)=>{
    if(err){
        console.log('数据库连接失败!!');
        throw err;
    }else{
        console.log('数据库连接成功!!');
    }
});

// 7.获取数据库连接对象
const conn=mongoose.connection;

// 8.常见连接信息
conn.on('error',(err)=>{
    console.log('数据库连接异常----'+err);
});
conn.on('disconnect',()=>{
    console.log('数据库断开连接!!!');
});
conn.on('connected',()=>{
    console.log('数据库已连接!!!');
});