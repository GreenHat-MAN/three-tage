<template>

    <el-form 
    ref="ruleFormRef" 
    :model="model" 
    :rules="rules" 
    label-width="120px" 
    class="demo-ruleForm" 
    :size="formSize"
    status-icon
    >

        <div class="common-layout">
            <el-container>
                <el-header>
                    <el-form-item label="题目名称" prop="subject" >
                        <el-input v-model="model.subject" clearable placeholder="请输入面试题目" />
                    </el-form-item>
                </el-header>
                <el-main>
                    <el-form-item label="题目解析详情" prop="content" >
                        <el-input v-model="model.content" type="textarea" :rows="15" />
                    </el-form-item>
                </el-main>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">发布</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-container>
        </div>

    </el-form>
</template>

<script setup>
import { reactive, ref,toRaw } from 'vue'
import { ElMessage } from 'element-plus'
import { Ajax } from '../../api';
const ruleFormRef = ref()
const model = ref({})
const formSize = ref('default')
const rules = reactive({
    subject:[
        { required: true, message: '请输入面试题目', trigger: 'blur' },
        { min: 5, max: 50, message: '题目请尽可能精简', trigger: 'blur' },
    ],
    content:[
        { required: true, message: '请输入题目具体解析内容', trigger: 'blur' },
    ]
})



const submitForm = ()=>{
    ruleFormRef.value.validate(async valid =>{
        if(valid){
            // console.log(toRaw(model.value));
            let res = await Ajax.addAuition(toRaw(model.value))
            if(res.code==200){
                resetForm()
                ElMessage(data.msg)
            }
        }else{
             ElMessage('请输入正确的内容.')
        }
    })
}


const resetForm = () =>{
    model.value={}
}

</script>
