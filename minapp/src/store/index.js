import { Ajax } from '@/utils'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,//个人用户登录信息
    city: null,//城市定位信息
    cityList:[], // 全国的城市数据信息
    cinemaList:[], // 当前城市的电影院 列表
    goodList:[] , // 商品列表 
    fromName:'',//从哪个路由过来的
    shopLists:[],  //商品详情列表
    cartList:[],
  },
  plugins:[
    createPersistedState()  // vuex 存储到的本地localStorage 
  ],
  getters: {
    hotCity(state){
      return state.cityList.filter(item=>item.isHot==1)
    },
    goodTypes(state){
      var arr = [{text:'全部商品',value:'-1'}]  // 初始化商品分类
      var obj = {}
      for(var i=0;i<state.goodList.length;i++){
        var item = state.goodList[i]
        if(!obj[item.type.text]){
          obj[item.type.text] = item.type.text;
          arr.push(item.type)
        } 
      }
      // console.log(arr)
      return arr;
    }
  },
  mutations: {
    changeAge(state, playload) {
      state.age += playload
    },
    changeFormName(state,payload){
      state.fromName = payload;
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
    },
    changeGoodList(state,payload){
      state.goodList=payload;
    },
    changeShopList(state,payload){
      state.shopLists=payload;
    },
    changeCartList(state,payload){
      state.cartList=payload
    }
  },
  actions: {
    async getGoodListAsync({commit},playload){
      let res=await Ajax.getGoodList(playload)
      commit('changeGoodList',res)
    }
  },
  modules: {
  }
})
