//具体发送方法请求

//导入axios方法
import axios from 'axios'
//导入vant2下的轻提示插件Toast
import { Toast } from 'vant'

// axios配置
export const baseURL = 'http://localhost:2206/'
export const request = axios.create({
    timeout: 60000, //超时
    // baseURL: "http://localhost:2206/", //项目的基本路径
    //设置请求头
    headers: {
        // Authorization: 'AUTH_TOKEN',
        // 'Content-Type': 'application/x-www-form-urlencoded'
    }
})


//请求时的几个状态样式方法
//加载中
export function ShowLoading(msg) {
    Toast.clear()
    Toast.loading({
        message: msg || '加载中....',
        forbidClick: true,
    })
}

//成功
export function ShowSuccess(msg = '成功') {
    Toast.clear()
    Toast.success(msg)
}

//失败
export function ShowFail(msg = '失败') {
    Toast.clear()
    Toast.fail(msg)
}


// Interceptors 拦截器   全局统一 
// 在请求发送之前的过程当中做一个拦截
request.interceptors.request.use(function (config) {
    //表示请求过程正在加载
    ShowLoading()
    return config
}, function (error) {
    //请求失败发送失败信息
    ShowFail('网络异常')
    return Promise.reject(error)
})

// 响应结果时的拦截器
request.interceptors.response.use(function (response) {
    // 响应成功的拦截器 
    // ShowSuccess() 手机端APP不需要成功的提示 
    Toast.clear()
    return response;
}, function (error) {
    // 响应失败 
    ShowFail('服务器异常')
    return Promise.reject(error);
})


// axios封装增删改查方法
// 暴露这四个方法get post delete patch
// 参数为请求地址url、请求参数params、请求头headers

// 获取数据
export function get(url, params, headers) {
    return new Promise((resolve, reject) => {
        return request({
            url,
            method: "GET",
            params,
            headers,
        }).then(res => {
            // 返回数据
            resolve(res.data)
        }).catch(err => {
            //失败返回失败信息
            reject(err)
        })
    })
}

// 新增数据
export function post(url, data, params, headers) {
    return new Promise((resolve, reject) => {
        return request({
            url,
            method: "POST",
            data,
            params,
            headers,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 删除数据
export function Delete(url, params, headers) {
    return new Promise((resolve, reject) => {
        return request({
            url,
            method: "delete",
            params,
            headers,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 修改更新数据
export function Patch(url,data,params,headers){
    return new Promise((resolve,reject)=>{
        return request({
            url,
            method:"PATCH",
            data,
            params,
            headers,
        }).then(res=>{
            resolve(res.data)  
        }).catch(err=>{
            reject(err)
        })
    })
}
