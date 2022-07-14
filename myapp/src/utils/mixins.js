import Vue from "vue";
import { mapState,mapMutations } from "vuex";


// 全局混入
Vue.mixin({

    data() {
        return {
            title:'这是混入里的值',
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
        ...mapMutations['changeAge'],
    },
    watch:{

    }
})