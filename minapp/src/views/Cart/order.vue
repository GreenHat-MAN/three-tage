<template>

    <div>
    <!-- 头部 -->
    <hearder title="确认订单" :back="true"></hearder>

    <!-- 地址信息 -->
    <Adress></Adress>

    <!-- 商品信息 -->
        <div class="orderList" v-for="(l,i) in OrderList" :key="i">
          <van-card
              :num="l.count"
              :price="l.good.price"
              :desc="l.good.brief"
              :title="l.good.name"
              :thumb="l.good.img[0]"
          />
        </div>
    
    <!-- 结算订单 -->
    <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit">
    </van-submit-bar>

    </div>
</template>

<script>
export default {
  name:'order',
  data() {
    return {
      checked:false,
    }
  },
  methods: {
    onSubmit(){
      // 提交订单
    }
  },
  mounted() {
    if(this.$route.params.orders==1){
      this.changeOrderList(this.cartList);
    }else{
      let list=[];
      this.$route.params.orders.forEach(element => {
        list.push(this.cartList[element])
      });
      this.changeOrderList(list);
    }  
    
  },
  computed:{
    price(){
      return (this.OrderList.reduce((pre,cur,index)=>{
                pre+=(cur.count*Number(cur.good.price));
            return pre;
        },0))*100
    }
  }
}
</script>

<style>

</style>