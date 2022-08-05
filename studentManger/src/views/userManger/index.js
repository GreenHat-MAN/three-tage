export default [
    {
        path:"/main/user",
        redirect:"/main/user/userlist"
    },
    {
        path:'/main/user/userlist',
        name:'userlist',
        component:()=>import('../userManger/userlist.vue')
    },
    {
        path:'/main/user/useranalysis',
        name:'useranalysis',
        component:()=>import('../userManger/useranalysis.vue')
    }
]