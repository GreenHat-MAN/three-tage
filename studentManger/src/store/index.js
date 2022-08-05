import {createStore} from 'vuex'
import { Ajax } from '../api'

// 创建一个新的 store 实例
const store = new createStore({
    state(){
        return {
            num:1000,
            userInfo:null, //用户信息
            roleList:[], //系统角色权限信息
            collapse:false ,// false 展开  true 收起
            routerLists:[], //权限列表
        }
    },
    mutations:{
        changeUserInfo(state,payload){
            state.userInfo=payload
        },
        changeRole(state,payload){
            state.roleList=payload
        },
        changecollapse(state,payload){
            state.collapse = payload
        },
        changeRouterList(state,payload){
            state.routerLists=payload
        }
    },
    actions:{
        async getRoleListAsync({commit},payload){
            let res = await Ajax.getRole(payload)
            commit("changeRole",res.result)
            console.log(res.result);
        }
    }
})

export default store; 