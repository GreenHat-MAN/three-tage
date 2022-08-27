<template>
    <div class="boxs">
        <h1>成绩上传</h1>
        <div class="table">
            <el-row class="mb-4">
                <el-button type="primary" size="large" @click="addScore">上传成绩</el-button>
            </el-row>
            <el-table :data="filterTableData" stripe border :default-sort="{ prop: 'date', order: 'descending' }"
                style="width: 100%">
                <el-table-column prop="testDay" label="上传日期" sortable width="180" />
                <el-table-column prop="stuName" label="学生姓名" width="180" />
                <el-table-column prop="chinese" label="语文成绩" sortable />
                <el-table-column prop="math" label="数学成绩" sortable width="180" />
                <el-table-column prop="english" label="英语成绩" sortable />
                <el-table-column prop="stuScore" label="总成绩" sortable />
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
        </div>


        <!-- 弹出框 -->
        <el-dialog v-model="dialogVisible" title="上传成绩" width="30%">
            <span>
                <el-form :label-position="labelPosition" label-width="100px" :model="model" style="max-width: 460px"
                    :rules="rules" ref="formRef">
                    <el-form-item label="学生姓名" prop="stuName">
                        <el-input v-model="model.stuName" />
                    </el-form-item>
                    <el-form-item label="语文成绩" prop="chinese">
                        <el-input v-model="model.chinese" />
                    </el-form-item>
                    <el-form-item label="数学成绩" prop="math">
                        <el-input v-model="model.math" />
                    </el-form-item>
                    <el-form-item label="英语成绩" prop="english">
                        <el-input v-model="model.english" />
                    </el-form-item>
                </el-form>
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="close">取消</el-button>
                    <el-button type="primary" @click="addPlus">上传</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, reactive, onMounted,computed } from 'vue'
import { Ajax } from '../../api';
import { reg } from '../../utils/validate';
const model = ref({})
const search = ref('')
const formRef = ref()
const dialogVisible = ref(false)
const labelPosition = ref('left')
const rules = reactive({
    stuName: [
        { required: true, message: '请输入学生姓名', trigger: 'blur' },
    ],
    chinese: [
        { required: true, message: '请输入语文成绩', trigger: 'blur' },
        { pattern: reg.score, message: '请输入0-100位的成绩', trigger: 'blur' }
    ],
    math: [
        { required: true, message: '输入数学成绩', trigger: 'blur' },
        { pattern: reg.score, message: '请输入0-100位的成绩', trigger: 'blur' }
    ],
    english: [
        { required: true, message: '请输入英语成绩', trigger: 'blur' },
        { pattern: reg.score, message: '请输入0-100位的成绩', trigger: 'blur' }
    ],
})
const addScore = () => {
    dialogVisible.value = true
}

const addPlus = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            let data = await Ajax.addScore(model.value)
            if (data.code == 200) {
                model.value = {}
                dialogVisible.value = false
                getAllScore()
            } else {
                ElMessage({
                    type: 'info',
                    message: '未知错误',
                })
            }
        } else {
            ElMessage({
                type: 'info',
                message: '请输入完整的信息',
            })
        }
    })

}

const close = () => {
    model.value = {}
    dialogVisible.value = false
}

const tableData = ref([])

// 删除
const handleDelete = (index, row) => {
    tableData.value.splice(index, 1)
    ElMessage({
        type: 'success',
        message: 'ok',
    })
}

// 搜索
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.chinese.toLowerCase().includes(search.value.toLowerCase()) ||
            data.math.toLowerCase().includes(search.value.toLowerCase()) ||
            data.english.toLowerCase().includes(search.value.toLowerCase()) ||
            data.stuName.toLowerCase().includes(search.value.toLowerCase())
    )
)


// 查询全部学生信息
const getAllScore = async () => {
    let data = await Ajax.searchScore()
    tableData.value = data.result
}


onMounted(() => {
    getAllScore()
})
</script>

<style lang="scss" scoped>
.boxs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-size: 20px;
        font-weight: bold;
    }

    .table {
        width: 90%;
        min-height: 300px;

        .mb-4 {
            margin-bottom: 10px;
        }
    }
}
</style>