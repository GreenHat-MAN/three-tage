export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('../Login/login.vue')
    },
    {
        path: '/regist',
        name: 'regist',
        component: () => import('../Login/regist.vue')
    },
    {
        path: '/findpass',
        name: 'findpass',
        component: () => import('../Login/findpass.vue')
    },
]