<template>
  <van-tabbar
    v-model="active"
    active-color="#ff5f16"
    inactive-color="#999"
    route
    :border="true"
  >
    <van-tabbar-item replace :badge="l.hot?9:null"  v-for="(l,i) in FooterList" :key="i" :to="{name:l.name}">
      <span>{{l.text}}</span>
      <template #icon="props">
        <i class="iconfont" :class="l.icon"></i>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "footers",
  data() {
    return {
      active: '',
    };
  },
};
</script>

<style>
</style>