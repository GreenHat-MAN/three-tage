import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// 导入全局样式
import '@/assets/index.scss'
// 导入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
// 配置全局的事件总线
const bus=new Vue()
Vue.prototype.$bus=bus
// 混入 全局mixins
import './utils/mixins'
//注册全局组件
import '@/components'
//适配淘宝版
import 'lib-flexible' 
// 全局的过滤器配置
import '@/utils/golbal'
// 导入axios文件定义全局下使用axios
import {request} from '@/utils/request'
Vue.prototype.$axios=request

// 全局下使用ajax
import {Ajax} from '@/utils/index'
Vue.prototype.$ajax=Ajax


Vue.config.productionTip = false

new Vue({
  router,
  store,
  watch:{
    '$route':function(to,from){
      // 监听路由切换
      this.changeFormName(from.name);
    }
  },
  render: h => h(App)
}).$mount('#app')
