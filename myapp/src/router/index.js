import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入路由组件
import GuideRouter from '@/view/Guide/guide.vue'
import MainRouter from '@/view/Main'
import LoginsRouter from '@/view/Logins'
import erroPageRouter from '@/view/erroPage'
import filmRouter from '@/view/film'
import goodRouter from '@/view/Goods'


// 配置路由路径和组件的映射关系
const routes = [

    // 默认打开位置
    {
        path: '/',
        redirect: '/guide'
    },
    // 首页
    {
        path: '/guide',
        name: 'guide',
        component: GuideRouter
    },
    // 定位系统
    {
        path:'/city',
        name:'city',
        component:()=>import('@/view/City/city.vue')
    },
    ...LoginsRouter,
    ...MainRouter,
    ...erroPageRouter,
    ...filmRouter,
    ...goodRouter,
    //错误信息页
    {
        path: '*',
        redirect: '/404'
    }

]


// 实例化路由对象
const router = new VueRouter({
    routes
})

// 将路由对象暴露出去
export default router

