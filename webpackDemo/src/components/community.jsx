import React, { Component } from 'react'
import PropTypes from 'prop-types'
/*
1. react 数据传递载体  props 属性  state 状态  组件之间数据交互  

2. props
a.  props 默认从组件外部（父组件）传入,props 也能在组件内部初始化定义 getDefaultProps 
b.  组件内部 通过生命周期钩子函数 getDefaultProps (已废弃 )   App.defaultProps = {}
c.  props 一般不允许被修改   props 只用来传递数据
d.  props 接收  对象 常量 函数  数组  
e.  props 在组件内部 通过 this.props 来获取  key-value 
*/

// PropTypes  校验Props 
// optionalArray: PropTypes.array,
// optionalBool: PropTypes.bool,
// optionalFunc: PropTypes.func,
// optionalNumber: PropTypes.number,
// optionalObject: PropTypes.object,
// optionalString: PropTypes.string,
// optionalSymbol: PropTypes.symbol,

// 校验 props 接收正确的格式类型的数据 

const info = {
    name: '罗先略',
    age: 22,
    adress: '武汉市'
}
const title = '我是props数据'
const count = 0

export class Community extends Component {

    state = {
        infoName: '父组件state',
        time: 23 + 'S'
    }

    changeInfo = (val) => {
        this.setState({
            infoName: val
        })
    }

    changeRef = () => {
        this.refs.girls.setState({
            value:'我是ref修改过后的值'
        })
        this.refs.girls.setout()
    }

    render() {
        const { infoName, time } = this.state
        return (
            <div>
                <h1 style={{ width: '20%', height: '200px', background: '#ccc' }}>
                    俺是父组件
                    <button onClick={() => this.changeInfo('我是被修改的值')}>修改子组件的值</button>
                    <button onClick={this.changeRef}>通过ref修改子组件的值</button>
                </h1>
                <Boy text="传一个固定值" title={title} count={count} info={info}></Boy>
                <hr />
                <Girl infoName={infoName} time={time} ></Girl>
                <Two ref="girls"></Two>
            </div>
        )
    }
}



const Boy = (props) => {
    const { text, title, count, info, msg } = props
    return (
        <div style={{ width: 200, height: 200, border: '1px solid #ccc' }}>
            <h1>我是子组件</h1>
            <div>
                获取的props值:<br />
                text:{text},<br />
                title:{title},<br />
                count:{count},<br />
                name:{info.name}
            </div>
            <hr />
            {msg}
        </div>
    )
}


/*
 组件之间的通信 
 
 1. 父子 组件 
 <A>
    <B></B>
 </A>
 2. 兄弟组件 
 <A></A><B></B>

 props 传递数据
 state 修改数据 

 父组件如何修改子组件

 父组件把组件的state 当着子组件的props 传递给子组件
 父组件修改 state 会二次render 子组件接收到变化的 props  从而实现子组件修改  

 ref   this.refs  对象获取
 1. ref 作用于DOM 元素  指向这个真实的DOM元素
 2. ref 作用于组件  指向这个组件对象   

*/


class Two extends Component {
    state = {
        value:'我是待修改ref的子组件'
    }

    setout=()=>{
        console.log('我是通过ref执行的子组件方法');
    }

    render() {
        return (
            <div style={{marginBottom:20,width:200,height:200}}>
                子组件三 <br />
                信息:{this.state.value}
            </div>
        )
    }
}


const Girl = (props) => {
    const { infoName, time } = props
    return (
        <div>
            <h1>我是第二个子组件实现父子通信</h1>
            <div style={{ width: 100, height: 100, background: 'yellow' }}>
                {infoName} ----- {time} <br />
            </div>
        </div>
    )
}

// 定义静态属性 
Boy.defaultProps = {
    msg: '定义一个静态属性互不干扰'
}

Boy.propTypes = {
    // 定义规则text需为字符串形式
    text: PropTypes.string.isRequired
}


export default Community