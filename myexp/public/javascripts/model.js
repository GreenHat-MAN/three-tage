// 操作数据库的模型文件
// model 表结构模型  (MongoDB 通过表结构模型来操作数据库 )

// 导入连接文件
const mongoose=require('mongoose');
// 导入操作模块
const Schema=mongoose.Schema;

// Schema (定义表结构)
// Schema主要用于定义MongoDB中集合Collection里文档document的结构,
// 理解为mongoose对表结构的定义   (不仅仅可以定义文档的结构和属性，还可以定义文档的实例方法、静态模型方法、复合索引等)
// 每个schema会映射到mongodb中的一个collection，schema不具备操作数据库的能力
// 定义Schema非常简单，指定字段名和类型即可，支持的类型包括以下8种

// String      字符串
// Number      数字    
// Date        日期
// Buffer      二进制
// Boolean     布尔值
// Mixed       混合类型
// ObjectId    对象ID    
// Array       数组

// 定义学生信息集合
const stuInfo=new Schema({
    stuName:String,
    stuPassword:String,
    stuEmail:String,
    stuPhone:String,
});


// 定义学生成绩集合
const stuScore=new Schema({
    stuName:String,
    stuScore:Number,
    stuRank:Number,
    testDay:Date
});

//定义电影列表集合
const MyMoive = new Schema({
    "genres":Array,
    "casts": Array,
    "directors":Array,
    "rating": Object,
    "title": String,
    "collect_count": Number,
    "original_title": String,
    "subtype": String,
    "year": String,
    "images": Object,
    "alt": String,
    "id": String
})


// 暴露模块信息
exports.stuInfoModel=mongoose.model('stuInfos',stuInfo);//表明+Schema模块名

exports.stuScoreModel=mongoose.model('stuScores',stuScore);

exports.MyMoiveModel=mongoose.model('movies',MyMoive);