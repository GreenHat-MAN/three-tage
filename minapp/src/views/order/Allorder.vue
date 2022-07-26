<template>
  <div>
     <!-- 头部 -->
    <hearder title="我的订单" :back="true"></hearder>

    <!-- 订单列表 -->
    <div class="order-info" v-for="(l,i) in list[0]" :key="i">
            <van-card
            :num="l.orderInfo[0].count"
            :price="l.orderInfo[0].good.price"
            :desc="l.orderInfo[0].good.brief"
            :title="l.orderInfo[0].good.name"
            :thumb="l.orderInfo[0].good.img[0]"
            />
    </div>
  </div>
</template>

<script>
export default {
    name:'Allorder',
    data() {
        return {
            list:[],
        }
    },
    methods: {
        async getOrderList(){
            let res=await this.$ajax.getOrder({
                username:this.userInfo.username
            })
            this.list.push(res.filter(element => {
                return element.orderInfo
            }))
            console.log(this.list[0]);
        },
    },
    mounted() {
        // 请求订单数据
        this.getOrderList();
    },
}
</script>

<style>

</style>