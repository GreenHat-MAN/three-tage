import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// createApp  返回一个提供应用上下文的应用实例   链式调用

// 公共CSS
import "@/styles/index.scss"

// vuex 配置
import store from '@/store'

// 全局混入
import { GolbalMixins } from '@/utils/mixins'

// 配置路由
import router from '@/router'

// 配置全局组件
import Test from '@/components/Test.vue'



app
.use(ElementPlus, { size: 'small', zIndex: 3000 })
.use(store) // 将 store 实例作为插件安装
.use(router)
.mixin(GolbalMixins)
.component("Test", Test)
.mount('#app')