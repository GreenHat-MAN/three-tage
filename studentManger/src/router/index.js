import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import Guide from '@/views/Guide/guide.vue'
import LoginRouter from '../views/Login/idnex'
import errPageRouter from '@/views/errPage'
import mainRouter from '@/views/Home'
import useStore from '../store';
import { Ajax } from '../api'
import { routerList } from '../utils/AddRouter.js';
// 配置路由信息
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/guide',
        name: 'guide',
        component: Guide
    },
    ...LoginRouter,
    ...errPageRouter,
    ...mainRouter,
]


// 创建路由对象
const router = createRouter({
    routes,
    history: createWebHashHistory()  //hash模式
})


const getRouter = (arr, role) => {
    //过滤第一层路由信息,将比角色权限大的数据过滤掉
    let newList = arr.filter(it => role > it.role)
    // 循环过滤后的数据
    newList.forEach(element => {
        // 判断新数组是否存在子路由
        if (element.children) {
            // 递归返回新一轮子路由
            return (element.children = getRouter(element.children, role))
        }
    })
    return newList
}


router.beforeEach(async (to, from, next) => {
    const store = useStore
    localStorage.setItem("formRouteName",from.name);
    if (to.path == '/login') {
        next();
    } else {
        if (!(store.state.routerLists && store.state.routerLists.length > 0)) {
            store.dispatch('getRoleListAsync')
            let res = await Ajax.userAll()
            store.commit('changeRouterList', getRouter(routerList, res.result[0].role))
            router.addRoute({
                path: '/main',
                name: 'main',
                component: () => import('../views/Home/main.vue'),
                children: store.state.routerLists
            })
            router.addRoute(
                {
                    path: '/:pathMatch(.*)',
                    redirect: { name: 'notfound' },
                }
            )
            next({ ...to, replace: true })
        } else {
            next()
        }
    }
})


export default router