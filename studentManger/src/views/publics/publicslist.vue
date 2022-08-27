<template>
    <div class="common-layout">
        <el-container>

            <el-header class="header">
                <h1>通知公告浏览</h1>

                <el-form ref="ruleFormRef" :model="model" :rules="rules" label-width="120px" class="demo-ruleForm"
                    :size="formSize" status-icon>

                    <el-form-item label="请输入标题" prop="name">
                        <el-col :span="11">
                            <el-input v-model="model.name" />
                        </el-col>

                    </el-form-item>

                    <el-form-item label="请选择日期" required>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker v-model="model.date1" type="date" label="Pick a date"
                                    placeholder="Pick a date" style="width: 100%" />
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm">查询</el-button>
                        <el-button @click="resetFrom">重置</el-button>
                    </el-form-item>


                </el-form>

            </el-header>


            <el-main class="main">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="index" label="序号" width="100" />
                    <el-table-column prop="time" label="发布时间" width="180" />
                    <el-table-column prop="name" label="公告标题" width="180" />
                    <el-table-column prop="region" label="发布部门" />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button type="primary" @click="submitForm(scope.$index)">点击查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-main>



        </el-container>


        <!-- 弹出框 -->
        <el-dialog v-model="dialogVisible" title="通知" width="30%">
            <span class="tan">
                <h1>{{ list.name }}</h1>
                <p>{{ list.desc }}</p>
                <div class="msg">
                    <span v-if="list.image">
                        <img :src="list.image[0].replace(/public/, baseURL + 'static')">
                    </span>
                    {{ list.region }}于{{ list.time }}发布
                </div>
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="close">收到</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex';
import { Ajax } from '../../api';
// import { ElMessageBox } from 'element-plus'
const dialogVisible = ref(false)
const model = ref({})
const ruleFormRef = ref()
const rules = ref({})
const store = useStore()
const tableData = ref([])
const list = ref([])


const getpublicList = async () => {
    let res = await Ajax.sercherpublic()

    store.commit('getPublicList', res.result)
    tableData.value = res.result

}

const close = () => {
    list.value = []

    dialogVisible.value = false
}

const submitForm = (index) => {
    dialogVisible.value = true
    list.value = tableData.value[index]
}



onMounted(() => {
    getpublicList()
})

</script>

<style lang="scss" scoped>
.header {
    text-align: left;
}

.main {
    margin-top: 50px;
}

.tan {
    h1 {
        font-size: 20px;
        font-weight: bold;
        color: black;
    }

    p {
        font-size: 12px;
        color: cadetblue;
        min-height: 100px;

    }

    .msg {
        text-align: right;
        font-size: 10px;

        img {
            width: 20px;
            height: 20px;
            display: inline;
        }
    }
}
</style>