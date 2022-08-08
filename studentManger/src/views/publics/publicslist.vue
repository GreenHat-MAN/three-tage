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
                    <el-table-column prop="time" label="发布时间" width="180" />
                    <el-table-column prop="name" label="公告标题" width="180" />
                    <el-table-column prop="region" label="发布部门" />
                    <el-table-column  label="操作" >
                        <el-button type="primary" @click="submitForm">点击查看</el-button>
                    </el-table-column>
                </el-table>

            </el-main>



        </el-container>
    </div>
</template>


<script setup>
import {ref,onMounted } from 'vue'
import { useStore } from 'vuex';
import { Ajax } from '../../api';

const model = ref({})
const ruleFormRef = ref()
const rules = ref({})
const store = useStore()

const tableData = ref([])



const getpublicList = async ()=>{
    let res = await Ajax.sercherpublic()
    console.log(res.result);
    store.commit('getPublicList',res.result)
    tableData.value=res.result
    console.log(tableData.value);
}

onMounted(() => {
    getpublicList()
})

</script>

<style lang="scss" scoped>
.header {
    text-align: left;
}
.main{
    margin-top: 50px;
}
</style>