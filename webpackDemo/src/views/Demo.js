// 测试组件
import React, { Component } from "react";
import Img from '../assets/images/photo.png'
import '../styles/mobile.scss'

export default class Demo extends React.Component {
    render() {
        return (
            <div>
                <h1>测试组件</h1>
                <h3>以下为子组件</h3>
                <One></One>
                <Two></Two>
                <Three></Three>
                <LastDemo></LastDemo>
            </div>
        )
    }
}


class One extends Component {
    render() {
        return (
            <div className="link1">
                <h2>我是第一个子类组件</h2>
            </div>
        )
    }
}

class Two extends Component {
    render() {
        return (
            <div>
                <h2 style={{color:'#F00'}}>我是第二个子组件</h2>
                <h3>
                    <img src={Img} />
                </h3>
            </div>
        )
    }
}

const Three = () => {
    return (
        <div>
            <h2 className="link2">方法</h2>
        </div>
    )
}

function LastDemo(){
    return (
        <div>
            <h3>函数式写法</h3>
        </div>
    )
}


