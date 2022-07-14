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


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
