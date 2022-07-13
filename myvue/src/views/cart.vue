<template>
  <div>
    <h2>购物车页面</h2>
    <ol v-for="(item, i) in list" :key="i">
      <li>{{ item.goodsClass }}</li>
      <li>{{ item.goodsId }}</li>
      <li>{{ item.goodsName }}</li>
      <li>{{ item.goodsAddress }}</li>
      <li>{{ item.goodsStar }}</li>
      <li>{{ item.goodsImg }}</li>
      <li>{{ item.goodsSale }}</li>
    </ol>
  </div>
</template>

<script>
import axios from "axios";
// 设置请求路径的基本请求路径
axios.defaults.baseURL = "http://localhost:2206/";
export default {
  data() {
    return {
      list: [],
    };
  },

  methods: {
    // 请求数据

    getData() {
      axios({
        url: "/data",
        method: "GET",
      }).then((res) => {
        this.list = res.data.data.data;
      });
    },
  },

  mounted() {
    // 初始化数据
    this.getData();
  },
};
</script>

<style>
</style>