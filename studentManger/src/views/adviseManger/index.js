export default [
    {
        path:'/main/advise/adviselist',
        name:'advise',
        component:()=>import('../adviseManger/adviselist.vue')
    },
    {
        path:'/main/advise/adviseasync',
        name:'adviseasync',
        component:()=>import('../adviseManger/adviseasync.vue')
    },
    {
        path:'/main/advise',
        redirect:'/main/advise/adviselist'
    },
]