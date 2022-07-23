<template>
  <div>
    <!-- 头部 -->
    <hearder title="购物车" :back="true"></hearder>
    <!-- 提示信息 -->
    <div class="erro" v-if="!userInfo">
        <van-notice-bar color="#e78b1f"  left-icon="info-o">
              登录后可同步购物车中的商品
              <router-link class="gotologin" :to="{name:'login'}" >立即登录</router-link>
        </van-notice-bar>
        <div class="empty"></div>
    </div>
    <div class="cart" v-else>
      <div class="cart-info" v-if="!cartList">
          
      </div>
      <div class="cart-info" v-else>
        <div class="empty"></div>
      </div>
    </div>


    <!-- 购买结算 -->
    <van-submit-bar disabled class="sub" :price="price" button-color="#fb7299" button-text="结算(0)" @submit="onSubmit">
    <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>

    <!-- 底部导航 -->
    <footers></footers>
  </div>
</template>

<script>
export default {
    name:'cart',
    data() {
      return {
        checked:'',
        price:0
      }
    },
    methods: {
      onSubmit(){
        console.log('123');
      }
    },
}
</script>

<style lang="scss" scoped>
  .gotologin{
    margin-left: 40%;
    color: #e78b1f;
  }
  .empty{
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 200px;
    background: url('../../../public/img/empty.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
  }
  .sub{
    margin-bottom: 45px;
  }
</style>