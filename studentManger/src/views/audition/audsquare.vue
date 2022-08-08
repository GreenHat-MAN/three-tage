<template>
    <div class="common-layout">
        <el-container class="box">
            <el-aside width="400px">

                <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                    <li v-for="(l, i) in count" :key="i" class="infinite-list-item" @click="info(l._id)">
                        {{ l.subject }}</li>
                </ul>

            </el-aside>
            <el-main>
                <div v-if="list.length > 0">
                    <Audinfo></Audinfo>
                </div>

                <!-- <div class="common-layout">
                    <el-container>
                        <el-header>{{ list[0].subject }}</el-header>
                        <el-main>
                            {{ list[0].content }}
                        </el-main>
                    </el-container>
                </div> -->
                <!-- <div v-if="list.length > 0">
                    <h1 class="title">题干</h1>
                    <p class="subject">{{ list[0].subject }}</p>

                    <div class="bodys">
                        <h3>解题思路</h3>
                        <p>{{ list[0].content }}</p>
                    </div>
                </div> -->

            </el-main>
        </el-container>
    </div>
</template>


<script setup>
import { ref, onMounted, provide, readonly } from 'vue'
import { Ajax } from '../../api';
import Audinfo from './audinfo.vue';
const count = ref([])
const list = ref([])
const load = () => {
    count.value += 2
}
const ids = ref()



// 请求面试题
const getAudition = async () => {
    let data = await Ajax.searchAuition()
    count.value = data.result
    ids.value = data.result[0]._id
    list.value = data.result[0]
}


const info = (id) => {
    ids.value = id
    list.value = count.value.filter(item => item._id == id)
}

provide('id', readonly(ids))
provide('list', readonly(list))

onMounted(() => {
    getAudition()
})

</script>

<style lang="scss" scoped>
.box {
    height: 100%;
}

.infinite-list {
    height: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.title {
    font-size: 30px;
    text-align: left;
    margin-bottom: 10px;
    font-weight: bold;

    .subject {
        font-size: 12px;
        text-align: left;
    }
}
</style>