var express = require('express');
var router = express.Router();

const { stuInfoModel, stuScoreModel, MyMoiveModel } = require('../public/javascripts/model')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
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

router.post('/stuinfos', async function (rep, res, next) {

  // console.log(rep.body.username);
  // console.log(rep.body.password);
  let result = await stuInfoModel.find({
    $or:[
      {stuName:{$eq:rep.body.username}},
      {password:{$eq:rep.body.password}}
    ]
        // stuName: rep.body.username,
        // password: rep.body.password
  });
  console.log(result);
  // if(result.length>0){
  //   console.log('登录成功!!!');
  //   console.log(result);
  // }else{
  //   console.log('密码错误!!!');
  // }
  // res.json({
  //   code: 200,
  //   msg: '获取用户成功',
  //   data: result
  // })
})



module.exports = router;
