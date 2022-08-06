

// Vue 项目的路由板块 
var express = require('express');
var router = express.Router();   // express 的路由模块 
var { createToken, checkToken } = require('../utils/token')
var { stuInfoModel, roleInfoModel } = require("../public/javascripts/model")
var { FindOneDataFromTable } = require('../utils')
var multer = require('multer')
var path = require('path')

//接口测试
router.all("/test", (req, res) => {
    res.json({
        code: 200,
        msg: "Vue 项目的路由板块 - Test - Test",
        result: null
    })
})


// 注册接口 (学员)
router.all("/register", async (req, res) => {
    var body = req.body;
    let data = await stuInfoModel.findOne({
        $or: [
            {
                stuName: body.username
            },
            {
                stuPhone: body.phone
            }
        ]
    }).catch(err => {
        res.json({
            err,
            code: 500,
            msg: "服务器异常",
            result: null
        })
    })
    if (data) {
        // 已经注册
        res.json({
            code: 401,
            msg: "用户名或者手机号已存在",
            result: null
        })
    } else {
        // 插入 
        body.time = new Date()
        let result = await stuInfoModel.insertMany({
            stuName: body.username,
            stuPhone: body.phone,
            stuPassword: body.password,
            role: body.role,
            time: body.time
        })
        res.json({
            code: 200,
            msg: "注册成功",
            result
        })
    }
})


//登录
router.all('/login', async (req, res) => {
    let data = req.body;

    let ressult = await stuInfoModel.findOne({ stuName: data.username, stuPassword: data.password }).catch((err) => {
        res.json({
            err,
            code: 500,
            msg: "服务器异常",
            result: null
        })
    })

    if (ressult) {
        const token = createToken({
            stuName: ressult.stuName,
            stuPhone: ressult.stuPhone,
            stuPassword: ressult.stuPassword
        })
        res.json({
            code: 200,
            msg: "登录成功",
            ressult,
            token
        })
    } else {
        res.json({
            code: 401,
            msg: "用户名或密码不正确",
            result: null
        })
    }

})


// 获取用户信息
router.all('/getAll', async (req, res) => {
    console.log(req.headers.token);
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTable({
            model: stuInfoModel,
            query: { stuName: stuName },
            res,
        })
    })
})

router.all('/getUser', async (req, res) => {
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTable({
            model: stuInfoModel,
            query: {},
            res,
        })
    })
})


// 修改用户数据
router.all('/updateInfo', async (req, res) => {
    let data = req.body
    checkToken(req, res, ({ stuName }) => {
        stuInfoModel.updateMany({ stuName }, { $set: data })
            .then((result) => {
                res.json({
                    code: 200,
                    msg: 'ok',
                    result
                })
            })
            .catch((err) => {
                console.log(err)
                res.json({
                    code: 500,
                    err,
                    msg: '服务器异常'
                })
            })
    })
})


// 获取角色权限信息
router.all('/getrole', async (req, res) => {
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTable({
            model: roleInfoModel,
            query: {},
            res,
        })
    })
})


// 上传文件
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = 'WH2206' + Date.now() + '-' + Math.round(Math.random() * 1E9)
        //获取文件后缀
        var extname = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + extname)
    }
})

// 将上传的文件转换为任意文件类型
const upload = multer({ storage: storage }).any()

router.all('/uploads', upload, (req, res) => {
    checkToken(req, res, ({ stuName }) => {
        var path = req.files[0].path;  // 上传的文件的相对于的 服务器路径
        console.log(req.files[0])
        res.json({
            code: 200,
            mas: '上传成功',
            path,
            ressult: path
        })

    })
})


// 删除方法
router.all('/deleteInfo', (req, res) => {
    checkToken(req, res, async ({ stuName }) => {
        let data = req.body
        let result = await stuInfoModel.remove(data)
        res.json({
            code: 200,
            mag: '删除成功',
        })
    })
})


// 修改方法
router.all('/updatePlus', (req, res) => {
    checkToken(req, res, async ({ stuName }) => {
        let data = req.body
        let result = await stuInfoModel.updateOne({ _id: data._id }, { $set: data })
        if (result) {
            res.json({
                code: 200,
                msg: 'ok',
                result
            })
        } else {
            console.log(err)
            res.json({
                code: 500,
                err,
                msg: '服务器异常'
            })
        }
    })
})


module.exports = router

