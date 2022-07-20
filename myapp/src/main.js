import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// 导入全局样式
import '@/assets/index.scss'
// 导入vant组件库
import Vant from 'vant'
import { Dialog } from 'vant'
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.use(Dialog)
import 'vant/lib/index.css'
// 在全局下使用
Vue.use(Vant)
Vue.config.productionTip = false

// 配置全局的事件总线
const bus=new Vue()
Vue.prototype.$bus=bus

// 混入 全局mixins 
// import { Mixins } from './utils/mixins'
import './utils/mixins'

//注册全局组件
import '@/components'

//适配淘宝版
import 'lib-flexible'

// 导入axios文件定义全局下使用axios
import {request} from '@/utils/request'
Vue.prototype.$axios=request

// 全局下使用ajax
import {Ajax} from '@/utils/index'
Vue.prototype.$ajax=Ajax

// 全局的过滤器配置
import '@/utils/golbal'



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
