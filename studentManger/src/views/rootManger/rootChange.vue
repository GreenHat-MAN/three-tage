<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="角色编号" />
            <el-table-column prop="text" label="权限类型" />
        </el-table>
        <el-table :data="userRole">
            <el-table-column prop="stuName" label="姓名" />
            <el-table-column prop="role" label="持有权限" />
            <el-table-column label="修改角色权限" prop="stuName">
                <template #default="scope">
                    <el-cascader :options="options" v-model="value" @change="onChange(value,scope.$index,scope.row)" placeholder="请选择权限" />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { Ajax } from '../../api';
import { ElMessage } from 'element-plus'
const tableData = ref([])
const userRole = ref([])
const store = useStore()
const info = ref({})
const options = reactive([
    {
        value: 6,
        label: '管理员',
        disabled: true,
    },
    {
        value: 5,
        label: '校长',
    },
    {
        value: 4,
        label: '部门主管',
    },
    {
        value: 3,
        label: '讲师',
    },
    {
        value: 2,
        label: '班主任',
    },
    {
        value: 1,
        label: '学员',
    },
])
const getUserInfo = async () => {
    let res = await Ajax.getuser()
    userRole.value = res.result
}

// 修改用户权限
const onChange = async (val,index,row) => {
    info.value = {
        ...info.value,
        role:val[0],
        stuName:row.stuName
    }
    let data = await Ajax.updateRole(info.value)
    if(data.code==200){
        info.value={}
        ElMessage({
            type: 'info',
            message: 'Delete canceled',
        })
        getUserInfo()
    }else{
    ElMessage({
            type: 'info',
            message: '失败',
        })
    }
}

onMounted(() => {
    tableData.value = store.state.roleList
    getUserInfo()
})

</script>