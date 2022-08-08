import { mapMutations, mapState } from "vuex"
import {baseURL} from '../api/request'


// 全局的混入 mixins 
export const GolbalMixins = {
    mounted(){
        // console.log("GolbalMixins - 全局混入 ")
    },
    data(){
        return {
            hello:"wh2206-yyds",
            baseURL
        }
    },
    methods: {
        ...mapMutations(['changeUserInfo','changecollapse','changeRouterList','getXuekeList','getClassList','getPublicList'])
    },
    watch:{

    },
    computed:{
        ...mapState(['userInfo','roleList','collapse','routerLists','xuekeList','classList','publicList'])
    }
}