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
  </div>
</template>

<script>
export default {
  name: "guide",
  data() {
    return {
      rate: 100,
      currentRate: 0,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
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
};
</script>

<style lang='scss' scoped>
.guide {
  position: relative;
  background: url('../../../public/img/none.png') no-repeat 100%;
  .dao {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 100;
  }
}
</style>