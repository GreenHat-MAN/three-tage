// 事件

import React, { Component } from 'react'

const title='click me!!!'

const cssB={
    shou:{
        cursor:'pointer'
    }
}

const functions ={
    normal(){
        alert('普通调用事件方法')
    },

    getkeycode(e){
        console.log('按键码'+e.keyCode)
    }
}

export class Event extends Component {

        constructor(){
            super()
        }

    toMe=()=>{
        alert('ES8高级语法!!!');
        console.log(this);
    }

    one(){
        console.log(this);
        alert('this调用')    
    }

    two(){
        alert(this);
    }

    three(){
        console.log(this);
    }

  render() {
    return (
      <div>
        <h1>react中的事件绑定</h1>
        <p onClick={this.toMe} style={Object.assign({color:'red',fontSize:18},cssB.shou)}>
            {title}
        </p>
        <p onClick={functions.normal} style={cssB.shou}>
            普通绑定事件调用
        </p>
        <h3 onClick={this.one} style={cssB.shou}>
           组件内部方法this指向当前环境初始化时的this 
        </h3>
        <h2 onClick={this.two} style={cssB.shou}>
            自定义函数中this永远都是undefined
        </h2>
        <h2 onClick={()=>this.three()} style={cssB.shou}>
            自定义函数中使用箭头函数解决
        </h2>

        <h1>
            键盘按键事件:
            <input type="text" onKeyDown={functions.getkeycode} />
        </h1>

      </div>
    )
  }
}

export default Event