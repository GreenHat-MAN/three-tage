import {createStore} from 'vuex'

// 创建一个新的 store 实例
const store = new createStore({
    state(){
        return {
            num:1000,
            userInfo:null,
        }
    },
    mutations:{
        changeUserInfo(state,payload){
            state.userInfo=payload
        }
    }
})

export default store; 