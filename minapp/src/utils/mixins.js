import Vue from "vue";
import { mapState,mapMutations,mapGetters, mapActions } from "vuex";
import {FooterList,reg} from '@/utils/index'


// 全局混入
Vue.mixin({

    data() {
        return {
            // title:'这是混入里的值',
            FooterList,
            reg
        }
    },
    mounted(){
        // console.log('这是一个全局混入的mounted!!!');
    },
    created(){

    },
    computed:{
        ...mapState(['userInfo','city','cityList','cinemaList','goodList','fromName','shopLists','cartList','AdressList','OrderList']),
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
        'changeCinemaList','changeFormName','changeShopList','changeCartList','changeAdressList','changeOrderList']),
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
                    title: 'Friendly tips',
                    message: 'You havent logged in yet, please log in first',
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