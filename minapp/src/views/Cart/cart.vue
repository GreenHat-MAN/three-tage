<template>
  <div>
    <!-- 头部 -->
    <hearder title="购物车" :back="true"></hearder>
    <!-- 提示信息 -->
    <div class="erro" v-if="!userInfo">
      <van-notice-bar color="#e78b1f" left-icon="info-o">
        登录后可同步购物车中的商品
        <router-link class="gotologin" :to="{ name: 'login' }"
          >立即登录</router-link
        >
      </van-notice-bar>
      <div class="empty"></div>
    </div>
    <div class="cart" v-else>
      <div class="cart-info" v-if="cartList">
        
          
          
          <van-checkbox-group v-model="result" ref="checkboxGroup">
          <div class="goods-item" v-for="(l,i) in cartList" :key="i">
          <van-checkbox :name="i" label-disabled icon-size="40px">
                <van-swipe-cell :before-close="beforeClose" :name="i" >
                          <van-card
                            :num="l.count"
                            :price="l.good.price"
                            :desc="l.good.brandName"
                            :title="l.good.name"
                            class="goods-card"
                            :thumb="l.good.img[0]"
                          >
                          <template #footer>
                            <van-stepper v-model="l.count" max="5" @change="changeCount(l.count,i)" theme="round" button-size="22" disable-input />
                          </template>
                          </van-card>
                          <template #right>
                            <van-button
                              square
                              text="删除"
                              type="danger"
                              class="delete-button"
                            />
                          </template>
                </van-swipe-cell>
          </van-checkbox>
          </div>
          </van-checkbox-group>


          



        
      </div>
      <div class="cart-info" v-else>
        <div class="empty"></div>
      </div>
    </div>

    <!-- 购买结算 -->
    <van-submit-bar
      :disabled="disable"
      class="sub"
      :price="ltotal"
      button-color="#fb7299"
      :button-text="`结算(${numTotal})`"
      @submit="onSubmit"
    >
      <van-checkbox :value="flag" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>

    <!-- 底部导航 -->
    <footers></footers>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      price: 0,
      value:0,
      result: [],
      total:0,
      orderList:[],
    };
  },
  methods: {
    // 删除购物车商品
    beforeClose({name,position, instance}){
      switch(position){
        case 'right':
          this.$dialog.confirm({
            message:'删除该商品吗?',
          }).then(()=>{
            console.log(name);
            this.delCartList(name);
            instance.close();
          });
          break;
      }
    },
    // 数量改变
    changeCount(val,index){
      // console.log(val,det+1);
      this.upCatrList(val,index);
      if(this.flag){
        this.changeInfo();
      }
    },
    // 全选
    checkAll() {
      if(this.flag==false){
        this.$refs.checkboxGroup.toggleAll(true);
      }else{
        this.$refs.checkboxGroup.toggleAll(false);
       
      }
    },
    // 结算
    onSubmit() {
      if(this.flag==true){
        this.$router.push({name:'order',params:{orders:1}});
      }else if(this.result.length>0){
        this.result.forEach(element => {
          this.orderList.push(element)
        });
          this.$router.push({name:'order',params:{orders:this.orderList}});
      }else{
          this.$toast.fail("至少买一个吧!!!");
      }


      // // 结算商品时判断哪些商品被选中
      // if(this.flag==true){
      //   // 表示商品被全部选中,将购物车商品全加入到订单表中
      //   this.cartList.forEach(element=>{
      //       let res1= await this.$ajax.postOrder({
      //         count:element.count,
      //         good:element.good,
      //         goodId:element.goodId,
      //         phone:element.phone
      //       });
      //   });
      // }else if(this.result.length>0){
      //   // 根据所点击的单个商品加入到订单表中
      //   let data = await this.$ajax.getCarts({phone:this.userInfo.phone});
      //   this.result.forEach(element => {
      //     // console.log(data[element]);
      //     let res2=await this.$ajax.postOrder({
      //         count:data[element].count,
      //         good:data[element].good,
      //         goodId:data[element].goodId,
      //         phone:data[element].phone
      //     })
      //   });
      // }else{
      //   this.$toast.fail("至少买一个吧!!!");
      // }
    },

    // 改变购物车总信息
    // 查询当前用户下的购物车信息
    async getCart() {
      let res = await this.$ajax.getCarts({
        phone: this.userInfo.phone,
      });
      this.changeCartList(res); //全局的购物车信息vuex
    },

    // 修改购物车数量
    async upCatrList(val,index){
      let data=await this.$ajax.getCarts({phone:this.userInfo.phone});
      let res = await this.$ajax.updateGood(data[index].id,{count:val});
      this.getCart();
    },

    // 删除购物车商品
    async delCartList(name){
      let data=await this.$ajax.getCarts({phone:this.userInfo.phone});
      let res=await this.$ajax.delGood(data[name].id,{});
      this.getCart();
    }

  },

  mounted() {
    this.userInfo?this.getCart():'';
  },
   computed:{
      flag:{
        get(){
          return this.cartList.length==this.result.length;
        },
          set(){

          }
      },
      numTotal(){
         return  this.cartList.reduce((pre,cur,index)=>{
          if(this.result.includes(index)){
            return  pre+cur.count
          }
          return pre
          },0)
      },
      ltotal(){
       return (this.cartList.reduce((pre,cur,index)=>{
            if(this.result.includes(index)){
                pre+=(cur.count*Number(cur.good.price));
            }
            return pre;
        },0))*100
      },
      disable(){
        return this.userInfo?false:true;
      }
  }
};
</script>

<style lang="scss" scoped>
.gotologin {
  margin-left: 40%;
  color: #e78b1f;
}
.empty {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 200px;
  background: url("../../../public/img/empty.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
}
.sub {
  margin-bottom: 45px;
}
.goods-item{
  margin-bottom: 0px;
}
.goods-card {
  margin: 0;
  background-color: white;
}
.delete-button {
  height: 100%;
}
.goods-item{
  display: flex;
  background: white;
  :deep(.van-swipe-cell){
    width: 100%;
  }
}

</style>