<template>
  <div class="guide">
    <!-- 倒计时 -->
    <div class="dao">
      <van-circle
        v-model="currentRate"
        :rate="rate"
        :color="gradientColor"
        :text="text"
        size="50px"
        speed="20"
      />
    </div>

    <!-- vant组件的轮播图 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      v-if="false"
    >
      <van-swipe-item v-for="(item, i) in img" :key="i">
        <!-- 懒加载图片 -->
        <img v-lazy="item" class="gimg" @click="coming" />
      </van-swipe-item>
    </van-swipe>

    <!-- swiper插件的轮播图 -->
    <MySwipe class="my-swipe" :options="options">
      <my-swipe-item v-for="(l, i) in banners" :key="i">
        <van-image class="gimg" :src="l.pic"></van-image>
        <van-button
          @click="coming"
          v-if="i == banners.length - 1"
          type="danger"
          class="gbtn"
        >
          开始APP之旅
        </van-button>
      </my-swipe-item>
    </MySwipe>
  </div>
</template>

<script>
// 导入axios
import axios from "axios";
// 导入获取日期的方法
import { getWeekInYear } from "../../utils/index";
export default {
  name: "guide",
  data() {
    return {
      img: [
        require("../../../public/img/img1.jpg"),
        require("../../../public/img/img2.jpg"),
        require("../../../public/img/img3.jpg"),
        require("../../../public/img/img4.jpg"),
      ],
      rate: 100,
      currentRate: 0,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
      options: {
        loop: true,
        autoplay: {
          delay: 1800,
        },
        speed: 2000,
        effect: "cube", //立体效果
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6,
        },
        observer: true, // 订阅swiper swiper改变会重新实例化 处理异步
      },
      banners: [],
    };
  },
  computed: {
    text() {
      return 5 - Math.floor(this.currentRate / 20) + "S";
    },
  },
  watch: {
    currentRate(v) {
      if (v == 100) {
        this.$router.push({ name: "main" });
      }
    },
  },
  mounted() {
    // 请求数据
    this.getBanner();
  },
  beforeRouteEnter(to, from, next) {
    const week = getWeekInYear();
    console.log(week);
    const old_week = localStorage.getItem("week");
    if (old_week) {
      if (week == old_week) {
        next("/main");
      } else {
        localStorage.setItem("week", week);
        next();
      }
    } else {
      localStorage.setItem("week", week);
      next();
    }
  },
  methods: {
    // 点击跳转到首页
    coming() {
      this.$router.push({ name: "main" });
    },

    // 异步请求图片
    async getBanner() {
      let res = await axios.get("http://121.196.235.163:3000/banner?type=2");
      // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
      // setTimeOut
      this.$nextTick(() => {
        this.banners = res.data.banners.slice(0, 4);
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.guide {
  position: relative;
  .dao {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 100;
  }
  .my-swipe {
    height: 100%;
    position: relative;
    .gimg {
      height: 100%;
    }
    .gbtn {
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 20px;
    }
  }
}
</style>