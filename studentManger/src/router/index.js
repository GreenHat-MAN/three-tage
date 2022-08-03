import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router'

import Guide from '@/views/Guide/guide.vue'
import LoginRouter from '../views/Login/idnex'
import errPageRouter from '@/views/errPage'
import mainRouter from '@/views/Home'

// 配置路由信息
const routes=[
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/guide',
        name:'guide',
        component:Guide
    },
    ...LoginRouter,
    ...errPageRouter,
    ...mainRouter,
    {
        path:'/:pathMatch(.*)',
        redirect:{name:'notfound'}
    }
]


// 创建路由对象
const router=createRouter({
    routes,
    history:createWebHashHistory()  //hash模式
})

export default router