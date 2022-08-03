<template>
    <el-header class="heard">

        <el-row class="headrow">
            <el-col class="elitem" :span="7">
                <el-icon class="icons" :size="20">
                    <Fold />
                </el-icon>
                <h3>Nerve stimulating management system</h3>
            </el-col>
            <el-col class="elitem" :span="8" :offset="1">
                <marquee behavior="" direction="">
                    <div class="flex">
                        <h2>只要卷不死 就往死里卷</h2>
                        <h2>As long as you don't die, you'll die</h2>
                    </div>
                </marquee>
            </el-col>
            <!-- <el-tag>
                {{ userInfo.role }}
            </el-tag>
            <span>头像</span> -->
            <el-col class="elitem" :span="7" :offset="1">
                <div class="info" v-if="userInfo">

                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{ userInfo.stuName }}
                            <el-icon class="el-icon--right">
                                <ArrowDownBold />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="info">信息</el-dropdown-item>
                                <el-dropdown-item command="ads">公告</el-dropdown-item>
                                <el-dropdown-item command="advise">意见</el-dropdown-item>
                                <el-dropdown-item command="mine">首页</el-dropdown-item>
                                <el-dropdown-item command="changepass">修改密码</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>



                    <el-tooltip class="box-item" effect="dark" content="注销登录" placement="bottom">
                        <el-button @click="logoutAction" type="danger" :icon="SwitchButton" circle />
                    </el-tooltip>

                </div>
            </el-col>
        </el-row>

    </el-header>

    <el-dialog v-model="dialogVisible" title="修改密码" width="30%" :before-close="handleClose">
        <span>
            <el-form label-position="top" :model="model" ref="formRef" class="myform" status-icon :rules="rules"
                size="default">
                <el-form-item label="旧密码" prop="oldpass">
                    <el-input :prefix-icon="Unlock" disabled :value="userInfo.stuPassword" clearable autocomplete="off"
                        type="text" v-model="model.oldpass" placeholder="请输入旧密码" />
                </el-form-item>
                <el-form-item label="新密码" prop="newpass">
                    <el-input :prefix-icon="Unlock" @blur="checkdbnewpass" show-password clearable autocomplete="off"
                        type="password" v-model="model.newpass" placeholder="请输入新密码" />
                </el-form-item>
                <el-form-item label="确认新密码" prop="dbnewpass">
                    <el-input :prefix-icon="Unlock" show-password clearable autocomplete="off" type="password"
                        v-model="model.dbnewpass" placeholder="请输入确认新密码" />
                </el-form-item>
            </el-form>
        </span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="changpwd">Confirm</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { Fold, ArrowDownBold, Unlock, SwitchButton } from '@element-plus/icons-vue'
import { useStore } from 'vuex';
import { ElMessage,ElMessageBox } from 'element-plus'
import { reg } from '../../utils/validate.js';
import { Ajax } from '../../api/index.js';
import { useRouter } from 'vue-router';
const model = reactive({})

const router = useRouter()

const formRef = ref()

const store = useStore()

const userInfo = computed(() => store.state.userInfo)

const dialogVisible = ref(false)

const chechPassEqual = (rule, value, callback) => {
    // console.log(model.newpass)
    if (value !== model.newpass) {
        callback(new Error("两次密码不匹配"))
    } else {
        callback()
    }
}

const rules = reactive({
    newpass: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: reg.pwd, message: '请输入6-16位的数字字母组合的密码', trigger: 'blur' }
    ],
    dbnewpass: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        { pattern: reg.pwd, message: '请输入6-16位的数字字母组合的密码', trigger: 'blur' },
        {
            validator: chechPassEqual, trigger: 'blur'
        }
    ]
})



const handleCommand = (command) => {
    // console.log(command);
    if (command == 'changepass') {
        dialogVisible.value = true
    }
}

const handleClose = () => {
    dialogVisible.value = false;
}

// 验证两次密码
const checkdbnewpass = () => {
    if (reg.pwd.test(model.newpass) && reg.pwd.test(model.dbnewpass)) {
        formRef.value.validateField("dbnewpass")
    }
}

//退出登录
const logoutAction = () => {
    ElMessageBox.confirm(
        '你是的真的注销登录?',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
        .then(() => {
            store.commit("changeUserInfo", null)
            localStorage.removeItem("wh_username")
            localStorage.removeItem("wh_phone")
            sessionStorage.removeItem("wh_token")
            router.replace({ name: 'login' })
        })
        .catch(() => {

        })
}




// 修改密码
const changpwd = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            // console.log(model);
            if (model.newpass == userInfo.value.stuPassword) {
                ElMessage({
                    showClose: true,
                    message: '新密码不能和旧密码一致!!!',
                    type: 'error',
                })
            } else {
                let result = await Ajax.updateAll({
                    stuPassword: model.newpass
                })
                if (result.code == 200) {
                    router.push({ name: 'login' })
                }
            }
        } else {
            ElMessage({
                showClose: true,
                message: '请输入有效的信息',
                type: 'error',
            })
        }
    })
}

</script>

<style lang="scss" scoped>
.heard {
    background: #222c3a;

    .headrow {
        height: 100%;
        display: flex;
        align-items: center;

        .elitem {
            display: flex;
            align-items: center;
            color: #fff;

            .icons {
                color: #fff;
                cursor: pointer;
            }
        }
    }
}

.info {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .el-dropdown-link {
        font-size: 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #fff;
    }
}
</style>