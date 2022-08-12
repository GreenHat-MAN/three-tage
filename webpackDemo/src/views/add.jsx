import React, { Component } from 'react'
import { connect } from 'react-redux'

// 注入state方法
const mapStateToProps = state => ({
    state
})


// 注入action执行方法
const mapDispatchToProps = dispatch => ({
    doAdd: () => dispatch({ type: "add" }),
    redNum: () => dispatch({ type: "red" })
})

export class Add extends Component {
    render() {
        const num = this.props.state.num
        const { doAdd, redNum } = this.props
        // console.log(num);
        return (
            <div>
                <p>redux中的值:{num}</p>
                <GetNum count={num} add={doAdd} redNum={redNum}></GetNum>
            </div>
        )
    }
}


const GetNum = ({ count, add, redNum }) => {
    return (
        <div>
            <h1>累加器</h1>
            <hr />
            <button onClick={() => redNum()}> - </button>
            <span>{count}</span>
            <button onClick={() => add()}> + </button>
        </div>
    )
}


// 同时注入到props上
export default connect(mapStateToProps, mapDispatchToProps)(Add)
// export default Add