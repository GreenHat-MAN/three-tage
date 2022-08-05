<template>
    <div class="common-layout">
        <el-container class="container">
            <Aside></Aside>
            <el-container class="main-context">
                <Myheard></Myheard>
                <el-main>
                    <router-view></router-view>
                </el-main>
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
import { routerList } from '../../utils/AddRouter.js';
import {useRouter} from 'vue-router';

const store = useStore()
const router = useRouter()
// 获取动态路由过滤权限
const getRouter = (arr, role) => {
    //过滤第一层路由信息,将比角色权限大的数据过滤掉
    let newList = arr.filter(it => role > it.role)
    // 循环过滤后的数据
    newList.forEach(element => {
        // 判断新数组是否存在子路由
        if (element.children) {
            // 递归返回新一轮子路由
            return (element.children = getRouter(element.children, role))
        }
    })
    return newList
}


// 获取用户具体信息分配路由权限
const getUserInfo = async () => {
    let res = await Ajax.userAll()

    // 调用动态路由过滤方法存储到vuex
    store.commit('changeRouterList',getRouter(routerList,res.result[0].role))
    // console.log(store.state.routerLists);

    // 动态路由配置
    router.addRoute({
        path:'/main',
        name:'main',
        component:()=>import('../Home/main.vue'),
        children:store.state.routerLists,
    })

    store.commit('changeUserInfo', res.result)
}

// 获取全部角色信息
const getRoleList = () => {
    store.dispatch('getRoleListAsync')
    getUserInfo()
}

onMounted(() => {
    getRoleList()
})

</script>

<style lang="scss" scoped>
#app {
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