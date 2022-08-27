<template>
    <div class="common-layout">
        <h1 class="title">题干</h1>
        <p class="subject">{{ infolist[0].subject }}</p>

        <div class="bodys">
            <h3>解题思路</h3>
            <p>{{ infolist[0].content }}</p>
        </div>

        <div class="discss">
            <h2>讨论区</h2>
            <el-form :model="form" class="table">

                <el-form-item class="btn">
                    <el-input v-model="form.content" type="textarea" />

                </el-form-item>
                <div class="btn">
                    <el-button type="primary" @click="onSubmit">发送</el-button>
                </div>
            </el-form>

            <div class="boxs">
                <div v-for="(l,i) in disList" :key="i">
                    <div class="disInfo">
                        <p>评论内容:{{l.content}}</p>
                        <span>该评论由我们热心的{{l.name}}发表于{{l.time}}</span>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script setup>
import { inject, ref, toRaw,onMounted,watch } from 'vue'
import { useStore } from 'vuex';
import { Ajax } from '../../api';
import { ElButton,ElMessage } from 'element-plus'

const infolist = inject('list')
const id = inject('id')
const form = ref({})
const store = useStore()
const disList = ref([])
const onSubmit = async () => {
    let name = toRaw(store.state.userInfo)[0].stuName
    form.value = {
        ...form.value,
        titleId: id.value,
        name: name,
        time: new Date()
    }
    let data = await Ajax.adddis(form.value)
    if (data.code == 200) {
        form.value={}
        getDis()
    }
}

// 查询当前评论内容
const getDis = async ()=>{
    let data = await Ajax.finddis({titleId: id.value,})
    disList.value=data.result
}

onMounted(() => {
    getDis()
})

watch(id, (newValue, oldValue) =>{
    getDis()
})

</script>

<style lang="scss" scoped>
.title {
    font-size: 30px;
    text-align: left;
    margin-bottom: 10px;
    font-weight: bold;
}

.subject {
    font-size: 18px;
    text-align: left;
    width: 100%;
}

.bodys {
    h3 {
        text-align: left;
        margin-top: 10px;
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    p {
        font-size: 18px;
        text-align: left;
        width: 100%;
        min-height: 200px;
    }
}

.discss {
    margin-top: 10px;
    text-align: left;
    min-height: 100px;
    background-color: #ccc;

    .table {
        background-color: white;

        .btn {
            width: 100%;
            text-align: right;
        }
    }
}

.boxs {
    width: 100%;
    min-height: 200px;
    padding: 20px;
}
.disInfo{
    width: 100%;
    min-height: 50px;
    padding: 15px;
    margin-bottom: 10px;
    background-color: burlywood;
}
</style>