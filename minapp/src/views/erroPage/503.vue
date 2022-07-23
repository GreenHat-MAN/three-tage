<template>
  <div class="errorpage" ref="bgstar" id="bgstar">
    <div class="dao" @click="gotomain">
      <van-circle
        v-model="currentRate"
        :rate="rate"
        :color="gradientColor"
        :text="text"
        size="80px"
      />
    </div>
    <img :src="PIC" alt="" class="myimg tada1" />
    <span v-for="(l, i) in spanNum" :key="i" class="spandot" :style="l"> </span>
  </div>
</template>


<script>
import PIC from "../../../public/img/503.png";
var timer = null;
export default {
  name: "errPage",
  data() {
    return {
      PIC,
      time: 5,
      spanNum: [],
      rate: 0,
      currentRate: 0,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
    };
  },
  computed: {
    text() {
      return this.currentRate + "%";
    },
  },
  watch: {
    currentRate(v) {
      if (v == 100) {
        this.gotomain();
      }
    },
  },
  methods: {
    spanNumInit() {
      var width = document.getElementById("bgstar").clientWidth;
      var height = this.$refs.bgstar.clientHeight;
      console.log(width, height);

      for (var i = 0; i < 520; i++) {
        var left = Math.round(width * Math.random());
        var top = Math.round(height * Math.random());
        var rate = Math.random() * 2.5; // 频率
        var scaler = Math.random() * 1.5;
        var r = 255;
        var g = 255;
        var b = 255;
        var opacity = Math.random();

        this.spanNum.push({
          left: left + "px",
          top: top + "px",
          transform: `scale(${scaler})`,
          animationDelay: rate + "s",
          background: `rgba(${r},${g},${b},${opacity})`,
        });
      }
    },
    gotomain() {
      this.$router.push({ name: "main" });
    },
  },
  mounted() {
    this.spanNumInit();
    timer = setInterval(() => {
      if (this.currentRate < 100) {
        this.currentRate++;
      } else {
        setInterval(timer);
        timer = null;
      }
    }, 50); // 5000/100
  },
  destroyed() {
    clearInterval(timer);
    timer = null;
  },
};
</script>

<style lang="scss" scoped>
// scope 独立的css作用域
.errorpage {
  width: 100%;
  height: 100%;
  background: #000;
  position: relative;
  padding: 0 !important;
  overflow: hidden;
  .down {
    position: absolute;
    left: 20px;
    top: 20px;
    border: 1px solid #fff;
    color: #fff;
    width: 70px;
    height: 30px;
    border-radius: 10px;
    text-align: center;
    line-height: 30px;
  }
  .dao {
    position: absolute;
    top: 20px;
    right: 20px;
    // ::v-deep样式穿透效果
    :deep(.van-circle__text){
      color: #fff !important;
    }
  }
  .myimg {
    width: 270px;
    height: 270px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    z-index: 10;
  }
  .spandot {
    position: absolute;
    z-index: 100;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    animation: flash 3s infinite alternate;
  }
  @keyframes flash {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.5;
    }
  }
}
</style>