// 全局组件注册 
import Vue from 'vue'

// 注册底部导航组件
import footers from '@/components/footers.vue'
Vue.component('footers',footers)

// 注册头部导航组件
import hearder from '@/components/hearder.vue'
Vue.component('hearder',hearder)

// 注册刷新的组件
import loadmore from '@/components/loadmore.vue'
Vue.component('loadmore',loadmore)

// 注册分类商品信息组件
import classlist from '@/components/classlist.vue'
Vue.component('classlist',classlist)

// 方式一的搜索信息组件
import searchres from '@/components/searchres.vue'
Vue.component('searchres',searchres)