<!-- 组件通信,父组件 -->
<template>
  <div>

    <h2>父组件</h2>
    <p>被修改的数量:{{num}}</p>
    <p>被修改的标题:{{title}}</p>
    <hr>

    <!-- 子组件一 -->
    <input type="text" v-model="title">
    <Child :title='title' :changetxt="changetxt" ref="one"></Child>

    <!-- 子组件二 兄弟组件通信 -->
    <Brother></Brother>

  </div>
</template>

<script>
import Child from './child.vue'
import Brother from './brother.vue';
export default {
    data() {
        return {
            num: 10,
            title: "我是父组件的标题",
        };
    },
    components: { Child, Brother },
    methods: {
        changetxt(){
            this.title=this.$refs.one.msg
        }
    },
}
</script>

<style scoped>
    div{
        float: right;
        background: #ccc;
        width: 400px;
        height: 400px;
        border: 1px solid yellow;
    }
</style>