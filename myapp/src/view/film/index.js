export default[
    {
        path:'/film/:filmId',
        name:'filminfo',
        component:()=>import('@/view/film/filminfo.vue')
    },
    {
        path:'/film/:filmId/cinemas',
        name:'moviesit',
        component:()=>import('@/view/film/moviesit.vue')
    },
]