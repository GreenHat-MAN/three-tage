export default[
    {
        path:'/shopinfo',
        name:'shopinfo',
        component:()=>import('./shopinfo.vue'),
    },
    {
        path:'/search',
        name:'search',
        component:()=>import('./search.vue'),
    },
    {
        path:'/searchinfo',
        name:'searchinfo',
        component:()=>import('./searchinfo.vue'),
    },
    {
        path:'/categoryinfo',
        name:'categoryinfo',
        component:()=>import('./categoryinfo.vue'),
    }
]