

// 全局的指令或者过滤器

import Vue from 'vue'

Vue.filter('dateFormat',(value)=>{
    if(!value) return value;
    var time = new Date(value)
    var month = time.getMonth() + 1;
    var day = time.getDate() 
    var weeklist = ["周天","周一","周二","周三","周四","周五","周六"]
    var week = time.getDay() 
    
    var nowDay = new Date().getDate()
    var wstr = weeklist[week]
    if(nowDay==day){
        wstr="今天"
    }else if(nowDay+1==day){
        wstr="明天"
    }
    else if(nowDay+2==day){
        wstr="后天"
    }
    return `${wstr}${month}月${day}日`
})


