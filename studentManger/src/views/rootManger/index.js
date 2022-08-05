export default [
    {
        path:'/main/root/rootlist',
        name:'rootlist',
        component:()=>import('../rootManger/rootlist.vue')
    },
    {
        path:'/main/root/rootChange',
        name:'rootChange',
        component:()=>import('../rootManger/rootChange.vue')
    },
    {
        path:'/main/root',
        redirect:'/main/root/rootlist'
    },
]