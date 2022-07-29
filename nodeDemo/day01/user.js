// 模块化操作

// 定义一个构造函数
function User(age, name,sex) {
    // 构造函数自带构造器
    this.age = age;
    this.name = name;
    this.sex = sex;
}


User.prototype={
    say:function(){
        console.log(this);
    }
}

module.exports=User;


// console.log(global);