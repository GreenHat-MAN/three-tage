<template>
    <div>
        <h1>我的考勤</h1>
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column prop="cardTime" label="打卡日期" />
            <el-table-column prop="name" label="姓名"  />
            <el-table-column prop="cardCount" label="打卡次数" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, ref,computed } from 'vue';
import { useStore } from 'vuex';
import { Ajax } from '../../api';

const attList = ref([])
const store = useStore()
const search = ref('')
// 获取考勤信息
const getAttend = async () => {
    let data = await Ajax.searchAttend({ name: store.state.userInfo[0].stuName })
    attList.value = data.result
}

// 搜索
const filterTableData = computed(() =>
    attList.value.filter(
        (data) =>
            !search.value ||
            data.cardTime.toLowerCase().includes(search.value.toLowerCase())
    )
)

onMounted(() => {
    getAttend()
})

</script>


<style lang="scss" scoped>
</style>