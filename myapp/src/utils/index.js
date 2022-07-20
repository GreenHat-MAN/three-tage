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


// 底部导航
export const FooterList = [
    {
        path: '/movie',
        name: 'movie',
        text: '电影',
        icon: "icon-movie"
    },
    {
        path: '/shop',
        name: 'shop',
        text: '电影商城',
        icon: "icon-shangcheng",
        hot: true
    },
    {
        path: '/news',
        name: 'news',
        text: '新片上映',
        icon: "icon-zixun"
    },
    {
        path: '/mine',
        name: 'mine',
        text: '我的',
        icon: "icon-mine"
    },
    {
        path: '/cinema',
        name: 'cinema',
        text: '影院',
        icon: "icon-cinema"
    },
]



// 导入axios下的封装方法
import {get,post,Delete,Patch} from '@/utils/request'

// 接口的服务层
export const Ajax={
    // 获取登录用户信息
    getLogin:(params)=>get('login',params),
    
    sendCaptcha:(params)=>get("http://121.196.235.163:3000/captcha/sent",params),  // 发送验证码

    verifyCaptcha:(params)=>get("http://121.196.235.163:3000/captcha/verify",params), // 校验验证码

    // 修改密码
    upDatepwd:(id,params)=>Patch('login/'+id,params),

    // 卖座电影接口
    getList:(params,headers)=>get("https://m.maizuo.com/gateway",params,headers),

    postList:(data,params,headers)=>post("https://m.maizuo.com/gateway",data,params,headers) ,// 卖座数据需要请求头

    // 请求商品数据
    getGoodList:(params)=>get("goods",params),

    // 添加购物车商品
    postGood:(params)=>post("cart",params),

    // 修改购物车商品数据
    updateGood:(id,params)=>Patch('cart/'+id,params),

    // 删除购物车商品
    delGood:(id,params)=>Delete('cart/'+id,params),

    // 获取购物车数据
    getCarts:(params)=>get('/cart',params),


    getLikes:(params)=>get('/likes',params),   // 获取点赞数据 

    addToLikes:(params)=>post('/likes',params),   // 添加点赞数据 

    deleteCarts:(id,params)=>Delete('/likes/'+id,params),   // 删除点赞 

    
    getCollects:(params)=>get('/collects',params),   // 获取点赞数据 

    addCollects:(params)=>post('/collects',params),   // 添加点赞数据 

    deleteCollects:(id,params)=>Delete('/collects/'+id,params),   // 删除点赞 


}

