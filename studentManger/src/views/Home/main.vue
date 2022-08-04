<template>
    <div class="common-layout">
        <el-container class="container">
               <Aside></Aside>
            <el-container class="main-context">
                <Myheard></Myheard>
                <el-main>Main</el-main>
                <Myfooter></Myfooter>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { Ajax } from '../../api/index.js';
import Myfooter from './myfooter.vue';
import Myheard from './myheard.vue';
import Aside from './aside.vue';

const store=useStore()

const getUserInfo = async () => {
    let res = await Ajax.userAll()
    // console.log(res.result);
    store.commit('changeUserInfo',res.result)
    console.log(store.state.userInfo);
}

const getRoleList =()=>{
    store.dispatch('getRoleListAsync')
    getUserInfo()
}

onMounted(() => {
    getRoleList()
})

</script>

<style lang="scss" scoped>
#app{
    max-width: none !important;
}
.common-layout {
    width: 100%;
    height: 100%;

    .container {
        height: 100%;

        .main-context {
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>