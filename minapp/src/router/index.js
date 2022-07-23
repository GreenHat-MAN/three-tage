import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入路由组件
import GuideRouter from '@/views/Guide/guide.vue'
import MainRouter from '@/views/Main'
import LoginRouter from '@/views/Login'
import erroPageRouter from '@/views/erroPage'
import cartRouter from '@/views/Cart'
import classifyRouter from '@/views/Classify'
import shopRouter from '@/views/shop'

const routes = [

  // 默认打开位置
  {
    path: '/',
    redirect: '/guide'
  },
  // 欢迎界面
  {
    path: '/guide',
    name: 'guide',
    component: GuideRouter
  },
  //错误信息页
  {
    path: '*',
    redirect: '/404'
  },
  ...LoginRouter,
  ...cartRouter,
  ...classifyRouter,
  ...erroPageRouter,
  ...MainRouter,
  ...shopRouter
]

const router = new VueRouter({
  routes
})

export default router
