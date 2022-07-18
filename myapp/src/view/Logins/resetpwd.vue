<template>
  <div>
    <myheard title="修改密码" :back="true"></myheard>
    <van-form
      ref="vform"
      class="myform"
      @submit="LoginSubmit"
      @failed="LoginFail"
    >
      <van-field
        clearable
        left-icon="passed"
        v-model="oldpwd"
        type="oldpwd"
        name="oldpwd"
        label="旧密码"
        placeholder="旧密码"
        :rules="[{ required: true, message: '请填写旧密码' }]"
      />

      <van-field
        clearable
        left-icon="passed"
        v-model="newpwd"
        type="newpwd"
        name="newpwd"
        label="新密码"
        placeholder="新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
      />

      <van-field
        clearable
        left-icon="passed"
        v-model="conpwd"
        type="conpwd"
        name="conpwd"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写确认密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >现在修改</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "resetpwd",
  data() {
    return {
      oldpwd: "",
      newpwd: "",
      conpwd: "",
      data: null,
    };
  },
  methods: {
    LoginFail() {},
    async LoginSubmit(values) {
    //   console.log(this.data);
      if (this.data[0].password == values.oldpwd) {
        if (values.newpwd === values.conpwd) {
          this.$ajax.upDatepwd(this.data[0].id, {
            password: values.newpwd,
          });
          this.$toast.success("修改成功");
          localStorage.removeItem("username");
          localStorage.removeItem("phone");
          this.changeUserInfo(null);
          this.$router.push({ name: "login" });
        } else {
          this.$toast.fail("新密码两次输入不一致");
        }
      } else {
        this.$toast.fail("旧密码不正确");
      }
      // let data=await this.$ajax.getLogin({password:values.oldpwd})
    },
    async getuser(username) {
      let res = await this.$ajax.getLogin({ username });
      // console.log(res);
      this.data = res;
    },
  },
  mounted() {
    this.getuser(localStorage.getItem("username"));
  },
};
</script>


<style lang="scss" scoped>
.myform {
  padding: 15px;
  .linkitems {
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
}
</style>