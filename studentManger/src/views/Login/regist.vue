<template>
    <div class="lgbox">
        <video 
            :src="vSrc"
            muted
            autoplay
            class="myvideo"
        ></video>
        <div class="login-box">
            <h2 class="title">欢迎注册账号</h2>
            <div class="box">
                <el-form
                    label-position="right"
                    label-width="100px"
                    :model="model"
                    ref="formRef"
                    class="myform"
                    status-icon 
                    :rules="rules"
                    :size="formSize"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input :prefix-icon="User" v-model="model.username" autocomplete="off" clearable placeholder="请输入用户名"  />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input :prefix-icon="Phone" v-model="model.phone" autocomplete="off" clearable placeholder="请输入手机号"  />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input :prefix-icon="Unlock" @blur="validatePass" show-password  clearable  autocomplete="off" type="password" v-model="model.password" placeholder="请输入密码"  />
                    </el-form-item>
                    <el-form-item label="确认密码" prop="dbpass">
                        <el-input :prefix-icon="Unlock" show-password clearable  autocomplete="off" type="password" v-model="model.dbpass" placeholder="请输入确认密码"  />
                    </el-form-item>
                    <el-form-item class="lastitem">
                        <div class="alinks">
                            <router-link :to="{name:'login'}" class="litem color">有账号,去登录?</router-link>
                            <router-link :to="{name:'findpass'}"  class="litem bg ">忘记密码</router-link>
                        </div>
                    </el-form-item>
                    <el-form-item class="lastitem">
                        <el-button @click="submitForm" type="primary" class="btnblock">注册账号</el-button>
                        <el-button @click="resetForm" type="danger" class="btnblock" >重置数据</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import {Phone,User,Unlock} from '@element-plus/icons-vue'
import { reg } from '../../utils/validate.js';
import { ElMessage } from 'element-plus' 
import { Ajax } from '../../api/index.js';
import { useRouter } from 'vue-router';
const vSrc = ref('https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/3760b2031ff41ca0bd80bc7a8a13f7bb_preview.mp4')
const model = ref({
    role:1, // 学员 
})
const formRef = ref()
const router = useRouter()
// 比较两次密码一致 
const chechPassEqual =  (rule, value,callback) => {
    console.log(model.password)
    console.log(value)
    if(value!==model.value.password){
        callback(new Error("两次密码不匹配"))
    }else{
        callback()
    }
}
// 密码框失焦 
const validatePass = ()=>{
    if(reg.pwd.test(model.value.password)&& reg.pwd.test(model.value.dbpass)){
        formRef.value.validateField("dbpass")  // 调起确认密码的正则 
    }
}
// 正则 
const rules = reactive({
    username:[
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    phone:[
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern:reg.phone,message: '请输入有效的11位手机号', trigger: 'blur'  }
    ],
    password:[
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern:reg.pwd,message: '请输入6-16位的数字字母组合的密码', trigger: 'blur'  }
    ],
    dbpass:[
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        { pattern:reg.pwd,message: '请输入6-16位的数字字母组合的密码', trigger: 'blur'  },
        {
            validator:chechPassEqual, trigger: 'blur' 
        }
    ]
})
const formSize = ref('default')
const resetForm = ()=>{
    formRef.value.resetFields()
}
const submitForm = ()=>{
    formRef.value.validate(async valid=>{
        console.log(valid)
        if(valid){
            // 注册账号
            let {code,result} = await Ajax.register(model.value)
            if(code==200){
                router.push({name:'login',query:model.value})
            }
        }else{
            ElMessage({
                showClose: true,
                message: '请输入正确的注册账号信息',
                type: 'error',
            })
        }
    })
}
const testApi = async ()=>{
    let res = await Ajax.testApi()
}
onMounted(()=>{
    console.log(formRef)
    testApi()
})
</script>