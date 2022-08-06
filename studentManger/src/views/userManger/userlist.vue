<template>
    <div>

        <h1>用户列表</h1>
        <div class="btn">
            <el-button type="success" size="default" @click="adduser">添加用户</el-button>
        </div>


        <!-- 表格 -->
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="ID" prop="_id" />
            <el-table-column label="权限" prop="role">
                <template #default="scope">
                    <el-tag :color="roleList.find(item => item.value == scope.row.role).color">
                        {{ roleList.find(item => item.value == scope.row.role).text }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="姓名" prop="stuName" />
            <el-table-column label="密码" prop="stuPassword" />
            <el-table-column label="联系方式" prop="stuPhone" />
            <el-table-column label="Date" prop="time" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>



        <!-- 弹出框 -->
        <el-dialog v-model="dialogVisible" title="此插件由element赞助" width="30%">
            <span>
                <el-form ref="formRef" :label-position="labelPosition" label-width="100px" :model="model" :rules="rules"
                    style="max-width: 460px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="model.username" clearable />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="model.phone" clearable />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="model.password" clearable />
                    </el-form-item>

                    <el-form-item label="用户身份" prop="role">
                        <el-select v-model="model.role" style="width:100%;" placeholder="请选择用户身份" size="large">
                            <el-option v-for="(item, index) in roleList" :key="index" :label="item.text"
                                :value="item.value" :disabled="userInfo.role <= item.value" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">No!!!</el-button>
                    <el-button type="primary" @click="add">Yes yes!!</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>


<script setup>
import { ref, computed, onMounted, toRaw, reactive } from 'vue'
import { ElButton, ElTag, ElMessage, ElMessageBox } from 'element-plus'
import { Ajax } from '../../api/index.js'
import { reg } from '../../utils/validate.js'
const flag = ref(true)
const userList = ref([])
const search = ref('')
const tableData = ref([])
const dialogVisible = ref(false)
const labelPosition = ref('left')
const model = ref({})
const formRef = ref()
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: reg.phone, message: '请输入有效的11位手机号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: reg.pwd, message: '请输入6-16位的数字字母组合的密码', trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择用户身份', trigger: 'blur' },
    ],
})

// 编辑用户
const handleEdit = async (index, row) => {
    flag.value=false
    dialogVisible.value = true
    // console.log(index, row)
    model.value = {
        username: toRaw(row).stuName,
        password: toRaw(row).stuPassword,
        phone: toRaw(row).stuPhone,
        role: toRaw(row).role
    }
     // tableData.value.splice(index, 1, toRaw(model.value))
}

// 添加
const adduser = ()=>{
    flag.value=true
    dialogVisible.value = true
}


// 删除用户
const handleDelete = (index, row) => {
    // console.log(index, toRaw(row)._id)
    ElMessageBox.confirm(
        '一旦删除又要重新添加是否继续?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            let res = await Ajax.delAll({
                _id: toRaw(row)._id
            })
            if (res.code == 200) {
                tableData.value.splice(index, 1)
                ElMessage({
                    type: 'success',
                    message: res.mag,
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })

}

// 获取列表信息
const getUserList = async () => {
    let res = await Ajax.getuser()
    userList.value = res.result
    tableData.value = res.result
}

onMounted(() => {
    getUserList()
})

// 新增用户
const add = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            if (flag.value == true) {
                let data = await Ajax.register(toRaw(model.value))
                if (data.code == 200) {
                    model.value = {}
                    dialogVisible.value = false
                    getUserList()
                }
                // console.log('add');
            }else{
                userUp()
                // console.log('update');
            }
        }
    })
}

// 搜索
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.stuName.toLowerCase().includes(search.value.toLowerCase()) ||
            data.stuPassword.toLowerCase().includes(search.value.toLowerCase()) ||
            data.stuPhone.toLowerCase().includes(search.value.toLowerCase())
    )
)

const userUp = async () => {
    let data = await Ajax.updatePlus(toRaw(model.value))
    if (data.code == 200) {
        getUserList()
        dialogVisible.value = false
    }
}

</script>
<style lang="scss" scoped>
.btn {
    text-align: left;
}
</style>