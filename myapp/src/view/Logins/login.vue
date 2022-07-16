<template>
  <div class="box">
    <myheard title="用户登录" :back="true"></myheard>
    <van-tabs
      v-model="active"
      animated
      swipeable
      title-active-color="#f50"
      title-inactive-color="#999"
      color="#f50"
    >
      <van-tab title="账号登录" name="username">
        <byname/>
      </van-tab>
      <van-tab title="手机登录" name="phone">
        <byphone/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import byname from './byname.vue';
import Byphone from './byphone.vue';
export default {
  components: { byname, Byphone },
  name: "login",
  data() {
    return {
      active:"username"
    };
  },
  
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
}

</style>