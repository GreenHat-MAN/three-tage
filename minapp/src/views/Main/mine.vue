<template>
  <div class="box">
    <!-- 头部 -->
    <hearder title="我的" :back="true"></hearder>

    <!-- 我的订单 -->
    <div class="myOrder">
      <div class="order-top">
        <div class="title">我的订单</div>
        <div class="see">查看全部订单</div>
      </div>

      <div class="order-bottom">
        <div class="item" v-for="(l, i) in imgList" :key="i">
          <router-link :to="{ name: l.name }">
            <div class="img"><img :src="l.background" /></div>
            <div class="text">{{ l.text }}</div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 常用功能 -->
    <div class="fun">
      <div class="fun-top">
        <div class="title">常用功能</div>
      </div>

      <div class="fun-bottom">
        <div class="item" v-for="(l, i) in funList" :key="i">
          <router-link :to="{ name: l.name }">
            <div class="img"><img :src="l.background" /></div>
            <div class="text">{{ l.text }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PIC from "../../../public/img/bag.png";
import PIC2 from "../../../public/img/bukuan.png";
import PIC3 from "../../../public/img/cart.png";
import PIC4 from "../../../public/img/pingjia.png";
import PIC5 from "../../../public/img/hegui.png";
import PIC6 from "../../../public/img/adress.png";
import PIC7 from "../../../public/img/fankui.png";
import PIC8 from "../../../public/img/kefu.png";
import PIC9 from "../../../public/img/cangku.png";
import PIC10 from "../../../public/img/jiangp.png";
export default {
  name: "mine",
  data() {
    return {
      PIC,
      PIC2,
      PIC3,
      PIC4,
      PIC5,
      PIC6,
      PIC7,
      PIC8,
      PIC9,
      PIC10,
      imgList: [],
      funList: [],
    };
  },
  mounted() {
    this.imgList = [
      { background: this.PIC, text: "待付款", name: "" },
      { background: this.PIC2, text: "待开补款", name: "" },
      { background: this.PIC3, text: "待收货", name: "" },
      { background: this.PIC4, text: "待评价", name: "" },
      { background: this.PIC5, text: "盒柜", name: "" },
    ];
    this.funList = [
      { background: this.PIC, text: "优惠券", name: "" },
      { background: this.PIC6, text: "地址管理", name: "" },
      { background: this.PIC7, text: "建议反馈", name: "" },
      { background: this.PIC8, text: "在线客服", name: "" },
      { background: this.PIC9, text: "魔力仓库", name: "" },
      { background: this.PIC10, text: "我的奖品", name: "" },
    ];
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;

  .myOrder {
    width: 359px;
    min-height: 97px;
    margin: 8px 8px 0;
    background-color: #fff;
    border-radius: 0.53333rem;
    padding: 12px 4px 8px 8px;
    outline: none;
    border-style: none;
    .order-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 15px;
        color: #000;
        font-weight: 700;
      }
      .see {
        font-size: 12px;
        color: #757575;
        padding-right: 12px;
        background-image: url("../../../public/img/jiantou.png");
        background-position: 100% 50%;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }
    }
    .order-bottom {
      justify-content: space-between;
      margin-top: 12px;
      display: flex;
      .item {
        flex: 1 1;
        width: 70px;
        .img {
          position: relative;
          width: 32px;
          height: 32px;
          background-position: 50% 50%;
          margin: 0 18px 6px 18px;
          background-size: contain;
          img {
            width: 32px;
            height: 32px;
          }
        }
        .text {
          font-size: 12px;
          color: #757575;
          text-align: center;
          height: 12px;
          line-height: 12px;
        }
      }
    }
  }

  .fun {
    width: 360px;
    min-height: 195px;
    margin: 8px 8px 0;
    background-color: #fff;
    border-radius: 0.53333rem;
    padding: 12px 4px 8px 8px;
    outline: none;
    border-style: none;
    .fun-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 15px;
        color: #000;
        font-weight: 700;
      }
    }
    .fun-bottom{
      display: flex;
      flex-wrap: wrap;
        .item{
          width: 25%;
          margin-bottom: 20px;
          padding-top: 10px;
          .img {
          position: relative;
          width: 32px;
          height: 32px;
          background-position: 50% 50%;
          margin: 0 28px 10px;
          background-size: contain;
          img {
            width: 32px;
            height: 32px;
          }
        }
        .text {
          font-size: 12px;
          color: #757575;
          text-align: center;
          height: 12px;
          line-height: 12px;
        }
        }
    }
  }
}
</style>