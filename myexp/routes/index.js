var express = require('express');
var router = express.Router();

const { stuInfoModel, stuScoreModel, MyMoiveModel } = require('../public/javascripts/model')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', username: req.session.username });
});

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: '这里是登录界面!!',
  })
})

router.get('/regist', function (req, res, next) {
  res.render('regist', {
    title: '这里是注册界面!!'
  })
})

router.post('/stuinfos', (req, res) => {
  const data = req.body;
  // console.log(data.username);
  // console.log(data.password);
  stuInfoModel.findOne(
    // {stuName:data.username,stuPassword:data.password}
    data
  ).then((result) => {
    if (result) {
      req.session.username = data.username;
      req.session.userInfo = data;
      res.redirect('/');//重定向
    } else {
      res.send(`<script>alert('登录密码,用户名和密码不匹配');location.href='/login' </script>`);
    }
  }).catch((result) => {
    console.log(result);
    res.send(`<script>alert('服务器异常')</script>`)
  })
})

router.all('/out', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
})

router.all('/movie', (req, res) => {
  var data=req.query;
  var keyword = data.keyword;
  var sort={}
  var obj={}
  if(keyword){
    obj = {
      $or:[
        {
          title:new RegExp(keyword)
        },
        {
          year:new RegExp(keyword)
        },
        {
          genres:new RegExp(keyword)
        },{
          'rating.average':new RegExp(keyword)
        }
      ]
    }
  }else{
    sort=data
  }

  if (req.session.username) {
    MyMoiveModel.find(obj, {})
    .sort(sort)
    .then((result) => {
      res.render('movie', {
        result
      })
    }).catch((result) => {
      res.send(`<script>alert('服务器异常')</script>`)
    })
  } else {
    res.send(`<script>alert('session 过期或者无效,请重新登录');location.href='/login' </script>`)
  }



})



module.exports = router;
