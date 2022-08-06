


import {get,post,Delete, Patch } from './request';

// 接口的服务层 
export const Ajax = {
    
    testApi:()=>get("/api/test"), //测试接口
    
    register:(data)=>post("/api/register",data), //注册接口

    logins:(data)=>post("/api/login",data), //登录接口

    userAll:(data)=>post("/api/getAll",data), //获取用户全部信息

    getuser:(data)=>post('api/getUser',data), //获取整个数据库用户信息

    updateAll:(data)=>post("/api/updateInfo",data), //修改用户信息

    getRole:(data)=>post("/api/getrole",data), //获取角色权限信息

    getImgs:(data)=>post("/api/uploads",data),   //上传用户头像

    delAll:(data)=>post("api/deleteInfo",data), //删除方法

    updatePlus:(data)=>post("api/updatePlus",data), //修改方法

}