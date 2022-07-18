<template>
  <div>
    <myheard title="找回密码" :back="true"></myheard>
    <div class="find">
      <van-form validate-first @submit="onSubmit">
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          left-icon="phone-o"
          v-model="phone"
          name="phone"
          label="手机号"
          clearable
          placeholder="请输入您的手机号"
          :rules="[
            { pattern, message: '请输入正确内容' },
            { required: true, message: '请填写该账号下的手机号' },
          ]"
        />
        <!-- 短信 -->
        <van-field
          left-icon="envelop-o"
          v-model="captcha"
          name="captcha"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              v-if="falg"
              @click="sendCode"
              size="small"
              :disabled="!toDisable"
              type="primary"
              native-type="button"
              >发送验证码</van-button
            >
            <van-button v-else size="small" disabled type="primary"
              >{{ count }} S 后可发送</van-button
            >
          </template>
          <!-- 新密码 -->
        </van-field>
        <van-field
          left-icon="phone-o"
          v-model="newpwd"
          name="newpwd"
          label="新密码"
          clearable
          placeholder="请输入您的新密码"
          :rules="[{ required: true, message: '请填写您的新密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >快快找回</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
let timer = null;
export default {
  name: "findPass",
  data() {
    return {
      newpwd: "",
      phone: "",
      captcha: "",
      falg: true,
      pattern:
        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
      count: 60,
    };
  },

  computed: {
    toDisable() {
      return this.pattern.test(this.phone);
    },
  },
  destroyed() {
    clearInterval(timer);
    timer = null;
  },
  methods: {
    async onSubmit(values) {
      // 验证登录信息
      // console.log(values);
      let data = await this.$ajax.getLogin({ phone: this.phone });
      if (data.length > 0) {
        // console.log(data[0].id);
        let res = await this.$ajax.verifyCaptcha({phone:values.phone,captcha:values.captcha}).catch((err) => {
          this.$toast.fail("验证失败");
        });
        if (res && res.code == 200) {
          this.$toast.success("恭喜找回密码");
          this.$router.push({ name: "login" });
          localStorage.setItem("phone", values.phone);
          localStorage.setItem("username", data[0].username);
        } else {
          this.$toast.fail("验证失败");
        }
        this.$ajax.upDatepwd(data[0].id,{
          password: values.newpwd,
        });
      } else {
        this.$toast("当前手机号未注册,请先去注册");
      }
    },
    countdown() {
      this.count--;
      this.falg = false;
      timer = setInterval(() => {
        if (this.count > 0) {
          this.count--;
          this.falg = false;
        } else {
          clearInterval(timer);
          timer = null;
          this.count = 60;
          this.falg = true;
        }
      }, 1000);
    },
    async checkPhone() {
      // 判断手机号是否注册
      // console.log(this.phone);
      let data = await this.$ajax.getLogin({ phone: this.phone });
      // console.log(data);
      if (data.length > 0) {
        //说明不存在
        let res = await this.$ajax
          .sendCaptcha({ phone: this.phone })
          .catch((err) => {
            this.$toast.fail("发送失败");
          });
        // console.log(res);
        if (res && res.code == 200) {
          this.$toast.success("发送成功");
        } else {
          this.$toast.fail("发送失败");
        }
      } else {
        this.$toast("当前手机号未注册,请先去注册");
      }
    },
    sendCode() {
      this.countdown();
      // 发送请求获取验证码
      this.checkPhone();
    },

    // 修改账号密码
    async updatepwd() {},
  },
};
</script>

<style>
</style>