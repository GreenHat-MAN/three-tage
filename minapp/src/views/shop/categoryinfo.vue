<template>
  <div class="box">
    <!-- 头部 -->
     <hearder :title="text" :back="true"></hearder>

    <!-- 商品类型选中 -->
    <van-swipe :loop="false" class="swipers">

        <van-swipe-item class="swiper">
            <div class="categorys">
                <div class="catecory-item" v-for="(l,i) in categoryone" :key="i">
                    <img :src="l.imageUrl">
                    <p>{{l.name}}</p>
                </div>
            </div>
        </van-swipe-item>

        <van-swipe-item>
            <div class="categorys">
            <div class="catecory-item" v-for="(l,i) in categorytwo" :key="i">
                <img :src="l.imageUrl">
                <p>{{l.name}}</p>
            </div>
            </div>
        </van-swipe-item>

    </van-swipe>

    


  </div>
</template>

<script>
export default {
    name:'categoryinfo',
    data() {
        return {
            parentCategory:'',
            values:'',
            text:'',
            categoryone:[],
            categorytwo:[],
        }
    },

    methods: {
        // 获取分类栏数据
       async getCatego(){
        let res=await this.$ajax.categoryTab({
            parentCategory:this.parentCategory
        });
        this.categoryone=res.data.vo.subTabs.filter((item,i)=>{return i<5});
        this.categorytwo=res.data.vo.subTabs.filter((item,i)=>{return i>=5});
        // console.log(res.data);
        },
        // 获取分类详细数据
        async getCategos(){
            let res = await this.$ajax.categoryV2({
                extra: [],
                filters: "",
                keyword: "",
                pageIndex: 1,
                priceCeil: "",
                priceFlow: "",
                rangeQueries: [],
                scene: "figure",
                sortOrder: "",
                sortType: "totalrank",
                state: "",
                termQueries:[{field: "category",values:[this.values]}],
                userId: ""
            },{
                'content-type': 'application/json'
            });
            // console.log(res.data);
        }
    },

    mounted() {
        this.parentCategory=this.$route.query.parentCategory;
        this.values=this.$route.query.values;
        this.text=this.$route.query.text;
        this.getCatego();
    },
}
</script>

<style lang="scss" scoped>

    .categorys{
        width: 100%;
        height: 100%;
        .catecory-item{
            width: 15%;  
            display: inline-block;
            margin: 0 2.4%;
            img{
                    width: 100%;
                    height: 55px;
            }
            P{
                   font-family: PingFangSC-Medium;
                    font-size: 11px;
                    color: #212121;
                    text-align: center;
                    line-height: 16px;
                    margin-top: 2px;
                    height: 15px;
                    overflow: hidden; 
            }
        }
    }
    .swipers{
        padding-top: 10px;
        box-sizing: border-box;
        background: #fff;
        .swiper{
        height: 100px;
    }
    }
    

</style>