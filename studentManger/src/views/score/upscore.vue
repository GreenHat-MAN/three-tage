<template>
    <div class="boxs">
        <h1>成绩上传</h1>
        <div class="table">
            <el-row class="mb-4">
                <el-button type="primary" size="large" @click="addScore">上传成绩</el-button>
            </el-row>
            <el-table :data="tableData" stripe border :default-sort="{ prop: 'date', order: 'descending' }"
                style="width: 100%">
                <el-table-column prop="date" label="Date" sortable width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="date" label="Date" sortable width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="date" label="Date" sortable width="180" />
                <el-table-column prop="address" label="Address" :formatter="formatter" />
            </el-table>
        </div>


        <!-- 弹出框 -->
        <el-dialog v-model="dialogVisible" title="Tips" width="30%" ref="formRef">
            <span>
                <el-form :label-position="labelPosition" label-width="100px" :model="model" style="max-width: 460px"
                    :rules="rules">
                    <el-form-item label="学生姓名" props="stuName">
                        <el-input v-model="model.stuName" />
                    </el-form-item>
                    <el-form-item label="语文成绩" props="chinese">
                        <el-input v-model="model.chinese" />
                    </el-form-item>
                    <el-form-item label="数学成绩" props="math">
                        <el-input v-model="model.math" />
                    </el-form-item>
                    <el-form-item label="英语成绩" props="english">
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { reg } from '../../utils/validate';
const formatter = (row, column) => {
    return row.address
}
const model = ref({})
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
    console.log(model.value);
    console.log(formRef.value);
}

const close = () => {
    model.value = {}
    dialogVisible.value = false
}

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

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