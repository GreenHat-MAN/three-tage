import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name:'罗先略',
    age:22,
    adress:'武汉'
  },
  getters: {
  },
  mutations: {
    changeAge(state,playload){
      state.age+=playload
    }
  },
  actions: {
  },
  modules: {
  }
})
