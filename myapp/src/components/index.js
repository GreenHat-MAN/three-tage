// 全局组件注册 
import Vue from 'vue'

//注册测试组件
import Test from './test.vue'
Vue.component('test',Test)

// 注册轮播图组件
import MySwipe from './mySwiper.vue'
Vue.component('MySwipe',MySwipe)

import MySwipeItem from './MySwipeItem.vue'
Vue.component('MySwipeItem',MySwipeItem)

// 注册底部导航组件
import footers from '@/components/footers.vue'
Vue.component('footers',footers)

import myfooter from '../components/myfooter.vue'
Vue.component('myfooter',myfooter)

// 注册头部导航信息
import myheard from '@/components/myheard.vue'
Vue.component('myheard',myheard)

// 注册主页电影列表组件
import filmlist from '@/components/filmlist.vue'
Vue.component('filmlist',filmlist)

// 注册电影院组件
import CList from '@/components/CList.vue'
Vue.component('CList',CList) 