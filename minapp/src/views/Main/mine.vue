<template>
  <div class="box">
    <!-- 头部 -->
    <hearder title="MY" :back="true"></hearder>

    <!-- 用户信息 -->
    <div class="bugImg">
      <div class="userheard">
        <img :src="PIC11" />
      </div>
      <p class="login" v-if="userInfo">
        UserName:{{ userInfo.username }}<br />
        Phone:{{ userInfo.phone }}
      </p>
      <p v-else class="login" @click="goLogin">Now Go</p>
    </div>

    <!-- 我的订单 -->
    <div class="myOrder">
      <div class="order-top">
        <div class="title">My Order</div>
        <div class="see" @click="allOrder">All Order</div>
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
        <div class="title">Function</div>
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

    <!-- 退出 -->
    <div class="logbox" v-if="userInfo" @click="logoutAction">
      <van-button class="logout" block>Login Out</van-button>
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
import PIC11 from "../../../public/img/头像.png";
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
      PIC11,
      imgList: [],
      funList: [],
    };
  },
  methods: {
    logoutAction() {
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "你真的要退出登录吗?",
        })
        .then(() => {
          // on confirm
          localStorage.removeItem("username");
          localStorage.removeItem("phone");
          this.changeUserInfo(null);
        })
        .catch(() => {
          // on cancel
        });
    },
    goLogin() {
      this.$router.push({ name: "login" });
    },
    allOrder(){
      this.checkIsLogin(async()=>{
          this.$router.push({name:'Allorder'});
      });
      
    }
  },
  mounted() {
    this.imgList = [
      { background: this.PIC, text: "waitPay", name: "" },
      { background: this.PIC2, text: "waitMenoy", name: "" },
      { background: this.PIC3, text: "waitGppds", name: "" },
      { background: this.PIC4, text: "waitEvaluate", name: "" },
      { background: this.PIC5, text: "Box", name: "" },
    ];
    this.funList = [
      { background: this.PIC, text: "RedPage", name: "redpage" },
      { background: this.PIC6, text: "AdressMange", name: "adress" },
      { background: this.PIC7, text: "Link", name: "people" },
      { background: this.PIC8, text: "customer service", name: "" },
      { background: this.PIC9, text: "My Collect", name: "collect" },
      { background: this.PIC10, text: "I like", name: "like" },
    ];
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  .bugImg {
  width: 100%;
  height: 150px;
  background-image: url("../../../public/img/背景图.png");
  display: flex;
  align-items: center;
}
.login {
  font-size: 16px;
  // line-height: 150px;
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
  .logbox {
  margin: 15px;
  border-radius:30% ;
}
}
</style>