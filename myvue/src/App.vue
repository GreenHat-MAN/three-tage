<!-- 跟组件文件 -->
<template>
<div id="app">

    <h1>根组件</h1>
    <hr>

    <!-- 全局组件index -->
    <!-- <index></index> -->

    <!-- 局部路由 -->
    <Login></Login>

    <!-- 组件通信 -->
    <!-- <Fater></Fater> -->

    <!-- 路由入口 -->
    <router-view></router-view>

    <!-- 导航连接 -->
    <router-link :to="{name:'indexmain'}">主页</router-link>
    <router-link :to="{name:'main'}">副主页</router-link>
    <router-link :to="{name:'cart'}">购物车</router-link>
    <router-link :to="{name:'regist'}">注册</router-link>
    <router-link :to="{name:'detail'}">商品</router-link>

</div>
</template>

<script>
// 局部注册
import Login from './components/login.vue';
export default {
    components: { Login }
}
</script>

<style>

</style>