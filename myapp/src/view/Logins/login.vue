<template>
  <div class="box">
    <h1>登录界面</h1>
    <div class="logo">
      <img :src="PIC" />
    </div>
    <div class="fom">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
          <van-button class="reg" @click="toregist" round block type="info" native-type="submit"
            >注册</van-button
          >
    </div>
  </div>
</template>

<script>
import PIC from "../../../public/img/logo.png";
import axios from "axios";
export default {
  name:'login',
  data() {
    return {
      PIC,
      username: "",
      password: "",
      check: [],
    };
  },
  mounted() {
    axios.get("http://localhost:2206/login").then((res) => {
      // console.log(res.data);
      this.check = res.data;
    });
  },
  methods: {
    toregist(){
      // console.log('123');
      this.$router.push({name:'regist'});
    },
    onSubmit(values) {
      console.log("前端submit" + values.username, values.password);
      if (
        this.check.find((val) => {
          return (
            val.username === values.username && val.password === values.password
          );
        })
      ) {
        this.$dialog
          .alert({
            message: "登录成功!!!",
          })
          .then(() => {
            this.$router.push({ name: "main" });
          });
      } else {
        this.$dialog
          .alert({
            message: "用户名或密码错误!!!",
          })
          .then(() => {
            this.$router.go(0);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
}
.logo {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
  }
}
::v-deep .reg{
  width: 92%;
  margin-left: 16px;
}
</style>