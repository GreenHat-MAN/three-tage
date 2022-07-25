<template>
  <div class="box">
    <hearder title="登录bilibili" :back="false"></hearder>

    <!-- 地区选择 -->
    <div class="choses">
      <!-- 区域选择 -->
      <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="地区"
        placeholder="请选择所在地区"
        @click="show = true"
      />
      <van-popup v-model="show" round position="bottom">
        <van-cascader
          v-model="cascaderValue"
          title="请选择所在地区"
          :options="options"
          @close="show = false"
          @change="onChange"
          @finish="onFinish"
        />
      </van-popup>
    </div>

    <!-- 登录框 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        center
        clearable
        :label="countryNum"
        name="phone"
        placeholder="请输入常用手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: reg.phones, message: '请输入正确的手机号' },
        ]"
      >
        <template #button>
          <van-button
            v-if="flag"
            size="small"
            plain
            type="primary"
            :disabled="!disabled"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-button
            v-else
            size="small"
            plain
            disabled
            type="primary"
            @click="sendCode"
            >{{ count }}S后重试</van-button
          >
        </template>
      </van-field>
      <van-field
        v-model="code"
        clearable
        label="验证码"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: reg.code, message: '请输入4位数的验证码' },
        ]"
      />
      <div style="margin: 16px" class="tobtn">
        <van-button round block type="info" native-type="submit"
          >登录/注册</van-button
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
let timer = null;
export default {
  name: "phone",
  data() {
    return {
      show: false,
      fieldValue: "中国大陆",
      cascaderValue: "",
      countryNum: "+86",
      phone: "",
      code: "",
      flag: true,
      count: 60,
      options: [
        {
          text: "中国大陆",
          value: "+86",
          children: [],
        },
        {
          text: "中国香港特别行政区",
          value: "+852",
        },
        {
          text: "中国澳门特别行政区",
          value: "+863",
        },
        {
          text: "中国台湾",
          value: "+886",
        },
        {
          text: "美国",
          value: "+1",
        },
        {
          text: "日本",
          value: "+81",
        },
      ],
    };
  },

  // 验证码的计算属性改变选中状态
  computed: {
    disabled() {
      return this.reg.phones.test(this.phone);
    },
  },

  methods: {

    // 验证码倒计时
    codeTime() {
      this.flag = false;
      this.count--;
      timer = setInterval(() => {
        if (this.count > 0) {
          this.count--;
          this.flag = false;
        } else {
          clearInterval(timer);
          timer = null;
          this.count = 60;
          this.flag = true;
        }
      }, 1000);
    },

    // 发送验证码
    async sendCode() {
      this.codeTime();
      // 根据手机号查询当前用户是否注册
      let res=await this.$ajax.getLogin({phone:this.phone});
      if(res.length>0){
        let data=await this.$ajax.sendCaptcha({phone:this.phone})
        .catch(err=>{
        this.$toast.fail('发送失败')
        });
        if(data && data.code==200){
            this.$toast.success('验证码已发送');
        }else{
            this.$toast.fail('发送失败');
        }
      }else{
        this.$toast.fail('该手机号还未注册,请先去注册!!!')
      }
    },

    // 验证登录信息
    async onSubmit(values) {
      // console.log(values.code);
      let data=await this.$ajax.getLogin({phone:values.phone});
      if(data.length>0){
        // 校验验证码
        let res=await this.$ajax.verifyCaptcha({phone:values.phone,captcha:values.code}).catch(err=>{
            this.$toast.fail('验证失败');
        })
        if(res && res.code==200){
            this.$toast.success('验证成功');
            if(this.fromName=='regist'||this.fromName=='forget'){
               this.$router.push({name:'mine'})
            }else{
               this.$router.go(-1);
            }
            // this.$router.push({name:'mine'})
            localStorage.setItem('phone',values.phone)
            localStorage.setItem('username',data[0].username)
        }else{
          this.$toast.fail('验证失败');
        }
      }else{
        this.$toast('当前手机号未注册,请先去注册');
      }
    },

    // 地区变更
    onChange({ value }) {
      if (value === this.options[0].value) {
        setTimeout(() => {
          this.options[0].children = [
            { text: "你家", value: "000001" },
            { text: "隔壁老王家", value: "000002" },
          ];
        }, 500);
      }
    },

    // 确认地区信息
    onFinish({ selectedOptions }) {
      this.show = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join("/");
      this.countryNum = selectedOptions.map((option) => option.value).join("/");
    },

  },

  // 销毁定时器
  destroyed() {
    timer = null;
    clearInterval(timer);
  },

};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  .choses {
    :deep(.van-cell){
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
  :deep(.van-button){
    border: none;
    color: #fb7299;
    font-size: 14px;
    border-left: 1px solid #e7e7e7;
  }
  .tobtn {
    :deep(.van-button){
      background: #ff9db5;
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