<template>
  <div>
    <hearder title="Retrieve password" :back="true"></hearder>

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
                label="phone"
                placeholder="phone"
                center
                clearable
                left-icon="phone-o"
                
                :rules="[
                    { required: true, message: 'Please fill in your mobile number' },
                    {
                        pattern:reg.phones, message:'Please enter the correct mobile number'
                    }
                ]"
            ></van-field>
            <van-field
                v-model="form.captcha"
                center
                clearable
                label="code"
                placeholder="code"
                name="captcha"
                left-icon="apps-o"
                :rules="[
                    { required: true, message: 'Please fill in the verification code' },
                    {
                        pattern:reg.code, message:'Please enter a 4-digit verification code'
                    }
                ]"
                >
                <template #button>
                    <van-button @click="sendCaptcha" v-if="flag" size="small" :disabled="!disabled" type="primary" native-type="button" >Sendcode</van-button>
                    <van-button v-else size="small" disabled type="danger" native-type="button" >surplus{{count}} S</van-button>
                </template>
            </van-field>
            <van-field
                v-model="form.newpwd"
                name="newpwd"
                label="newpwd"
                placeholder="Please enter a new password"
                center
                clearable
                left-icon="phone-o"
                :rules="[
                    { required: true, message: 'Please enter a new password' },
                    {
                        pattern:reg.pwd, message:'Please enter a digital password combination'
                    }
                ]"
            ></van-field>
            <div class="mr15">
                <van-button round block type="warning" native-type="submit">confirm</van-button>
            </div>
            <div class="mr15">
                <van-button round block type="danger" native-type="button" @click="resetData">Reset</van-button>
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
                     this.$toast.fail('fail in send');
                })
                if(res2 && res2.code==200){
                    this.$toast.success('Sent successfully');
                }else{
                    this.$toast.fail('fail in send');
                }
            }else{
                this.$toast('The current mobile number is not registered, please register first');
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
                    this.$toast("Validation failed")
                })
                if(res &&  res.code == 200){
                    // 修改密码 
                    let res2 = await this.$ajax.upDatepwd(data[0].id,{
                        password:value.newpwd,
                    })
                    this.$router.push({name:'login'})
                    this.$toast.success("Password retrieved successfully")
                }else{
                    this.$toast("Verification code verification failed")
                }

            }else{
                this.$toast("The current mobile number is not registered, please register first")
            }
        },
        onFailed(){
            this.$toast.fail("Data validation failed")
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