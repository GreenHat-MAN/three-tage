import Vue from 'vue'
import Vuex from 'vuex'

// 在全局下使用
Vue.use(Vuex)
// 每一个vuex的核心就是store库,每个方法都有自己对应的辅助函数
export default new Vuex.Store({
  // state存放状态数据且都是响应式的
  state: {
    name:'罗先略',
    age:22,
    adress:'武汉',
    data:{
      first:10,
      second:{
        third:20,
      }
    },
    obj:{}
  },
  // gtters可以是state的一个计算属性能够读取state中的值
  getters: {
  },
  // 处理数据逻辑的地方也是唯一一个能够改变state中数据的唯一方法,修改的数据是同步的 
  mutations: {
    // 修改state里的值
    add(state,payload){
      state.age+=payload
    },

    // 修改对象下的值
    updateobj(state,[param1,param2]){
      state.obj={...state.data}//拷贝一个对象(深拷贝仅限于第一层)
      state.data.first=param1
      state.data.second.third=param2
      console.log(state.obj);
    }

  },
  // 提交mutations中修改的数据与它的功能基本一样,但修改数据是异步的
  actions: {
  },
  // 当数据量比较庞大时,可以在modules中划分模块,每个模块当中都有自己的上述4个方法
  modules: {
  }
})
