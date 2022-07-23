<template>
  <div class="box">
    <hearder title="加入叔叔的怀抱" :back="true"></hearder>
    <div class="boxs"></div>

    <!-- 注册框信息 -->
    <van-form @submit="onSubmit" @failed="onFailed" ref="vform" class="myform">
      <van-field
        v-model="form.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        left-icon="smile-o"
        clearable
        center
      />
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: reg.phones, message: '请填写正确的手机号' },
        ]"
        left-icon="phone-o"
        clearable
        center
      />
      <van-field
        v-model="form.password"
        :type="type"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: reg.pwd, message: '请填写6-16位数字字母组合的密码' },
        ]"
        left-icon="warn-o"
        :right-icon="type == 'text' ? 'eye' : 'closed-eye'"
        @click-right-icon="changetype"
        clearable
        center
      ></van-field>
      <div class="tobtn">
        <van-button round block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
      <div class="tobtn">
        <van-button round block type="danger" native-type="reset"
          >重置</van-button
        >
      </div>
    </van-form>

    <!-- 条款 -->
    <p>
      未注册过哔哩哔哩的手机号，我们将自动帮你注册账号<br />
      登录或完成注册即代表你同意<a>用户协议</a>和<a>隐私政策</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "regist",

  data() {
    return {
      form: {
        username: "",
      },
      type: "password",
    };
  },

  methods: {
    // 改变密码状态查看
    changetype() {
      this.type = this.type == "password" ? "text" : "password";
    },

    //用户输入信息的完整性
    onFailed() {
      console.log("onFailed");
      this.$notify({
        message: "请输入有效的注册数据信息",
        color: "#ad0000",
        background: "#ffe1e1",
      });
    },

    // 注册功能的实现
    async onSubmit(values) {
      // console.log(values);
      let res1 = await this.$ajax.getLogin({ username: values.username });
      let res2 = await this.$ajax.getLogin({ phone: values.phone });
      if (res1.length > 0 || res2.length > 0) {
        this.$notify({
          message: "用户名或者手机号已经被注册",
          color: "#ad0000",
          background: "#ffe1e1",
        });
      } else {
        let res3 = await this.$ajax.addLogin(values);
        this.$toast("注册成功");
        this.$router.push({ name: "login" });
      }
    },

  },
};
</script>


<style  lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  .boxs {
    width: 100%;
    height: 20px;
  }
  .tobtn {
    ::v-deep .van-button {
      margin: 25px 30px;
      border: 1px solid #fff;
      background: #ff9db5;
      height: 1.173333rem;
      min-width: 2.346667rem;
      width: 300px;
      text-align: center;
      line-height: 1.12rem;
      font-size: 0.373333rem;
      cursor: pointer;
      border-radius: 0.106667rem;
      display: inline-block;
      box-sizing: border-box;
      padding: 0 0.266667rem;
      color: #fff;
    }
  }
  p {
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.426667rem;
    margin: 0.64rem auto 0;
    color: #757575;
  }
  a {
    text-decoration: none;
    color: #ff9db5;
  }
}
</style>