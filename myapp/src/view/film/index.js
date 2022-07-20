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
    {
        path:"/cinema/:cinemaId/film/:filmId?/:date?",
        name:'cinema-detail',
        component:()=>import("./cinema-detail.vue")
    }
]