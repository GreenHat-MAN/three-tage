import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,//个人用户登录信息
    city: null,//城市定位信息
    cityList:[], // 全国的城市数据信息
    cinemaList:[] // 当前城市的电影院 列表 
  },
  plugins:[
    createPersistedState()  // vuex 存储到的本地localStorage 
  ],
  getters: {
    hotCity(state){
      return state.cityList.filter(item=>item.isHot==1)
    }
  },
  mutations: {
    changeAge(state, playload) {
      state.age += playload
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload
    },
    changeCity(state, payload) {
      state.city = payload
    },
    changeCityList(state,payload){
      state.cityList = payload;
    },
    changeCinemaList(state,payload){
      state.cinemaList = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
