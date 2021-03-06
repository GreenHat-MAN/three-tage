import Vue from "vue";
import { mapState,mapMutations,mapGetters, mapActions } from "vuex";
import {FooterList} from '@/utils/index'


// 全局混入
Vue.mixin({

    data() {
        return {
            // title:'这是混入里的值',
            FooterList,
        }
    },
    mounted(){
        // console.log('这是一个全局混入的mounted!!!');
    },
    created(){

    },
    computed:{
        ...mapState(['userInfo','city','cityList','cinemaList','goodList']),
        ...mapGetters(['hotCity','goodTypes']),
        
    },
    methods:{
        onSubmit(values){
            console.log(values);
        },
        goback(){
            this.$router.go(-1);
        },
        ...mapMutations(['changeAge','changeUserInfo','changeCity','changeCityList',
        'changeCinemaList']),
        ...mapActions(['getGoodListAsync']),
        gotowhere(options){
            const {name,query,params} = options;
            this.$router.push({name,query,params})
        },
        // 判断是否登录 
        checkIsLogin(callback){
            if(this.userInfo){
                callback()
            }else{
                this.$dialog.confirm({
                    title: '友情提示',
                    message: '你还没有登录,请先登录哦.',
                    // theme: 'round-button',
                }).then(() => {
                    // on close
                    this.$router.push({name:'login'})
                });
            }
        },
    },
    watch:{

    }
})