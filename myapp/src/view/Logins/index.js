export default[
    {
        path:'/login',
        name:'login',
        component:()=>import('./login.vue')
    },
    {
        path:'/regist',
        name:'regist',
        component:()=>import('./regist.vue')
    },
    {
        path:'/find',
        name:'findPass',
        component:()=>import('./findPass.vue')
    }

]