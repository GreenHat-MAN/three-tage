<template>
    <div v-if="userInfo">
        <h1>我发布的面试题</h1>
        <el-carousel 
        :interval="4000" 
        type="card" 
        height="500px"
        indicator-position="none"
        >
            <el-carousel-item v-for="(item,index) in list" :key="index">
                <h3 text="2xl" justify="center">{{ item.subject }}</h3>
                <p justify="center">{{item.content}}</p>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Ajax } from '../../api';

const store = useStore()
const list = ref([])

const getMyaud = async () => {
    let name =  store.state.userInfo[0].stuName
    let data = await Ajax.searchAuition({ stuName: name })
    console.log(data.result);
    list.value = data.result
}

onMounted(() => {
    getMyaud()
})

</script>

<style lang="scss" scoped>
h1{
    font-size: 20px;
    color: black;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 100px;
  margin: 0;
  text-align: center;
}

p{
    text-align: left;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>