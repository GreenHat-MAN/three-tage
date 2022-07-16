import Vue from "vue";
import { mapState,mapMutations } from "vuex";
import {FooterList} from '@/utils/index'


// 全局混入
Vue.mixin({

    data() {
        return {
            // title:'这是混入里的值',
            FooterList
        }
    },
    mounted(){
        // console.log('这是一个全局混入的mounted!!!');
    },
    created(){

    },
    computed:{
        ...mapState['name','age','adress']
    },
    methods:{
        onSubmit(values){
            console.log(values);
        },
        goback(){
            this.$router.go(-1);
        },
        ...mapMutations['changeAge'],
    },
    watch:{

    }
})