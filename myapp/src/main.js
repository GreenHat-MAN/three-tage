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
// 在全局下使用
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
