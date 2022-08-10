<template>
    <div>
        <header>意见列表</header>
        <el-table :data="filterTableData" border style="width: 100%">
            <el-table-column prop="time" label="发表时间" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="advise" label="意见" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { Ajax } from '../../api';

const search = ref('')
const tableData = ref([])

// 获取意见信息
const getAdvise = async () => {
    let data = await Ajax.findAdvise()
    tableData.value = data.result
}

// 搜索
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase()) ||
            data.time.toLowerCase().includes(search.value.toLowerCase()) ||
            data.advise.toLowerCase().includes(search.value.toLowerCase())
    )
)

const handleDelete = (index,row) => {
    tableData.value.splice(index,1)
}

onMounted(() => {
    getAdvise()
})

</script>

<style lang="scss" scoped>
header {
    width: 100%;
    font-size: 20px;
    color: black;
    text-align: center;
    margin-bottom: 10px;
}
</style>