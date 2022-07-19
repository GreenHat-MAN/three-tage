<template>
  <!-- 购片跳转电影院选择 -->
  <div class="film" v-if="film">
    <myheard :title="film.name" :back="true"></myheard>
  </div>
</template>

<script>
export default {
  name: "moviesit",
  data() {
    return {
      film: null,
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
      this.film = res.data.film;
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style>
</style>