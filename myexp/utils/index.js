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

exports.FindOneDataFromTables = function({
    model,query,field,res,callback,msg="查询成功"
}){
    model.findOne(query,field)
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


exports.FindManyDataFromTable = function({
    model,query,field,res,callback,msg="查询成功",
    skip,
    limit,
    sort
}){
    model.find(query,field)
    .skip(skip)
    .limit(limit)
    .sort(sort)
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

exports.InsertManyFromTable = function({
    model ,
    data, 
    callback,
    msg="添加成功",
    res 
}){
    model.insertMany(data)
    .then(result=>{
        if(callback){
            callback(result)
        }else{
            res.json({
                code:200,
                msg,
                result 
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


exports.RemoveFromTable = function({
    model ,
    query, 
    callback,
    msg="删除成功",
    res 
}){
    model.remove(query)
    .then(result=>{
        if(callback){
            callback(result)
        }else{
            res.json({
                code:200,
                msg,
                result 
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

exports.UpdateDataFromTable = function({
    model ,
    query, 
    data, 
    callback,
    msg="修改成功",
    res 
}){
    model.updateMany(query,{
        $set:data 
    })
    .then(result=>{
        if(callback){
            callback(result)
        }else{
            res.json({
                code:200,
                msg,
                result 
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