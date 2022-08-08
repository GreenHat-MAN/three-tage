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
                    <el-input v-model="form.desc" type="textarea" />

                </el-form-item>
                <div class="btn">
                    <el-button type="primary" @click="onSubmit">发送</el-button>
                </div>
            </el-form>

            <div class="boxs">
                评论内容
            </div>

        </div>

    </div>
</template>

<script setup>
import { inject, ref } from 'vue'

const infolist = inject('list')
const form = ref({})

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
        .btn{
            width: 100%;
            text-align: right;
        }
    }
}
.boxs{
    width: 100%;
    min-height: 200px;
}
</style>