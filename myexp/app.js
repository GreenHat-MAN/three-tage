var createError = require('http-errors'); //导入服务错误提示插件捕捉异常
var express = require('express'); //导入express插件
var path = require('path'); //导入获取访问地址node自带
var cookieParser = require('cookie-parser'); //处理cookie插件
var logger = require('morgan'); //导入日志记录
var session =require('express-session');//导入session文件

var indexRouter = require('./routes/index'); //根目录index路由
var usersRouter = require('./routes/users'); //根目录users路由
var apiRouter = require('./routes/api'); //根目录users路由

var app = express(); //将express实例上所有方法赋给app

app.use('/static', express.static(path.join(__dirname, 'public'))); //将public设置为静态资源目录文件
// 引入数据库
require('./public/javascripts/connect')
var cors = require('cors')

// view engine setup
app.set('views', path.join(__dirname, 'views')); //将views文件设置为根目录
app.set('view engine', 'ejs'); //设置视图模板引擎为ejs

app.use(cors({
  // 没有任何cors限制 
}))

app.use(logger('dev'));  //日志打印
app.use(express.json()); //获取请求数据的方法 req.body
app.use(express.urlencoded({ extended: false })); //post提交的数据
app.use(cookieParser()); //获取cookie


// 使用express-session
app.use(session({
  secret:'WH2206YYDS',// cookie签名 这个属性是必须的 具体配置和`cookie-parser`一样
  saveUninitialized:true, // 是否自动初始化 默认为true
  resave:false,// 当用户session无变化的时候依然自动保存
  cookie:{ // cookie的信息具体操作和`cookie-parser`一样
    maxAge:1000 * 60 * 60 * 2 // 30分钟后过期
  },
  rolling:true// 每次请求的时候覆写cookie
}))

// console.log(path.join(__dirname + '/public')+'/\javascripts/connect');

app.use('/', indexRouter); //使用路由插件 路由地址=路由别名+路由原名
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
// 进入404异常捕捉范围
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 将app暴露出去
module.exports = app;
