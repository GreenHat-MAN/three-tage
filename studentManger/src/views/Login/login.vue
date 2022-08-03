<template>
    <div class="loginbody">
        <div class="logindata">

            <div class="logintext">
                <h2>Welcome</h2>
            </div>

            <div class="formdata">
                <el-form 
                :label-position="labelPosition" 
                label-width="100px" 
                :model="model" 
                style="max-width: 460px"
                ref="formRef" 
                :rules="rules"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="model.username" clearable placeholder="请输入账号" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="model.password" clearable placeholder="请输入密码" />
                    </el-form-item>

                    <div class="tool">
                        <div>
                            <el-form-item>
                                <el-checkbox v-model="checked" @change="remenber">记住密码</el-checkbox>
                            </el-form-item>

                        </div>
                        <div>
                            <el-form-item><span class="shou" @click="forgetpas">忘记密码？</span></el-form-item>

                        </div>
                    </div>
                    <div class="butt">
                        <el-form-item>
                            <el-button type="primary" @click="toLogin">登录</el-button>
                            <el-button class="shou" @click="toRegist">注册</el-button>
                        </el-form-item>

                    </div>


                </el-form>
            </div>



        </div>
    </div>
</template>


<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'
import { Ajax } from '../../api/index.js';
import { reg } from '../../utils/validate.js';
const labelPosition = ref('left')
const model = ref({})
const formRef = ref()
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: reg.pwd, message: '请输入6-16位的数字字母组合的密码', trigger: 'blur' }
    ],
})

const checked = ref(false)

const forgetpas = () => {
    router.push({ name: 'findpass' })
}

const router = useRouter()
const route = useRoute()

const remenber = () => {
    console.log(checked.value);
}


const toRegist = () => {
    router.push({ name: 'regist' })
}

const toLogin = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            // console.log(checked.value);
            let res = await Ajax.logins(model.value)
            if (res.code == 200 && checked.value==true) {
                localStorage.setItem('wh_username',res.ressult.stuName)
                localStorage.setItem('wh_phone',res.ressult.stuPhone)
                sessionStorage.setItem("wh_token",res.token)
                router.push({ name: 'main' })
                // console.log(checked.value);
            }else if(res.code == 200){
                router.push({ name: 'main' })
            }
            // console.log(model.value);
        } else {
            ElMessage({
                showClose: true,
                message: '请输入有效的登录信息',
                type: 'error',
            })
        }
    })
    // console.log(model.value);
}

onMounted(() => {
    if (route.query.username) {
        model.value = {
            ...model.value,
            username: route.query.username
        }
    } else {
        model.value = {
            ...model.value,
            username: localStorage.getItem("wh_username")
        }
    }
})

</script>

<style lang="scss" scoped>
#app {
    margin: 0 !important;
    padding: 0 !important;
}

.loginbody {
    min-width: 100%;
    min-height: 100%;
    height: auto;
    width: auto;
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-image: url("../../assets/images/login.jpg");
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;
    background-repeat: no-repeat;
    line-height: 100%;
    padding-top: 150px;
}

.logintext {
    margin-bottom: 20px;
    line-height: 50px;
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    color: white;
    text-shadow: 2px 2px 4px #000000;
}

.logindata {
    width: 400px;
    height: 300px;
    transform: translate(-50%);
    margin-left: 50%;
}

.tool {
    display: flex;
    justify-content: space-between;
    color: #606266;
}

.butt {
    margin-top: 10px;
    text-align: center;
}

.shou {
    cursor: pointer;
    color: #606266;
}
</style>