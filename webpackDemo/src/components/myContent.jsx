import React, { Component } from 'react'
import PropTypes from 'prop-types'

// 创建context组件
const ThemeContext = React.createContext({
    theme: '我是通过context传递的值!!!',
    toggle: () => { }, //向上下文设置一个回调方法
})

export class MyContent extends Component {

    // getChildContext(){
    //     return{
    //         msg:'我是通过context传递的值!!!'
    //     }
    // }

    constructor(props) {
        super(props)


        this.state = {
            name: '罗先略',
            age: 22,
            adress: '武汉',
            theme: '我是通过context传递的值'
        }
    }




    render() {
        const info = {
            text: '我是父组件的值',
            con: '需要通过content传值'
        }
        return (
            <div>
                <h1>myContent - 深层次组件嵌套传参</h1>
                <p>{info.text}</p>
                <hr />
                <ThemeContext.Provider value={this.state}>
                    <BoyOne></BoyOne>
                </ThemeContext.Provider>
            </div>
        )
    }
}

// 传递参数需要声明类型
// MyContent.childContextTypes={
//     msg:PropTypes.string.isRequired
// }


const BoyOne = ({ con, name, text }) => {
    return (
        <div>
            <h1>子组件 ---- one</h1>
            {/* <p>{name}----{text}</p> */}
            <hr />
            {/* <BoyTwo name={name} text={text} con={con}></BoyTwo> */}
            <BoyTwo></BoyTwo>
        </div>
    )
}

const BoyTwo = ({ text, con, name }) => {
    return (
        <div>
            <h1>子组件 ---- two</h1>
            <hr />
            {/* <BoyThree name={name} text={text} con={con}></BoyThree> */}
            <BoyThree></BoyThree>
        </div>
    )
}

const BoyThree = ({ text, con, name }) => {
    return (
        <div>
            <h1>子组件----three</h1>
            <hr />
            {/* <BoyFour name={name} text={text} con={con}></BoyFour> */}
            <BoyFour></BoyFour>
        </div>
    )
}

const BoyFour = ({ text, con, name }) => {
    return (
        <ThemeContext.Consumer>
            {({theme,name,age,adress}) => (
                <div>
                    <h1>子组件----four</h1>
                    <ol>
                        <li>{adress}</li>
                        <li>{age}</li>
                        <li>{name}</li>
                    </ol>
                    <p>{theme}</p>
                </div>
            )}
        </ThemeContext.Consumer>

    )
}

// 子组件接收参数也要声明类型
// BoyFour.childContextTypes={
//     msg:PropTypes.string.isRequired
// }

export default MyContent