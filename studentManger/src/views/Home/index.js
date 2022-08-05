
import userRouter from '../userManger'
import adviseRouter from '../adviseManger'
import annRouter from '../annManger'
import rootRouter from '../rootManger'

export default [
    {
        path:'/main',
        name:'main',
        component:()=>import ('../Home/main.vue'),
        // redirect:'/main/guide',
        // children:[
        //     {
        //         path:'/main/mine',
        //         name:'mine',
        //         component:()=>import('../mine/mine.vue')
        //     },
        //     {
        //         path:'/main/guide',
        //         name:'guide',
        //         component:()=>import('../Guide/guide.vue')
        //     },
        //     ...userRouter,
        //     ...adviseRouter,
        //     ...annRouter,
        //     ...rootRouter,
        // ]
    }
]