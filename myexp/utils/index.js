//封装查询



// 封装 增删改查 

exports.FindOneDataFromTable = function({
    model,query,field,res,callback,msg="查询成功"
}){
    model.find(query,field)
    .then(result=>{
        if(callback){
            callback(result)
        }else{
            res.json({
                code:200,
                msg:msg,
                result, 
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.json({
            code:500,
            err,
            msg:'服务器异常'
        })
    })
}