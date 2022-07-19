<template>
  <div class="cinema">
    <myheard title="电影院" :back="false">
      <span
        v-if="city"
        @click="gotowhere({ name: 'city', query: { name: city.name } })"
      >
        {{ city.name }} <van-icon name="arrow-down" color="#000"
      /></span>
      <span v-else></span>
    </myheard>
    <div class="cinlist">
      <!-- <CList :list="cinemaList"></CList> -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async getAllCinemas() {
      let res = await this.$ajax.getList(
        {
          cityId: this.city.cityId,
        },
        {
          "X-Host": "mall.film-ticket.cinema.list",
        }
      );

      this.changeCinemaList(res.data.cinemas); //vuex 数据
    },
  },
  mounted() {
    if (this.city) {
      this.getAllCinemas();
    } else {
      this.$dialog
        .alert({
          title: "友情提示",
          message: "你还没有定位,请先去定位哦.",
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

<style lang="scss" scoped>
.cinlist {
  padding-bottom: 49px;
}
</style>