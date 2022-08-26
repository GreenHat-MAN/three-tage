

// Vue 项目的路由板块 
var express = require('express');
var router = express.Router();   // express 的路由模块 
var { createToken, checkToken } = require('../utils/token')
var { stuInfoModel, roleInfoModel, audInfoModel, MyXuekeModel, MyBanjiModel, TongzhiModel, DiscussModel, AdviseModel, stuScoreModel, AttendanceModel,MyMainShi } = require("../public/javascripts/model")
var { FindOneDataFromTable, FindOneDataFromTables, FindManyDataFromTable, InsertManyFromTable, RemoveFromTable, UpdateDataFromTable } = require('../utils')
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
    console.log(data);
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

// 找回用户密码
router.all('/bandpass',(req,res)=>{
    let data = req.body
    console.log(data.phone,data.password);
    UpdateDataFromTable({
        model: stuInfoModel,
        query: {
            stuPhone: data.phone
        },
        data: {stuPassword:data.password},
        res,
    })
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


// 修改角色权限信息
router.all('/updateRole', async (req, res) => {
    let data = req.body
    console.log(data);
    checkToken(req, res, ({ stuName }) => {
        stuInfoModel.updateMany({ stuName: data.stuName }, { $set: data })
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
        let result = await stuInfoModel.deleteOne(data)
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


// 新增面试题
router.all('/addAudition', (req, res) => {
    checkToken(req, res, async ({ stuName }) => {
        let body = req.body
        let result = await audInfoModel.findOne({
            $or: [
                { subject: body.subject },
                { content: body.content }
            ]
        }).catch(err => {
            res.json({
                err,
                code: 500,
                msg: "服务器异常",
                result: null
            })
        })
        if (result) {
            res.json({
                code: 401,
                msg: "相识的题目已被发布",
                result: null
            })
        } else {
            body.time = new Date()
            let results = await audInfoModel.insertMany({
                subject: body.subject,
                content: body.content,
                stuName: stuName,
                releaseTime: body.time
            })
            res.json({
                code: 200,
                msg: "添加成功",
                results
            })
        }
    })
})

// 查询面试题
router.all('/searchAudition', (req, res) => {
    checkToken(req, res, async ({ stuName }) => {
        FindOneDataFromTable({
            model: audInfoModel,
            query: {},
            res,
        })
    })
})

// 查询面试题(按条件)
router.all('/sehAudition', (req, res) => {
    let data = req.body
    checkToken(req, res, async ({ stuName }) => {
        let result = await audInfoModel.findOne(data)
        res.json({
            code: 200,
            mag: '查询成功',
            result
        })
    })
})


// 添加学科
router.all('/addxueke', (req, res) => {
    var body = req.body
    console.log(body);
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTables({
            model: MyXuekeModel,
            query: {
                $or: [
                    {
                        name: body.name
                    },
                    {
                        value: body.value
                    }
                ]
            },
            res,
            callback(result) {
                if (result) {
                    res.json({
                        code: 401,
                        msg: "学科已存在",
                        result
                    })
                } else {
                    InsertManyFromTable({
                        model: MyXuekeModel,
                        data: body,
                        res,
                    })
                }
            }
        })
    })
})


// 查询学科
router.all("/findxueke", (req, res) => {
    var body = req.body;
    var { keyword } = body;
    var query = {}
    if (keyword) {
        query = {
            $or: [
                {
                    name: new RegExp(keyword),
                },
                {
                    value: new RegExp(keyword),
                }
            ]
        }
    }
    checkToken(req, res, ({ stuName }) => {
        FindManyDataFromTable({
            model: MyXuekeModel,
            query: query,
            res,
        })
    })
})


// 删除学科
router.all("/removexueke", (req, res) => {
    checkToken(req, res, ({ stuName }) => {
        RemoveFromTable({
            model: MyXuekeModel,
            query: req.body,  // _id 
            res,
        })
    })
})

// 修改学科
router.all("/updatexueke", (req, res) => {
    var body = req.body;
    checkToken(req, res, ({ stuName }) => {
        UpdateDataFromTable({
            model: MyXuekeModel,
            query: {
                _id: body._id
            },  // _id 
            data: body,
            res,
        })
    })
})


// 添加班级 
router.all('/addbanji', (req, res) => {
    var body = req.body
    var { year, num, xueke } = body
    var num = num < 10 ? '0' + num : num;
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTables({
            model: MyXuekeModel,
            query: {
                value: body.xueke
            },
            res,
            callback(result) {
                // result 学科信息
                var name = "武汉" + result.name + "JY" + year.toString().slice(2, 4) + num;
                var value = "wh-" + result.value + "-" + year.toString().slice(2, 4) + num;

                FindOneDataFromTables({
                    model: MyBanjiModel,
                    query: {
                        year, num, xueke
                    },
                    res,
                    callback(data) {
                        if (data) {
                            res.json({
                                code: 401,
                                msg: "班级已存在",
                                result
                            })
                        } else {
                            body.name = name;
                            body.value = value;
                            InsertManyFromTable({
                                model: MyBanjiModel,
                                data: body,
                                res,
                            })
                        }
                    }
                })
            }
        })
    })
})


// 查询班级
router.all("/findclass", (req, res) => {
    var body = req.body;
    var { keyword, xueke } = body;
    var query = {}
    if (keyword && xueke) {
        query = {
            $or: [
                {
                    name: new RegExp(keyword),
                },
                {
                    value: new RegExp(keyword),
                }
            ],
            xueke: xueke
        }
    } else if (xueke) {
        query = {
            xueke: xueke
        }
    } else if (keyword) {
        query = {
            $or: [
                {
                    name: new RegExp(keyword),
                },
                {
                    value: new RegExp(keyword),
                }
            ],
        }
    }
    checkToken(req, res, ({ stuName }) => {
        FindManyDataFromTable({
            model: MyBanjiModel,
            query: query,
            res,
        })
    })
})


// 删除班级
router.all("/removeclass", (req, res) => {
    checkToken(req, res, ({ stuName }) => {
        RemoveFromTable({
            model: MyBanjiModel,
            query: req.body,  // _id 
            res,
        })
    })
})

// 修改班级 
router.all("/updateclass", (req, res) => {
    var body = req.body
    var { year, num, xueke } = body
    var num = num < 10 ? '0' + num : num;
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTables({
            model: MyXuekeModel,
            query: {
                value: body.xueke
            },
            res,
            callback(result) {
                // result 学科信息
                var name = "武汉" + result.name + "JY" + year.toString().slice(2, 4) + num;
                var value = "wh-" + result.value + "-" + year.toString().slice(2, 4) + num;
                body.name = name;
                body.value = value;
                FindOneDataFromTables({
                    model: MyBanjiModel,
                    query: {
                        year, num, xueke
                    },
                    res,
                    callback(data) {
                        if (data) {
                            res.json({
                                code: 401,
                                msg: "班级已存在",
                                result
                            })
                        } else {
                            UpdateDataFromTable({
                                model: MyBanjiModel,
                                query: {
                                    _id: body._id,
                                },
                                data: body,
                                res,
                            })
                        }
                    }
                })

            }
        })
    })
})




// 添加通知
router.all('/public', (req, res) => {
    let body = req.body
    console.log(body);
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTables({
            model: TongzhiModel,
            query: {
                $or: [
                    { content: body.content }
                ]
            },
            res,
            callback(data) {
                    InsertManyFromTable({
                        model: TongzhiModel,
                        data: body,
                        res,
                    })
            }
        })
    })
})

// 查询通知
router.all('/serPub', (req, res) => {
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTable({
            model: TongzhiModel,
            query: {},
            res,
        })
    })
})

// 添加评论表
router.all('/addDis', (req, res) => {
    let body = req.body
    console.log(body);
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTables({
            model: DiscussModel,
            query: {
                $or: [
                    { content: body.content },
                ]
            },
            res,
            callback(data) {
                if (data) {
                    res.json({
                        code: 401,
                        msg: "不能发送重复的评论",
                        result
                    })
                } else {
                    InsertManyFromTable({
                        model: DiscussModel,
                        data: body,
                        res,
                    })
                }
            }
        })
    })
})

// 查询评论表
router.all('/findDis', (req, res) => {
    let body = req.body
    // console.log(body);
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTable({
            model: DiscussModel,
            query: { titleId: body.titleId },
            res,
        })
    })
})


// 添加意见
router.all('/addvise', (req, res) => {
    let body = req.body
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTables({
            model: AdviseModel,
            query: {
                $or: [
                    { advise: body.advise },
                ]
            },
            res,
            callback(data) {
                if (data) {
                    res.json({
                        code: 401,
                        msg: "不能重复发布意见",
                        result
                    })
                } else {
                    InsertManyFromTable({
                        model: AdviseModel,
                        data: body,
                        res,
                    })
                }
            }
        })
    })
})


// 查询意见表
router.all('/findAddvise', (req, res) => {
    let body = req.body
    // console.log(body);
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTable({
            model: AdviseModel,
            query: {},
            res,
        })
    })
})


// 删除意见
router.all('/deladvise',(req,res)=>{
    let data = req.body
    checkToken(req,res, async ({stuName})=>{
        let result = await AdviseModel.deleteOne(data)
        res.json({
            code: 200,
            mag: '删除成功',
        })
    })
})

// 修改意见
router.all('/updateAdvise',(req,res)=>{
    let data = req.body
    checkToken(req,res,({stuName})=>{
        UpdateDataFromTable({
            model: AdviseModel,
            data:data,
            query: {
                _id: data._id,
            },
            res,
        })
    })
})


// 成绩管理
// 添加成绩
router.all('/addScore', (req, res) => {
    let body = req.body
    checkToken(req, res, ({ stuName }) => {
        body.testDay = new Date()
        body.stuScore = Number(body.math) + Number(body.chinese) + Number(body.english)
        InsertManyFromTable({
            model: stuScoreModel,
            data: body,
            res,
        })
    })
})


// 查询单人成绩
router.all('/findScore', (req, res) => {
    let body = req.body
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTable({
            model: stuScoreModel,
            query: { stuName: body.stuName },
            res,
        })
    })
})


// 查询多人成绩
router.all('/findManyScore', (req, res) => {
    let body = req.body
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTable({
            model: stuScoreModel,
            query: {},
            res,
        })
    })
})



// 添加考勤记录
router.all('/attend', (req, res) => {
    let body = req.body
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTables({
            model: AttendanceModel,
            query: {
                $and: [
                    { name: body.name },
                    { cardTime: body.cardTime },
                ]
            },
            res,
            callback(data) {
                if (data) {
                    if (data.cardTime != body.cardTime) {
                        UpdateDataFromTable({
                            model: AttendanceModel,
                            data: body,
                            query: {
                                name: body.name,
                            },
                            res,
                        })
                    } else {
                        res.json({
                            code: 401,
                            msg: "您已经打过卡了",
                        })
                    }
                } else {
                    InsertManyFromTable({
                        model: AttendanceModel,
                        data: body,
                        res,
                    })
                }
            }
        })
    })
})

// 查询全部考勤信息
router.all('/allAttend', (req, res) => {
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTable({
            model: AttendanceModel,
            query: {},
            res,
        })
    })
})

// 查询我的考勤信息
router.all('/myAttend', (req, res) => {
    let body = req.body
    checkToken(req, res, ({ stuName }) => {
        FindOneDataFromTable({
            model: AttendanceModel,
            query: { name: body.name },
            res,
        })
    })
})

// 修改考勤记录
router.all('/updAttend', (req, res) => {
    let body = req.body
    checkToken(req, res, ({ stuName }) => {
        UpdateDataFromTable({
            model: AttendanceModel,
            data: { cardCount: body.cardCount },
            query: {
                name: body.name,
            },
            res,
        })
    })
})



// 查询班级(无token版)
router.all("/findcls", (req, res) => {
    var body = req.body;
    var { keyword, xueke } = body;
    var query = {}
    if (keyword && xueke) {
        query = {
            $or: [
                {
                    name: new RegExp(keyword),
                },
                {
                    value: new RegExp(keyword),
                }
            ],
            xueke: xueke
        }
    } else if (xueke) {
        query = {
            xueke: xueke
        }
    } else if (keyword) {
        query = {
            $or: [
                {
                    name: new RegExp(keyword),
                },
                {
                    value: new RegExp(keyword),
                }
            ],
        }
    }
        FindManyDataFromTable({
            model: MyBanjiModel,
            query: query,
            res,
        })
})


// 面试
// 添加面试题 
router.all("/addms",(req,res)=>{
    var body = req.body;
    body.time = new Date()
    checkToken(req,res,({stuName})=>{
        InsertManyFromTable({
            model:MyMainShi,
            data:body,
            res,
        })
    })
})

// 查询
router.all("/findms",(req,res)=>{
    var body = req.body;
    checkToken(req,res,({stuName})=>{
        FindManyDataFromTable({
            model:MyMainShi,
            query:req.body,
            res,
        })
    })
})

// 查询一条
router.all("/findmsone",(req,res)=>{
    var body = req.body;
    checkToken(req,res,({stuName})=>{
        FindOneDataFromTable({
            model:MyMainShi,
            query:req.body,
            res,
        })
    })
})



module.exports = router

