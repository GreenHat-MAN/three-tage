import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// 导入全局样式
import '@/assets/index.scss'
//全局注册组件
import index from "@/components/index.vue"

Vue.component('index', index)

Vue.config.productionTip = false

// 项目启动主文件----->main

// 定义一个全局事件总线常量在vue实例的原型链上
const bus = new Vue();
Vue.prototype.$bus = bus


// 全局vue实例对象
new Vue({
  router,
  store,
  render: h => h(App) //函数式编写模板
}).$mount('#app')
