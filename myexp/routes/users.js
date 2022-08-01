var express = require('express');
var router = express.Router();
var {stuInfoModel,MyMoiveModel} =require('../public/javascripts/model')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// 注册接口
router.post('/register',(req,res)=>{
  var data = req.body;
  // console.log(data);
  stuInfoModel.findOne({
    $or:[
      {stuName:data.username},
      {stuPhone:data.phone},
      {stuEmail:data.email},
    ]
  }).then((result)=>{
    if(result){
      res.send(`<script> alert('用户信息已存在!!!'); location.href='/regist' </script>`);
    }else{
      stuInfoModel.insertMany(
        {stuName:data.username,stuPhone:data.phone,stuEmail:data.email,stuPassword:data.password}
      ).then((result)=>{
        res.send(`<script> alert('注册成功!!!'); location.href='/login?username=${data.username}' </script>`);
      })
    }
  }).catch((err)=>{
    res.send(`<script> alert('服务器异常!!!'); </script>`);
  })

})


// 电影详情
router.all('/detail',(req,res)=>{
  if(req.session.username){
    MyMoiveModel.findOne({
      id:req.query.id 
    })
    .then(result=>{
      res.render('detail',{
        result 
      })
    })
    .catch(err=>{
      res.send(`<script>alert('服务器异常')</script>`)
    })
  }else{
    res.send(`<script>alert('session 过期或者无效,请重新登录');location.href='/login' </script>`)
  } 
})



module.exports = router;
