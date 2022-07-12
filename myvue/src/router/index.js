import Vue from 'vue'
import VueRouter from 'vue-router'

// 模块化编译,全局生命使用vue-router
Vue.use(VueRouter)

// 定义路由组件
import IndexMain from "@/views/indexMain.vue"

//配置路由信息配置,path和compent的映射关系
const routes = [
    {
        path: '/',
        redirect: '/indexmain'
    },
    {
        path: '/indexmain',
        name: 'indexmain',
        component: IndexMain
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('@/views/main.vue')//懒加载
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/detail.vue')//懒加载
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/cart.vue')//懒加载
    },
    {
        path: '/regist',
        name: 'regist',
        component: () => import('@/views/regist.vue')//懒加载
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue')
    },
    {
        path: '*',
        redirect: '/404'
    }
]

// 创建路由的实例对象
const router = new VueRouter({
    routes,
    mode: 'history',
    base: ''
})

// 将创建的路由实例对象暴露出去
export default router
