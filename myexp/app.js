var createError = require('http-errors'); //导入服务错误提示插件捕捉异常
var express = require('express'); //导入express插件
var path = require('path'); //导入获取访问地址node自带
var cookieParser = require('cookie-parser'); //处理cookie插件
var logger = require('morgan'); //导入日志记录

var indexRouter = require('./routes/index'); //根目录index路由
var usersRouter = require('./routes/users'); //根目录users路由

var app = express(); //将express实例上所有方法赋给app

app.use('/static', express.static(path.join(__dirname, 'public'))); //将public设置为静态资源目录文件
// 引入数据库
require('./public/javascripts/connect')


// view engine setup
app.set('views', path.join(__dirname, 'views')); //将views文件设置为根目录
app.set('view engine', 'ejs'); //设置视图模板引擎为ejs

app.use(logger('dev'));  //日志打印
app.use(express.json()); //获取请求数据的方法 req.body
app.use(express.urlencoded({ extended: false })); //post提交的数据
app.use(cookieParser()); //获取cookie

// console.log(path.join(__dirname + '/public')+'/\javascripts/connect');

app.use('/', indexRouter); //使用路由插件 路由地址=路由别名+路由原名
app.use('/users', usersRouter);

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
