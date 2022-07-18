import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:null,//个人用户登录信息
  },
  getters: {
  },
  mutations: {
    changeAge(state,playload){
      state.age+=playload
    },
    changeUserInfo(state,payload){
      state.userInfo = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
