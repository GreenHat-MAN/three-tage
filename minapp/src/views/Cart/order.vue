<template>
    <!-- 头部 -->
    <hearder title="确认订单" :back="true"></hearder>

    <!-- 地址信息 -->


</template>

<script>
export default {
  name:'order',
  data() {
    return {
      OrderList:[],
    }
  },
  mounted() {
    if(this.$route.params.orders==1){
      this.OrderList=this.cartList;
      console.log(this.OrderList);
    }else{
      this.$route.params.orders.forEach(element => {
        this.OrderList.push(this.cartList[element]);
      });
       console.log(this.OrderList);
    }  

    
  },
}
</script>

<style>

</style>