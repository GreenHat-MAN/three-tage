<template>
  <div class="box">
    <myheard title="用户注册" :back="true"></myheard>
    <div class="fom">
      <van-form @submit="onSubmit">
        <van-field
        clearable
          left-icon="friends-o"
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[
          { required: true, message: '请填写用户名' },
          {pattern:reg.user, message: '最低三位数,最高9位数'}
          ]"
        />
        <van-field
        clearable
          left-icon="phone-o"
          v-model="phone"
          name="phone"
          label="手机号"
          placeholder="手机号"
          :rules="[
          { required: true, message: '请填写手机号' },
          {pattern:reg.pho, message: '请输入正确的手机号'}
          ]"
        />
        <van-field
        clearable
        left-icon="passed"
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'regist',
  data() {
    return {
      username: "",
      password: "",
      phone:"",
      check: [],
      reg:{
        user:/^[a-z0-9_-]{3,9}$/,
        pho:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      }
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
      if (
        this.check.find((val) => {
          return val.username === values.username;
        })
      ) {
        this.$dialog
          .alert({
            message: "该用户已存在!!!",
          })
          .then(() => {
            this.$router.go(0);
          });
      } else {
        axios({
          url: "http://localhost:2206/login",
          method: "post",
          data: values,
        }).then(() => {
          this.$dialog
            .alert({
              message: "注册成功!!!",
            })
            .then(() => {
              this.$router.push({ name: "login" });
            });

        });
      }
    },
  },
  mounted() {
    axios.get("http://localhost:2206/login").then((res) => {
      // console.log(res.data);
      this.check = res.data;
    });
  },
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  height: 100%;
}
.back{
  font-size: 15px;
  color: red;
}
</style>