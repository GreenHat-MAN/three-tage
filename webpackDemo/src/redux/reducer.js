const initState = {
    num: 0
}

const data = (state=initState,action) => {
    switch(action.type){
        case "add":
            let addNum = JSON.parse(JSON.stringify(state))
            addNum.num++
            return addNum
        case "red":
            let redNum = JSON.parse(JSON.stringify(state))
            redNum.num--
            return redNum
        default:
            return state
    }
}

export default data

