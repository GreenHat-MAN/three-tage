<template>
    <div>
        <h1>考勤记录管理</h1>
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column prop="cardTime" label="打卡日期" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="cardCount" label="打卡次数" />
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
        <el-dialog v-model="dialogVisible" title="修改考勤信息" width="30%" class="showbox">
            <el-form label-position="top" :model="model" ref="formRef" class="myform" status-icon :rules="rules"
                size="default">
                <el-form-item label="打卡次数" prop="cardCount">
                    <el-input v-model="model.cardCount" autocomplete="off" clearable placeholder="请输入规格信息" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button type="danger" @click="confirmAction">修改</el-button>
                </span>
            </template>
        </el-dialog>


    </div>
</template>

<script setup>
import { onMounted, ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { Ajax } from '../../api';
import { ElButton, ElTag, ElMessage } from 'element-plus'
import { reg } from '../../utils/validate';
const search = ref('')
const attList = ref([])
const store = useStore()
const dialogVisible = ref(false)
const formRef = ref()
const model = ref({})
// 获取考勤信息
const getAttend = async () => {
    let data = await Ajax.findAttend()
    attList.value = data.result
}

const rules = reactive({
    cardCount: [
        { required: true, message: '请输入数据', trigger: 'blur' },
        { pattern: reg.score, message: '请1-100的整数', trigger: 'blur' }
    ],
})

// 删除
const handleDelete = (index, row) => {
    attList.value.splice(index, 1)
}

// 修改考勤信息
const handleEdit = (index, row) => {
    model.value = row
    dialogVisible.value = true
}

const handleClose = () => {
    model.value = {}
    dialogVisible.value = false
}

const confirmAction = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            let data = await Ajax.upAttend(model.value)
            if (data.code == 200) {
                model.value = {}
                dialogVisible.value = false
                ElMessage({
                    type: 'info',
                    message: 'ok',
                })
            } else {
                ElMessage({
                    type: 'info',
                    message: '修改失败',
                })
            }
        } else {
            ElMessage({
                type: 'info',
                message: '请输入有效信息',
            })
        }
    })

}

// 搜索
const filterTableData = computed(() =>
    attList.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase()) ||
            data.cardTime.toLowerCase().includes(search.value.toLowerCase()) ||
            data.cardCount.toLowerCase().includes(search.value.toLowerCase())
    )
)

onMounted(() => {
    getAttend()
})

</script>