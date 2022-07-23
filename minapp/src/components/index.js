// 全局组件注册 
import Vue from 'vue'

// 注册底部导航组件
import footers from '@/components/footers.vue'
Vue.component('footers',footers)

// 注册头部导航组件
import hearder from '@/components/hearder.vue'
Vue.component('hearder',hearder)

// 组成刷新的组件
import loadmore from '@/components/loadmore.vue'
Vue.component('loadmore',loadmore)