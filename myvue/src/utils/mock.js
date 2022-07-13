//导入插件
import Mock from "mockjs"

let data = Mock.mock({
    // 10条数据
    "data|10": [{
        // 商品种类
        "goodsClass": "@cname(5)",
        // 商品Id
        "goodsId|+1": 1,
        //商品名称
        "goodsName": "@ctitle(10)",
        //商品地址
        "goodsAddress": "@county(true)",
        //商品等级评价★
        "goodsStar|1-5": "★",
        //商品图片
        "goodsImg": "@Image('100x100','@color','小甜甜')",
        //商品售价
        "goodsSale|30-500": 30
    }]
})

console.log(data);


// mock模拟接口,拦截ajax请求
// 获取全部数据
Mock.mock('http://localhost:2206/data', 'get', config => {
    // console.log(config);
    return {
        msg: '获取成功',
        code: 200,
        data
    }
})