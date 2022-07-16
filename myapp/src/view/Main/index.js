export default [

    {
        path:'/main',
        name:'main',
        component:()=>import('./main.vue'),
        redirect:'/movie',
        children:[

            {
                path:'/movie',
                name:'movie',
                component:()=>import('./movie.vue'),
            },
            {
                path:'/shop',
                name:'shop',
                component:()=>import('./shop.vue'),
            },
            {
                path:'/news',
                name:'news',
                component:()=>import('./news.vue'),
            },
            {
                path:'/mine',
                name:'mine',
                component:()=>import('./mine.vue'),
            },
            {
                path:'/cinema',
                name:'cinema',
                component:()=>import('./cinema.vue'),
            },
        ]
    }
]