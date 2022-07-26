<template>
  <div>
    <!-- 头部 -->
    <hearder title="Online payment" :back="true">
         <van-nav-bar @click-left="onClickLeft">
        <template #left>
            <van-icon name="arrow-left" size="18" />
        </template>
        </van-nav-bar>
    </hearder>

    <!-- 支付时间 -->
    <div class="expire-time">
        <div class="expire-text">
            Remaining payment time
        </div>
        <div class="expire-time-format">
            <van-count-down :time="time" format="mm : ss " />
        </div>
    </div>


    <div class="content-wrapper">
        <div>{{money}}</div>
    </div>

    <div class="line">

    </div>

    <!-- 支付 -->
    <van-button type="primary" block @click="buyConfig">Confirm payment</van-button>

  </div>
</template>

<script>
export default {
    name:'buy',
    data() {
        return {
            buyList:[],
            time:60 * 60 * 1000,
            money:'',
        }
    },
    methods: {
        // 订单查询方法
        async getOrder(){
            let res=await this.$ajax.getOrder({
                username:this.userInfo.username
            })
            this.buyList=res;
        },
        buyConfig(){
            this.$dialog.alert({
            message: 'Payment successful',
            theme: 'round-button',
            }).then(() => {
                this.$router.push({name:'mine'});
            });
        },
        onClickLeft(){
            this.$dialog.confirm({
            title:'Tips!!!',
            message: 'Havent paid yet, are you sure to leave?',
            }).then(() => {
            this.$router.push({name:'cart'})
            }).catch(()=>{
                
            })
        }
    },
    mounted() {
        this.getOrder();
        this.money=this.$route.params.money;
    },
    // beforeRouteLeave(to, from,next) {
    //     this.$dialog.confirm({
    //     title:'提示!!!',
    //     message: '还没支付,确认离开吗?',
    //     }).then(() => {
    //        console.log(111);
    //     }).catch(()=>{
    //         next(false);
    //     })
    // }
    
}
</script>

<style lang="scss" scoped>

.expire-time{
    padding-top: 33px;
    padding-bottom: 26px;
    text-align: center;
    .expire-text{
            font-size: 18px;
            color: #212121;
            letter-spacing: 0;
            line-height: 14px;
    }
    .expire-time-format{
        :deep(.van-count-down){
            margin-top: 11px;
            font-size: 34px;
            color: #333;
            letter-spacing: 0;
            line-height: 36px;
        }
            
    }
}
.line{
    width: 100%;
    height: 30px;
}
.content-wrapper{
    background: #fff;
    height: 44px;
    font-size: 14px;
    color: #212121;
    letter-spacing: 0;
    line-height: 44px;
    padding: 0 12px;
    box-sizing: border-box;
    display: flex;
    div{
        font-size: 16px;
        color: #fb7299;
        letter-spacing: 0;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 10px;
        white-space: nowrap;
    }
}
</style>