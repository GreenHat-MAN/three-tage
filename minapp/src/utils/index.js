//一些公共方法

// 获取当天是今年的第几周（周一到周日为一周）
// 如果当年1月1日不是周一，则1月第一个周一为第二周的开始
export function getWeekInYear() {
    var endDate = new Date(),
        curYear = endDate.getFullYear(),
        startDate = new Date(curYear, 0, 1);

    var startWeek = startDate.getDay(), // 1月1号是星期几:0-6
        offsetWeek = 0; //用来计算不完整的第一周，如果1月1号为星期一则为0，否则为1

    if (startWeek != 1) {
        offsetWeek = 1;
        if (!startWeek) {
            startDate.setDate(1);
        } else {
            startDate.setDate(8 - startWeek); // (7 - startWeek + 1)
        }
    }
    var distanceTimestamp = endDate - startDate,
        days = Math.ceil(distanceTimestamp / (24 * 60 * 60 * 1000)) + startWeek,
        weeks = Math.ceil(days / 7) + offsetWeek;
    return weeks;
}



// 正则库 

export const reg = {
	phones:/^1[3|4|5|6|7|8|9][0-9]{9}$/, // 手机号码验证
	pwd:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,// 6-16位数字加字母
	pay:/^\d{6}$/,  // 6位支付密码
    code:/^\d{4}$/,  // 验证码 code
	account:/[^a-zA-Z0-9]/g,// 账号  字母数字混合
	idCard:/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,//身份证号码
	email:/^^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$$/,//邮箱正则
}


// 底部导航
export const FooterList = [
    {
        path: '/shop',
        name: 'shop',
        text: '会员购',
        icon: "icon-shangcheng",
    },
    {
        path: '/classify',
        name: 'classify',
        text: '分类',
        icon: "icon-zixun"
    },
    {
        path: '/cart',
        name: 'cart',
        text: '购物车',
        icon: "icon-cinema",
    },
    {
        path: '/mine',
        name: 'mine',
        text: '我的',
        icon: "icon-mine"
    },
]



// 导入axios下的封装方法
import {get,post,Delete,Patch} from '@/utils/request'

// 接口的服务层
export const Ajax={
    // 获取登录用户信息
    getLogin:(params)=>get('/api/login',params),//获取用户信息
    
    sendCaptcha:(params)=>get("/captcha/sent",params),  // 发送验证码

    verifyCaptcha:(params)=>get("/captcha/verify",params), // 校验验证码

    upDatepwd:(id,params)=>Patch('/api/login/'+id,params),// 修改密码

    addLogin:(params)=>post('/api/login',params),//添加用户

    getShop:(params)=>get('/bshop/mall-c-search/home/feed/list',params),//bilibili商城数据请求

    getShopInfo:(params)=>get('/shop/mall-c-search/items/info',params), //bilibili商品详情页

    getCategory:(params)=>get('/cate/mall-c-search/home/category/listV2',params),//bilibili分类数据

    searchSug:(params)=>get('search/mall-c-search/home/sug',params),   //bilibili搜索方式一

    categoryTab:(params)=>post('gory/mall-c-search/home/sub/tab',params), //bilibili类型分类

    categoryV2:(params)=>post('vtwo/noah/search/category/v2',params), //bilibili类型分类具体数据

    // // 添加购物车商品
    postGood:(params)=>post("/api/cart",params),

    // // 修改购物车商品数据
    updateGood:(id,params)=>Patch('/api/cart/'+id,params),

    // // 删除购物车商品
    delGood:(id,params)=>Delete('/api/cart/'+id,params),

    // // 获取购物车数据
    getCarts:(params)=>get('/api/cart',params),


    // // 添加订单商品
    postOrder:(params)=>post("/api/order",params),

    // // 修改订单商品数据
    updateOrder:(id,params)=>Patch('/api/order/'+id,params),

    // // 删除订单商品
    delOrder:(id,params)=>Delete('/api/order/'+id,params),

    // // 获取订单数据
    getOrder:(params)=>get('/api/order',params),



    // // 添加地址
    postAdress:(params)=>post("/api/adress",params),

    // // 修改地址数据
    updateAdress:(id,params)=>Patch('/api/adress/'+id,params),

    // // 删除地址商品
    delAdress:(id,params)=>Delete('/api/adress/'+id,params),

    // // 获取地址数据
    getAdress:(params)=>get('/api/adress',params),



    getLikes:(params)=>get('/api/likes',params),   // 获取点赞数据 

    addToLikes:(params)=>post('/api/likes',params),   // 添加点赞数据 

    deleteCarts:(id,params)=>Delete('/api/likes/'+id,params),   // 删除点赞 


    // 卖座电影接口
    // getList:(params,headers)=>get("https://m.maizuo.com/gateway",params,headers),

    // postList:(data,params,headers)=>post("https://m.maizuo.com/gateway",data,params,headers) ,// 卖座数据需要请求头

    // // 请求商品数据
    // getGoodList:(params)=>get("goods",params),


    

    
    // getCollects:(params)=>get('/collects',params),   // 获取点赞数据 

    // addCollects:(params)=>post('/collects',params),   // 添加点赞数据 

    // deleteCollects:(id,params)=>Delete('/collects/'+id,params),   // 删除点赞 


}

