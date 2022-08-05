export default [
    {
        path:'/main/ann/annlist',
        name:'annlist',
        component:()=>import('../annManger/annlist.vue')
    },
    {
        path:'/main/ann/annasyncsis',
        name:'annasyncsis',
        component:()=>import('../annManger/annasyncsis.vue')
    },
    {
        path:'/main/ann',
        redirect:'/main/ann/annlist'
    },
]