import { mapMutations, mapState } from "vuex"



// 全局的混入 mixins 
export const GolbalMixins = {
    mounted(){
        // console.log("GolbalMixins - 全局混入 ")
    },
    data(){
        return {
            hello:"wh2206-yyds"
        }
    },
    methods: {
        ...mapMutations(['changeUserInfo','changecollapse',])
    },
    watch:{

    },
    computed:{
        ...mapState(['userInfo','roleList','collapse'])
    }
}