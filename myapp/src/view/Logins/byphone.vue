<template>
  <div>
    <div class="logo">
      <img :src="PIC" />
    </div>
    <van-form validate-first @submit="onSubmit">
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        left-icon="phone-o"
        v-model="value1"
        name="phone"
        label="手机号"
        clearable
        placeholder="请输入您的手机号"
        :rules="[{ pattern, message: '请输入正确内容' }]"
      />
      <!-- 短信 -->
      <van-field
        left-icon="envelop-o"
        v-model="sms"
        name="code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
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
import PIC from "../../../public/img/logo.png";
import axios from "axios";
export default {
  data() {
    return {
      PIC,
      value1:'',
      pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
      sms:''
    };
  },
  methods: {
    
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