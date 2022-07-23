<template>
  <div>
    <hearder title="找回密码" :back="true"></hearder>

    <!-- 找回密码 -->
    <van-form 
            ref="vform"
            class="myform"
            @submit="onSubmit"
            @failed="onFailed"
        >
            <van-field
                v-model="form.phone"
                name="phone"
                label="手机号"
                placeholder="手机号"
                center
                clearable
                left-icon="phone-o"
                
                :rules="[
                    { required: true, message: '请填写手机号' },
                    {
                        pattern:reg.phones, message:'请输入正确的手机号'
                    }
                ]"
            ></van-field>
            <van-field
                v-model="form.captcha"
                center
                clearable
                label="验证码"
                placeholder="验证码"
                name="captcha"
                left-icon="apps-o"
                :rules="[
                    { required: true, message: '请填写验证码' },
                    {
                        pattern:reg.code, message:'请输入4位数字验证码'
                    }
                ]"
                >
                <template #button>
                    <van-button @click="sendCaptcha" v-if="flag" size="small" :disabled="!disabled" type="primary" native-type="button" >发送验证码</van-button>
                    <van-button v-else size="small" disabled type="danger" native-type="button" >剩余 {{count}} S</van-button>
                </template>
            </van-field>
            <van-field
                v-model="form.newpwd"
                name="newpwd"
                label="新密码"
                placeholder="请输入新密码"
                center
                clearable
                left-icon="phone-o"
                :rules="[
                    { required: true, message: '请输入新密码' },
                    {
                        pattern:reg.pwd, message:'请输入数字密码组合'
                    }
                ]"
            ></van-field>
            <div class="mr15">
                <van-button round block type="warning" native-type="submit">确认</van-button>
            </div>
            <div class="mr15">
                <van-button round block type="danger" native-type="button" @click="resetData">重置</van-button>
            </div>
    </van-form>

  </div>
</template>

<script>
let timer=null;
export default {
    name:'forget',
    data() {
      return {
        form:{},
        count:60,
        flag:true,
      }
    },
    computed:{
        disabled(){
            return this.reg.phones.test(this.form.phone)
        }
    },
    destroyed(){
        clearInterval(timer)
        timer=null;
    },
     methods:{
        timeDown(){
            this.count--;
            this.flag = false;
            timer = setInterval(()=>{
                if(this.count>0){
                    this.count--;
                    this.flag = false;
                }else{
                    clearInterval(timer)
                    timer=null;
                    this.flag = true;
                    this.count = 180;
                }
            },1000)
        },
        resetData(){
            this.form = {}
        },
        async getCaptcha(){
            let res = await this.$ajax.getLogin({phone:this.form.phone})
            if(res.length>0){
                // 发送验证码
                let res2 = await this.$ajax.sendCaptcha({phone:this.form.phone})
                .catch(err=>{
                     this.$toast.fail('发送失败');
                })
                if(res2 && res2.code==200){
                    this.$toast.success('发送成功');
                }else{
                    this.$toast.fail('发送失败');
                }
            }else{
                this.$toast('当前手机号未注册,请先去注册');
            }
        },
        sendCaptcha(){
            this.timeDown()
            this.getCaptcha()
        },
        async onSubmit(value){
            let data = await this.$ajax.getLogin({phone:value.phone})
            if(data.length>0){
                let res =  await this.$ajax.verifyCaptcha({
                    phone:value.phone,
                    captcha:value.captcha,
                }).catch(err=>{
                    this.$toast("验证失败")
                })
                if(res &&  res.code == 200){
                    // 修改密码 
                    let res2 = await this.$ajax.upDatepwd(data[0].id,{
                        password:value.newpwd,
                    })
                    this.$router.push({name:'login'})
                    this.$toast.success("找回密码成功")
                }else{
                    this.$toast("验证码验证失败")
                }

            }else{
                this.$toast("当前手机号未注册,请先去注册")
            }
        },
        onFailed(){
            this.$toast.fail("数据验证失败")
        },
    }

}
</script>

<style lang="scss" scoped>
.myform{
    padding:15px;
    .linkitems{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        .cm{
            color:#f50;
        }
        .co{
            color:#b5b5b5;
        }
    }
}
</style>