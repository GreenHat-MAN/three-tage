<template>
  <div>
    <myheard title="资讯" :back="false"></myheard>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "", // 页面内容
    };
  },
  methods: {
    async getPageContent() {
      let res = await this.$ajax.getList(
        {
          actId: "ElzMZU125260",
        },
        {
          "X-Host": "mall.act.static-page.info",
        }
      );
      this.content = res.data.data.content;
    },
  },
  mounted() {
    this.getPageContent();
  },
};
</script>

<style lang="scss" scoped>
.content{
    width:100%;
    height:100%;
}
</style>