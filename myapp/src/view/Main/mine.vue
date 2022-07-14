<template>
  <div>
    <!-- <h1>我的</h1> -->
    <div class="bugImg">
      <p class="login" @click="goLogin">立即登录</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    goLogin(){
      this.$router.push({name:'login'})
    }
  },
};
</script>

<style scoped>
.bugImg {
  width: 100%;
  height: 150px;
  background-image: url("../../../public/img/背景图.png");
}
.login {
  font-size: 15px;
  line-height: 150px;
  color: white;
}
</style>