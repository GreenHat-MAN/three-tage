<template>
  <div>
    <div class="logo">
      <img :src="PIC" />
    </div>
    <div class="fom">
      <van-form @submit="onSubmit">
        <van-field
          left-icon="friends-o"
          clearable
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          clearable
          left-icon="passed"
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
      <van-button
        class="reg"
        @click="toregist"
        round
        block
        type="warning"
        native-type="submit"
        >注册</van-button
      >
    </div>
    <div class="linkitems">
      <router-link class="cm" :to="{ name: 'findPass' }"
        >忘记密码,去找回?</router-link
      >
    </div>
  </div>
</template>

<script>
import PIC from "../../../public/img/logo.png";
import axios from "axios";
export default {
  data() {
    return {
      PIC,
      username: "",
      password: "",
      check: [],
    };
  },
  methods: {
    toregist() {
      this.$router.push({ name: "regist" });
    },
    async onSubmit(values) {
      // console.log(values);
      let res = await this.$ajax.getLogin(values);
      // console.log(res);
      if (
        res.find((items) => {
          return (
            items.username === values.username &&
            items.password === values.password
          );
        })
      ) {
        // console.log('登录成功');
        // this.$notify({ type: "success", message: "登录成功" });
        localStorage.setItem("phone", res[0].phone);
        localStorage.setItem("username", values.username);
        this.$router.push({ name: "mine" });
      } else {
        // console.log('账号密码不正确!!!');
        this.$notify({ type: "danger", message: "账号密码不正确!!!" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
::v-deep .reg {
  width: 92%;
  margin-left: 16px;
}
.linkitems {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  .cm {
    color: #f50;
  }
  .co {
    color: #b5b5b5;
  }
}
</style>