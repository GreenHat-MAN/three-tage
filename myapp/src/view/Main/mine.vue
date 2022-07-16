<template>
  <div class="boxs">
    <div class="bugImg">
      <div class="userheard">
        <img :src="PIC" />
      </div>
      <p class="login" @click="goLogin">立即登录</p>
    </div>
    <!-- 订单 -->
    <div class="detail">
      <div class="left">
        <van-icon name="coupon" class="lefts" />
        <span>电影订单</span>
      </div>
      <div class="right">
        <van-icon name="balance-list" class="rights" />
        <span>商品订单</span>
      </div>
    </div>
    <div class="lists" v-for="(item, i) in listAry" :key="i">
      <van-cell :value="item.value ? item.value : ''" is-link :icon="item.icon" :to="{name:item.name}">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">{{ item.titles }}</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import PIC from "../../../public/img/头像.png";
export default {
  data() {
    return {
      PIC,
      money: 0,
      listAry:[]
    };
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "login" });
    },
  },
  mounted() {
    this.listAry=[
      { titles: "卖座券", icon: "card",name:'sit' },
      { titles: "组合红包", icon: "point-gift",name:'redpage' },
      { titles: "余额", icon: "gold-coin", value: "￥" + this.money,name:'money' },
      { titles: "帮助与客服", icon: "audio",name:'help' },
      { titles: "设置", icon: "setting",name:'setting' },
    ];
  },
};
</script>

<style scoped lang="scss">
.bugImg {
  width: 100%;
  height: 150px;
  background-image: url("../../../public/img/背景图.png");
  display: flex;
  align-items: center;
}
.login {
  font-size: 16px;
  line-height: 150px;
  color: white;
}
.userheard {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid white;
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
  }
}
.detail {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  .left,
  .right {
    width: 50%;
    height: 80px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  span {
    font-size: 15px;
  }
}
.lefts {
  font-size: 30px;
  color: orange;
  margin: 10px;
}
.rights {
  font-size: 30px;
  color: green;
  margin: 10px;
}
</style>