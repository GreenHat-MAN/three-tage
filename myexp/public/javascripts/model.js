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
    dbPass:String, //密码
    role:Number,  // 身份角色
    avatar:String,   //头像
    time:Date 
});


// 定义学生成绩集合
const stuScore=new Schema({
    stuName:String, //学生姓名
    english:String, //英语成绩
    math:String, //数学成绩
    chinese:String, //语文成绩
    stuScore:Number, //总分
    stuRank:Number, //排名
    testDay:Date //上传成绩的时间
});


// 定义面试题集合
const audInfo=new Schema({
    subject:String, //面试题标题
    content:String, //面试题内容
    stuName:String, //谁发的面试题
    releaseTime:Date, //上传的时间
});


// 定义角色权限信息集合
const stuRole=new Schema({
    text:String,
    value:Number,
    id:Number,
    color:String,
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


const MyXueke = new Schema({
    name:String,
    id:Number,
    value:String,
})

const MyBanji = new Schema({
    xueke:String,
    year:String,
    num:Number,
    name:String,   // 武汉HTML5JY2206
    value:String,  // wh-html5-2206
})

const tongzhi = new Schema({
    name:String, //谁发的通知
    region:String, //通知标题
    desc:String,  //通知具体内容
    time:Date, //发通知的时间
    image:Array //通知图片
})

// 评论表
const discuss = new Schema({
    name:String, //谁评论的
    content:String, //评论的啥
    time:Date, //啥时候评论的
    titleId:String, //在哪个面试题下评论的
    avater:String //头像
})

// 意见表
const Advise = new Schema({
    name:String, //谁发的意见
    advise:String, //发的啥
    time:Date,  //什么时候发的
})


// 考勤表
const Attendance = new Schema({
    name:String, //谁打的卡
    cardTime:String, //打卡日期
    cardCount:String //打卡次数
})

// 面试题
const MyMainShi = new Schema({
    author:Object,
    title:String,
    type:String,
    cate:String,
    content:String,
    answer:String,
    score:Number,  // 0  有答案 10  看一次加一分 点赞加2分  收藏加3分  评论加2分 
    time:Date, 
    like:Number,
    collect:Number,
    ping:Number 
})


// 暴露模块信息
exports.stuInfoModel=mongoose.model('stuInfos',stuInfo);//表明+Schema模块名

exports.stuScoreModel=mongoose.model('stuScores',stuScore);

exports.MyMoiveModel=mongoose.model('movies',MyMoive);

exports.roleInfoModel=mongoose.model('roles',stuRole);

exports.audInfoModel=mongoose.model('audInfos',audInfo);

exports.MyXuekeModel = mongoose.model('xuekes',MyXueke)

exports.MyBanjiModel = mongoose.model('banjis',MyBanji)

exports.TongzhiModel = mongoose.model('tongzhis',tongzhi)

exports.DiscussModel = mongoose.model('discusss',discuss)

exports.AdviseModel = mongoose.model('advises',Advise)

exports.AttendanceModel = mongoose.model('attendances',Attendance)

exports.MyMainShi = mongoose.model('mainshis',MyMainShi)