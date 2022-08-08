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

            <el-form-item label="公告图片" prop="image">
                <input type="file" class="fileinp" ref="fileRef" @change="startUpload">

                <div class="imglist">
                    <div v-for="(l, i) in model.image" :key="i" class="imgitem">
                        <img :src="l.replace(/public/, baseURL + 'static')" class="img" alt="" />
                        <el-icon @click="deleteImg(i)" class="del-icon">
                            <Delete />
                        </el-icon>
                    </div>
                </div>

                <el-button type="primary" @click="todoUpload">
                    <el-icon class="avatar-uploader-icon">
                        <Plus />
                    </el-icon> 点击上传
                </el-button>

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
import { Plus , Delete } from '@element-plus/icons-vue'
const labelPosition = ref('top')
const formRef = ref()
const model = ref({
    image: []
})
const fileRef = ref()
const rules = reactive({
    name: [
        { required: true, message: '请输入标题', trigger: 'blur' },
    ],
    region: [
        { required: true, message: '请选择你部门', trigger: 'blur' },
    ],
    time: [
        { required: true, message: '请输入发布时间', trigger: 'blur' },
    ],
    desc: [
        { required: true, message: '请输入详细信息', trigger: 'blur' },
    ],
    image: [
        { required: true, message: '至少一张', trigger: 'blur' },
    ],
})

// 上传图片
const startUpload = async () => {
    const file = fileRef.value.files[0]
    const data = new FormData()
    data.append('file', file)
    let res = await Ajax.uploadfiles(data)
    if (res.code == 200) {
        console.log(res.path)
        model.value.image.push(res.path)
    }
}

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

const todoUpload = () => {
    if (model.value.image.length > 9) {
        ElMessage({
                showClose: true,
                message: '最多上传九张',
                type: 'error',
            })
    } else {
        fileRef.value.click()
    }

}

const resetFrom = () => {
    model.value = {}
}

const deleteImg = (index) => {
    model.value.image.splice(index, 1)
}

</script>


<style lang="scss" scoped>
.fileinp {
    display: none;
}

.imglist {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    .imgitem {
        width: 140px;
        height: 140px;
        margin: 15px;
        position: relative;

        .img {
            width: 100%;
            height: 100%;
        }

        .del-icon {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }
    }
}
</style>