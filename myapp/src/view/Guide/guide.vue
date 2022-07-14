<template>
  <div class="guide">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, i) in img" :key="i">
        <!-- 懒加载图片 -->
         <img v-lazy="item" class="gimg" @click="coming" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    coming(){
      this.$router.push({name:'main'})
    }
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
.guide{
    .my-swipe{
        height:100%;
        .gimg{
          width: 100%;
            height:100%;
        }
    }
}
</style>