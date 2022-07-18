<template>
  <div>
    <div class="logo">
      <img :src="PIC" />
    </div>
    <van-form validate-first @submit="onSubmit">
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        left-icon="phone-o"
        v-model="phone"
        name="phone"
        label="手机号"
        clearable
        placeholder="请输入您的手机号"
        :rules="[{ pattern, message: '请输入正确内容' }]"
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
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
let timer = null;
import PIC from "../../../public/img/logo.png";
export default {
  data() {
    return {
      PIC,
      phone: "",
      pattern:
        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
      captcha: "",
      falg: true,
      count: 60,
    };
  },
  methods: {
    async onSubmit(values) {
      // 验证登录信息
      console.log(values);
      let data = await this.$ajax.getLogin({ phone: this.phone });
      if (data.length > 0) {
        let res = await this.$ajax.verifyCaptcha(values).catch((err) => {
          this.$toast.fail("验证失败");
        });
        if (res && res.code == 200) {
          this.$toast.success("验证成功");
          this.$router.push({ name: "mine" });
          localStorage.setItem("phone", values.phone);
          localStorage.setItem("username", data[0].username);
        }else{
          this.$toast.fail('验证失败');
        }
      }else{
        this.$toast('当前手机号未注册,请先去注册');
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
</style>