

// 全局的指令或者过滤器

import Vue from 'vue'

Vue.filter('dateFormat',(value)=>{
    if(!value) return value;
    var time = new Date(value)
    var month = time.getMonth() + 1;
    var day = time.getDate() 
    var weeklist = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var week = time.getDay() 
    
    var nowDay = new Date().getDate()
    var wstr = weeklist[week]
    if(nowDay==day){
        wstr="Today"
    }else if(nowDay+1==day){
        wstr="Tomorrow"
    }
    else if(nowDay+2==day){
        wstr="the day after tomorrow"
    }
    return `${wstr}${month}month${day}day`
})


