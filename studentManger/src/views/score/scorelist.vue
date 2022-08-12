<template>
    <div>
        <div v-if="falg" class="score">
            <p>欢迎回来,<span>{{ username }}</span>,看看今天挂了几门</p>
            <div class="table">
                <el-table :data="filterTableData" stripe border :default-sort="{ prop: 'date', order: 'descending' }"
                    style="width: 100%">
                    <el-table-column prop="testDay" label="考试时间" align="center" sortable width="180" />
                    <el-table-column prop="chinese" label="语文成绩" align="center" sortable />
                    <el-table-column prop="math" label="数学成绩" align="center" sortable width="180" />
                    <el-table-column prop="english" label="英语成绩" align="center" sortable />
                    <el-table-column prop="stuScore" label="总成绩" align="center" sortable />
                    <el-table-column align="right">
                        <template #header>
                            <el-input v-model="search" size="small" placeholder="Type to search" />
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div v-else class="imgs">
            <img :src="PIC">
            <p>你不是学员</p>
        </div>
    </div>
</template>


<script setup>
import Img from '../../assets/images/none.png'
import { ref, onMounted,computed } from 'vue';
import { useStore } from 'vuex';
import { Ajax } from '../../api';
const PIC = ref(Img)
const store = useStore()
const falg = ref()
const search = ref('')
const username = ref()
const scoreList = ref([])
const getUserInfo = async () => {
    let res = await Ajax.userAll()
    store.commit('changeUserInfo', res.result)
    if (res.result[0].role == 1) {
        falg.value = true
        username.value = res.result[0].stuName
        getScore()
    } else {
        falg.value = false
    }
}

// 获取成绩列表
const getScore = async () => {
    let data = await Ajax.findScore({ stuName: username.value })
    scoreList.value = data.result
}

// 搜索
const filterTableData = computed(() =>
    scoreList.value.filter(
        (data) =>
            !search.value ||
            data.chinese.toLowerCase().includes(search.value.toLowerCase()) ||
            data.math.toLowerCase().includes(search.value.toLowerCase()) ||
            data.english.toLowerCase().includes(search.value.toLowerCase()) ||
            data.testDay.toLowerCase().includes(search.value.toLowerCase())
    )
)

onMounted(() => {
    getUserInfo()
})


</script>

<style lang="scss" scoped>
.imgs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        margin-bottom: 10px;
    }

    p {
        font-size: 20px;
        font-weight: bold;
    }
}

.score {
    text-align: left;
    p {
        font-size: 30px;

        span {
            font-size: 32px;
            color: red;
        }
    }
}
.table{
    margin-top: 30px;
}

</style>