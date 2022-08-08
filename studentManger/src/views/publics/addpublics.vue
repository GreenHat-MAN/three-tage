<template>
    <div>
        <h1>新增公告</h1>
        <el-form ref="formRef" :rules="rules" :label-position="labelPosition" label-width="100px" :model="model"
            style="max-width: 460px">
            <el-form-item label="标题" prop="name">
                <el-input v-model="model.name" />
            </el-form-item>
            <el-form-item label="部门" prop="region">
                <el-select v-model="model.region" placeholder="请选择你所属部门">
                    <el-option label="后勤" value="后勤" />
                    <el-option label="学生会办公室" value="学生会办公室" />
                    <el-option label="年纪办公室" value="年纪办公室" />
                    <el-option label="校长办公室" value="校长办公室" />
                    <el-option label="保卫处" value="保卫处" />
                    <el-option label="老师办公室" value="老师办公室" />
                </el-select>
            </el-form-item>
            <el-form-item prop="time" label="发布时间">
                <el-date-picker v-model="model.time" type="date" placeholder="请选择时间" style="width: 100%" />
            </el-form-item>

            <el-form-item label="公告详情" prop="desc">
                <el-input v-model="model.desc" type="textarea" :rows="10" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm">添加</el-button>
                <el-button @click="resetFrom">重置</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref, toRaw } from 'vue'
import { Ajax } from '../../api';

const labelPosition = ref('top')
const formRef = ref()
const model = ref({})

const rules = reactive({
    name: [
        { required: true, message: '请输入标题', trigger: 'blur' },
    ],
    region: [
        { required: true, message: '请选择你部门', trigger: 'blur' },
    ],
    // time: [
    //     { required: true, message: '请输入发布时间', trigger: 'blur' },
    // ],
    desc: [
        { required: true, message: '请输入详细信息', trigger: 'blur' },
    ],
})

const submitForm = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            let res = await Ajax.addtongzhi(toRaw(model.value));
            // console.log(toRaw(model.value));
            if (res.code == 200) {
                resetFrom()
                ElMessage({
                    showClose: true,
                    message: 'ok',
                    type: 'success',
                })
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

const resetFrom = () => {
    model.value = {}
}

</script>