// node事件模块

// events 事件对象
// emit 发送事件
// on 监听事件
// once 监听一次事件

// 导入事件对象
const EventEmitter=require("events");

class MyEvent extends EventEmitter{};

// 创建一个构造函数继承于事件对象(组合式继承)
function EventDemo(){
    EventEmitter.call(this);
}

// 将事件对象放在构造函数原型上
EventDemo.prototype =new EventEmitter();

const bus=new EventDemo();

// 定义事件方法
// bus.on("change",(msg)=>{
//     console.log(msg);
// })

// 只执行一次的事件
bus.once("change",(msg)=>{
    console.log(msg);
})

bus.emit("change","我就是事件调用的方法1");
bus.emit("change","我就是事件调用的方法2");
bus.emit("change","我就是事件调用的方法3");