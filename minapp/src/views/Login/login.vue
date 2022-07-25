<template>
  <div class="box">
    <hearder title="登录bilibili" :back="false"></hearder>

    <div class="boxs"></div>

    <!-- 登录框 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="账号"
        placeholder="你的手机号/邮箱"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <router-link :to="{ name: 'forget' }" class="forget">
        <p class="p1">忘记密码</p>
      </router-link>
      <div style="margin: 16px" class="btn">
        <van-button block size="normal" type="info" native-type="submit"
          >登录</van-button
        >
        <router-link :to="{ name: 'regist' }" class="regist">注册</router-link>
      </div>
    </van-form>

    <!-- 条款 -->
    <p class="p2">
      未注册过哔哩哔哩的手机号，我们将自动帮你注册账号<br />
      登录或完成注册即代表你同意<a>用户协议</a>和<a>隐私政策</a>
    </p>

  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {

    //登录方法
    async onSubmit(values) {
      // console.log(values);
      let res = await this.$ajax.getLogin(values);
      console.log(res);
      if (res.length > 0) {
        this.$toast.success("登录成功");
        if (
          this.fromName == "regist" || this.fromName == "forget"
        ) {
          this.$router.push({ name: "mine" });
        } else {
          this.$router.go(-1);
        }
        localStorage.setItem("username", values.username);
        localStorage.setItem("phone", res[0].phone);
        let res2 = await this.$ajax.getLogin({ username:values.username });
        this.changeUserInfo(res2[0]); //全局的vuex
        // this.$router.push({ name: "mine" });
      } else {
        this.$notify({
          message: "密码错误",
          color: "#ad0000",
          background: "#ffe1e1",
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
  .boxs {
    width: 100%;
    height: 20px;
  }
  .forget {
    color: #fb7299;
    text-decoration: none;

    p {
      text-align: right;
      font-size: 14px;
      margin: 10px 5px 20px 0;
    }
  }
  .btn {
    :deep(.van-button){
      margin-right: 0;
      border: 1px solid #ff9db5;
      background: #ff9db5;
      float: left;
      color: #fff;
      height: 1.173333rem;
      width: 4.333333rem;
      text-align: center;
      line-height: 1.12rem;
      font-size: 0.373333rem;
      cursor: pointer;
      border-radius: 0.106667rem;
      display: inline-block;
      box-sizing: border-box;
      padding: 0 0.266667rem;
      margin-right: 8px;
    }
    .regist {
      float: left;
      width: 4.333333rem;
      margin-right: 0.266667rem;
      border: 1px solid #fb7299;
      color: #fb7299;
      height: 1.173333rem;
      min-width: 2.346667rem;
      text-align: center;
      line-height: 1.12rem;
      font-size: 0.373333rem;
      cursor: pointer;
      border-radius: 0.106667rem;
      display: inline-block;
      box-sizing: border-box;
      padding: 0 0.266667rem;
    }
  }
  .p1,p {
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.426667rem;
    margin: 2.3rem auto 0;
    color: #ff9db5;
  }
  .p2{
    color: #ccc;
  }
  a {
    text-decoration: none;
    color: #ff9db5;
  }
}
</style>