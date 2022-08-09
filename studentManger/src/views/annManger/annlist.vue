<template>
    <div>
        <h2 class="otitle">
            班级管理
        </h2>

        <el-row class="mt10">
            <el-button type="danger" @click="toAdd">添加班级</el-button>
        </el-row>
        <el-row class="mt10">
            <el-col span="8">
                <el-input placeholder="请输入关键字" v-model="obj.keyword"></el-input>
            </el-col>
            <el-col span="8" :offset="1">
                <el-select v-model="obj.xueke" style="width:100%;" class="m-2" placeholder="请选择学科" size="middle">
                    <el-option v-for="(item, index) in xuekeList" :key="index" :label="item.name" :value="item.value" />
                </el-select>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-button type="success" @click="todoSearch">点击搜索</el-button>
                <el-button type="danger" @click="resetData">重置数据</el-button>
            </el-col>
        </el-row>
        <el-row class="mt10">
            <el-col :span="23">
                <el-table :data="classList" border style="width: 100%">
                    <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
                    <el-table-column label="班级索引" align="center" prop="value" width="220">
                        <template #default="scope">
                            <el-tag color="#123456">{{ scope.row._id }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="班级名称" align="center" prop="name">
                        <template #default="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="班级编码" align="center" prop="value">
                        <template #default="scope">
                            <span>{{ scope.row.value }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="班级年份" align="center" prop="year">
                        <template #default="scope">
                            <span>{{ scope.row.year }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="班级序号" align="center" prop="num">
                        <template #default="scope">
                            <span>{{ scope.row.num }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="学科" align="center" prop="num">
                        <template #default="scope">
                            <span>{{ scope.row.xueke }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template #default="scope">
                            <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled"
                                icon-color="#626AEF" @confirm="confirmDelOne(scope.row, scope.$index)" title="你确定要删除吗?">
                                <template #reference>
                                    <el-button size="small" type="danger">删除</el-button>
                                </template>
                            </el-popconfirm>

                            <el-button size="small" type="default" @click="updateOne(scope.row, scope.$index)">修改
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

        </el-row>

        <el-dialog v-model="dialogVisible" :title="flag ? '添加班级' : '修改班级'" width="30%" :before-close="handleClose"
            class="showbox">
            <el-form label-position="top" :model="model" ref="formRef" class="myform" status-icon :rules="rules"
                size="default">
                <el-form-item label="班级学科" prop="xueke">
                    <el-select v-model="model.xueke" style="width:100%;" class="m-2" placeholder="请选择班级学科" size="large">
                        <el-option v-for="(item, index) in xuekeList" :key="index" :label="item.name"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="班级年份" prop="year">
                    <el-select v-model="model.year" style="width:100%;" class="m-2" placeholder="请选择班级年份" size="large">
                        <el-option v-for="(item, index) in years" :key="index" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="班级序号" prop="num">
                    <el-select v-model="model.num" style="width:100%;" class="m-2" placeholder="请选择班级序号" size="large">
                        <el-option v-for="(item, index) in 30" :key="index" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button :type="flag ? 'success' : 'danger'" @click="confirmAction">{{ flag ? "添加" : '修改' }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>


<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue';
import { useStore } from 'vuex';
import { Ajax } from '../../api/index.js';
import { ElButton, ElTag, ElMessage } from 'element-plus'

const store = useStore()
const dialogVisible = ref(false)
const flag = ref(true)
const model = ref({

})
const state = reactive({
    obj: {},
    years: []
})
const { obj, years } = toRefs(state)
const formRef = ref()
const rules = reactive({
    xueke: [
        { required: true, message: '请选择班级学科', trigger: 'blur' },
    ],
    year: [
        { required: true, message: '请选择班级年份', trigger: 'blur' },
    ],
    num: [
        { required: true, message: '请选择班级序号', trigger: 'blur' },
    ],
})
const getXuekeList = (payload = {}) => {
    store.dispatch("getXuekeListAsync", payload)
}

const getClassList = (payload) => {
    store.dispatch("getClassListAsync", payload)
}
onMounted(() => {
    getClassList()
    getXuekeList()
    const year = new Date().getFullYear()
    model.value.year = year;
    for (var i = -5; i < 5; i++) {
        state.years.push(year + i)
    }
})

// 搜索数据 
const todoSearch = () => {
    getClassList(state.obj)
}
const resetData = () => {
    state.obj = {}
    getClassList()
}


const toAdd = () => {
    dialogVisible.value = true;
}


const confirmAction = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            if (flag.value) {
                // 添加
                let res = await Ajax.addbanji(model.value)
                if (res.code == 200) {
                    getClassList()
                    handleClose()
                }
            } else {
                // 修改班级 
                let res = await Ajax.updateclass(model.value)
                if (res.code == 200) {
                    getClassList()
                    handleClose()
                }
            }
        } else {
            ElMessage({
                type: 'info',
                message: '请选择班级数据添加',
            })
        }
    })
}
const handleClose = () => {
    dialogVisible.value = false;
    model.value = {}
    formRef.value.resetFields()
}

const confirmDelOne = async (row, index) => {
    let res = await Ajax.removeclass({ _id: row._id })
    if (res.code == 200) {
        store.state.classList.splice(index, 1);
        store.commit('getClassList', store.state.classList)
    }
}

const updateOne = (row, index) => {
    dialogVisible.value = true;
    flag.value = false;
    model.value = Object.assign({}, row)
    model.value.index = index;
}
</script>