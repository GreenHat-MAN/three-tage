// 操作数据库
// 导入连接文件
require('./connect')
// 导入操作模块文件
const {stuInfoModel,stuScoreModel,MyMoiveModel}=require('./model')

// 添加数据
// stuInfoModel.insertMany([
//     {
//     stuName:'罗先略',
//     stuAge:22,
//     stuSex:'男'
//     },
//     {
//     stuName:'隔壁老王',
//     stuAge:18,
//     stuSex:'男'
//     },
//     {
//     stuName:'宋天仪',
//     stuAge:25,
//     stuSex:'女'
//     }
// ]).then(result=>{
//     console.log('添加成功!!!');
// }).catch(err=>{
//     console.log('添加失败!!!');
// })

// 查询添加的学生信息
// stuInfoModel.find({
// },{}).then(result=>{
//     console.log(result);
// }).catch(err=>{
//     console.log(err);
// })

// 修改学生信息
// stuInfoModel.updateMany(
//     {
//         stuName:'罗先略'
//     },
//     {
//         $set:{stuAge:23,stuSex:'无'}
//     }
// ).then(result=>{
//     console.log('修改成功!!!');
// }).catch(err=>{
//     console.log('修改失败!!!');
// })


// 条件查询
async function getMovieInfo(req,res){
    let result=await MyMoiveModel.find({},{
        _id:0,
        title:1,
        genres:1,
        year:1,
        'rating':1,
        'directors':1
    })
    .sort({year:1})
    .limit(10)
    .skip(10)
    res.writeHead(200,{'content-Type':'application/json'})
    res.write(JSON.stringify(result));
    res.end();
}

async function getStudentInfo(req,res){
    let result=await stuInfoModel.find()
    res.writeHead(200,{'content-Type':'application/json'})
    res.write(JSON.stringify(result))  // json 数据
    res.end()
}


// 连接服务器
const http=require('http')
const url=require('url')

http.createServer((req,res)=>{
    if(req.url!='/favicon.ico'){
        let pathName=url.parse(req.url).pathname.replace(/\//,'')
        if(pathName=='home'){
            res.writeHead(200,{'context-Type':'text/html;charset=utf8'})
            res.write('<h1>首页</h1>')
            res.end()
        }else if(pathName=='movie'){
            getMovieInfo(req,res)
        }else if(pathName=='student'){
            getStudentInfo(req,res)
        }
    }
}).listen(8000,"localhost",()=>{
    console.log("服务器启动成功")
})