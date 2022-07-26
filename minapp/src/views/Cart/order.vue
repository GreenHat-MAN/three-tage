<template>

    <div>
    <!-- 头部 -->
    <hearder title="Confirm order" :back="true"></hearder>

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
    <van-submit-bar :price="price" button-text="place order" @submit="onSubmit">
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
    async onSubmit(){
      // 提交订单将vuex里的订单详情添加到order表里
      // 删除vuex里的数据信息和购物车里的购物信息

      // 查询订单是否存在该订单信息
      let data = await this.$ajax.getOrder({username:this.userInfo.username});

      for(let i=0;i<this.OrderList.length;i++){
        if(data.findIndex(item=>{return item.orderInfo.id == this.OrderList[i].id})==-1){
          // 没有直接添加
              let res=await this.$ajax.postOrder({
              username:this.userInfo.username,
              orderInfo:this.OrderList,
              time:new Date()
              });
          //删除购物车数据
              let res2=await this.$ajax.delGood(this.OrderList[i].id,{phone:this.userInfo.phone});
          // 清空vuex里的数据
              this.changeOrderList(null);
          // 清空vuex购物车的数据
              this.changeCartList(null);
          // 跳转到结算
              this.$router.push({name:'buy',params:{money:price}});
        }else{
              this.$toast.fail("The product order already exists!!!");
        }
      }

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