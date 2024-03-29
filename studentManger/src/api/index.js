


import {get,post,Delete, Patch } from './request';

// 接口的服务层 
export const Ajax = {
    
    testApi:()=>get("/api/test"), //测试接口
    
    register:(data)=>post("/api/register",data), //注册接口

    logins:(data)=>post("/api/login",data), //登录接口

    userAll:(data)=>post("/api/getAll",data), //获取用户全部信息

    getuser:(data)=>post('api/getUser',data), //获取整个数据库用户信息

    updateAll:(data)=>post("/api/updateInfo",data), //修改用户信息

    updateRole:(data)=>post("/api/updateRole",data), //修改角色权限

    getRole:(data)=>post("/api/getrole",data), //获取角色权限信息

    getImgs:(data)=>post("/api/uploads",data),   //上传用户头像

    delAll:(data)=>post("api/deleteInfo",data), //删除方法

    updatePlus:(data)=>post("api/updatePlus",data), //修改方法

    addAuition:(data)=>post("/api/addAudition",data), //添加面试题

    searchAuition:(data)=>post("/api/searchAudition",data), //查询面试题

    uploadfiles:(data)=>post("/api/uploads",data), //上传图片


    // 学科
    addxueke:(data)=>post("/api/addxueke",data),
    updatexueke:(data)=>post("/api/updatexueke",data),
    removexueke:(data)=>post("/api/removexueke",data),
    findxueke:(data)=>post("/api/findxueke",data),

    // 班级 
    addbanji:(data)=>post("/api/addbanji",data),
    findclass:(data)=>post("/api/findclass",data),
    removeclass:(data)=>post("/api/removeclass",data),
    updateclass:(data)=>post("/api/updateclass",data),


    // 评论
    adddis:(data)=>post("/api/addDis",data), //添加评论
    finddis:(data)=>post("/api/findDis",data), //查询全部评论


    // 通知
    addtongzhi:(data)=>post("/api/public",data), //添加公告记录

    sercherpublic:(data)=>post("/api/serPub",data), //查询通知


    // 意见
    addAdvise:(data)=>post("/api/addvise",data), //添加意见
    findAdvise:(data)=>post("/api/findAddvise",data), //查询意见


    // 成绩
    addScore:(data)=>post("/api/addScore",data), //添加学生成绩
    searchScore:(data)=>post("/api/findManyScore",data), //查询学生全部成绩
    findScore:(data)=>post("/api/findScore",data), //查询单个学生成绩


    // 考勤
    addAttend:(data)=>post("/api/attend",data), //添加考勤记录
    findAttend:(data)=>post("/api/allAttend",data), //查看全部考勤记录
    searchAttend:(data)=>post("/api/myAttend",data), //查看单人考勤记录
    upAttend:(data)=>post("/api/updAttend",data), //修改考勤记录
}