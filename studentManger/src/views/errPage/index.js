export default [
    {
        path:'/404',
        name:'notfound',
        component:()=>import ('./notfound.vue')
    },
    {
        path:'/503',
        name:'erropage',
        component:()=>import ('./erropage.vue')
    },
]