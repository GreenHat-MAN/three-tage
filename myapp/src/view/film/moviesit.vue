<template>
  <!-- 购片跳转电影院选择 -->
  <div class="film" v-if="film">
    <myheard :title="film.name" :back="true"></myheard>
    

    <div class="nav">
      <van-tabs v-model="active" line-width="80px" line-height="2px"  animated swipeable  color="#f50" title-active-color="#f50">
        <van-tab :name="i" :title=" l.showDate  * 1000 | dateFormat " v-for="(l,i) in showCinemas" :key="i">
          <CList :list="cinemas" :filmId="film.filmId" :date="l.showDate"></CList>
        </van-tab>
      </van-tabs>
    </div>




  </div>
</template>

<script>
export default {
  name: "moviesit",
  data() {
    return {
      active: 0,
      film: null, // 电影
      showCinemas: [], // 播放日期
      cinemas: [], // 当前的时间的电影院
    };
  },
  methods: {
    async getInfo() {
      let res = await this.$ajax.getList(
        {
          filmId: this.$route.params.filmId,
        },
        {
          "X-Host": "mall.film-ticket.film.info",
        }
      );
      // console.log(res);
      this.film = res.data.film;
      // console.log(this.film);
    },
    async getshowCinemas() {
      let res = await this.$ajax.getList(
        {
          filmId: this.$route.params.filmId,
          cityId: this.city.cityId,
        },
        {
          "X-Host": "mall.film-ticket.cinema.film-show-cinema",
        }
      );
      this.showCinemas = res.data.showCinemas;
      this.getCinemaList(this.showCinemas[this.active].cinemaList);
      console.log(this.showCinemas);
    },
    async getCinemaList(cinemaIds) {
      let res = await this.$ajax.postList(
        {
          cityId: this.city.cityId,
          cinemaIds: cinemaIds.join(","),
        },
        {},
        {
          "X-Host": "mall.film-ticket.cinema.batch-cinema",
        }
      );
      this.cinemas = res.data.cinemas;
    },
  },
  watch: {
    active(v) {
      this.getCinemaList(this.showCinemas[v].cinemaList);
    },
  },
  mounted() {
    this.getInfo();
    this.getshowCinemas()
  },
};
</script>

<style>
</style>