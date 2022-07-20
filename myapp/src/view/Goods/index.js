export default[
    {
        path:'/good/:goodId',
        name:'good',
        component:()=>import('@/view/Goods/good.vue')
    }
]