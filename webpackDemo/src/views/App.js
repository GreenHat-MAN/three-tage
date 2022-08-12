import React from "react"
import CapIndex from "../components"
import Add from "./add.jsx"
// import Demo from "./Demo"

// jsx语法
export default class App extends React.Component{
    render(){
        return(
            <div>
                <h1>react项目根组件</h1>
                <hr/>
                {/* <Demo></Demo> */}
                {/* <CapIndex></CapIndex> */}
                <Add></Add>
            </div>
        )
    }
}