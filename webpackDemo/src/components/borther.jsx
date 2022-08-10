import React, { Component, useRef } from 'react'
import EventEmitter from 'events'

const bus = new EventEmitter()  // on emit once remove 
export class Borther extends Component {

    state = {
        name: '罗先略',
        age: 22,
        adress: '武汉'
    }

    changeNum = (n) => {
        this.setState({
            age: n + this.state.age
        })
    }

    changName = (val) => {
        this.setState({
            name: val
        })
    }

    inputChange = (event) => {
        console.log(event);
    }



    render() {
        const { name, age, adress } = this.state
        const num = 10
        return (
            <div>
                <h1>组件通信之父子和兄弟</h1>
                姓名:{name},年龄:{age},地址:{adress}
                <hr />
                {/* 子改父 */}
                <Son
                    num={num}
                    info={this.state}
                    add={this.changeNum}
                    cname={this.changName}
                    evt={this.inputChange}
                ></Son>
                <hr />
                <Boy No={num}></Boy>
            </div>
        )
    }
}


const Son = ({ num, name, age, adress, add, cname, evt }) => {
    // 子组件通过事件总线修改兄弟
    const changeNo = () => {
        bus.emit('changeNo',10)
    }
    const element = useRef(null)
    return (
        <div>
            <h1>函数式子组件通信</h1>
            <input type="text" value={name} ref={element} onChange={() => cname(element.current.value)} />
            <button onClick={() => add(2)}>修改年纪</button>
            {/* <button onClick={() =>cname(element.target.value)}>修改姓名</button> */}
            <button onClick={changeNo}>修改兄弟组件</button>
        </div>
    )
}


// 事件总线方法
class Boy extends Component {

    componentDidMount(){
       bus.on('changeNo',n=>{
        this.setState({
            nums:n+this.state.nums
        })
       }) 
    }

    state={
        nums:10
    }

    render() {
        const { No } = this.props
        const {nums} =this.state
        return (
            <div>
                <h1>子组件二号</h1>
                <span>数字:{No+nums}号</span>
            </div>
        )
    }
}

export default Borther