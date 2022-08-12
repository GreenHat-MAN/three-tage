<template>
    <div>
        <h1>权限列表</h1>
        <el-descriptions border title="所属权限信息" v-for="(l, i) in userRole" :key="i">
            <el-descriptions-item label="姓名">{{l.stuName}}</el-descriptions-item>
            <el-descriptions-item label="联系方式">{{l.stuPhone}}</el-descriptions-item>
            <el-descriptions-item label="拥有权限">{{l.role}}</el-descriptions-item>
            <el-descriptions-item label="所属角色信息">
                <el-tag size="small">{{ roleList.find(item=>item.value==l.role).text}}</el-tag>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Ajax } from '../../api';

const userRole = ref([])
const store = useStore()
const getUserInfo = async () => {
    let res = await Ajax.getuser()
    store.commit('changeUserInfo', res.result)
    userRole.value = res.result
}

onMounted(() => {
    getUserInfo()
})

</script>