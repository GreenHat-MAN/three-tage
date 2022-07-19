<template>
  <div class="filmHome">
    <myheard title="电影" :back="false">
      <span v-if="city" @click="gotowhere({name:'city',query:{name:city.name}})"> {{city.name}} <van-icon name="arrow-down" color="#000" /></span>
      <span v-else></span>
    </myheard>

    <!-- 轮播图 -->
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(l, i) in banner" :key="i">
          <img :src="l.imgUrl" class="himg" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 电影列表 -->
    <div class="navs">
      <van-tabs
        v-model="type"
        sticky
        animated
        swipeable
        color="#f50"
        title-active-color="#f50"
      >
        <van-tab title="正在热映" name="1">
          <filmlist :list="filmList" :type="type"></filmlist>
        </van-tab>
        <van-tab title="即将上映" name="2">
          <filmlist :list="filmList" :type="type"></filmlist>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "movie",
  data() {
    return {
      filmList: [],
      type: '1',
      total: 0,
      banner: [],
      pageNum: 1, // 页码
      pageSize: 10,
    };
  },
  watch: {
    type(v) {
      this.pageNum = 1; // 从第一页开始请求
      this.getfilm({
        pageNum: this.pageNum, // 页码
        pageSize: this.pageSize,
        type: v,
        cityId: this.city.cityId,
      });
    },
  },
  methods: {
    // 获取轮播图信息
    async getbanner() {
      let data = await this.$ajax.getList(
        { cityId: this.city.cityId },
        {
          "X-Host": "mall.cfg.film-float.banner",
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.2.0","e":"164016685720306605375489","bc":"110100"}',
        }
      );
      this.$nextTick(() => {
        this.banner.push(data.data);
      });
    },
    // 获取电影列表
    async getfilm(options) {
      let res = await this.$ajax.getList(
        { ...options },
        {
          "X-Host": "mall.film-ticket.film.list",
        }
      );
      this.$nextTick(() => {
        this.filmList = res.data.films;
        this.total = res.data.total;
        // console.log(this.filmList);
      });
    },
  },
  mounted() {
    // 判断当前用户是否定位城市信息
    if (this.city) {
      //调用电影列表信息
      this.getfilm({
        cityId: this.city.cityId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: this.type,
      });
      // 调用轮播图信息
      this.getbanner();
    } else {
      this.$dialog
        .alert({
          title: "友情提示",
          message: "请先定位选择附近电影院位置!!!",
          theme: "round-button",
        })
        .then(() => {
          // on close
          this.$router.push({ name: "city" });
        });
    }
  },
};
</script>

<style lang='scss' scoped>
.filmHome {
  padding-bottom: 50px;
  .swiper {
    .my-swipe {
      .himg {
        width: 100%;
        height: 200px;
      }
    }
  }
}
</style>