<template>
    <div>
        <h3>我是全局组件</h3>
        <h3>{{userName}}</h3>
        <h3>{{age}}</h3>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName:'罗先略',
            age:22,
        }
    },
}
</script>

<!-- 引入公共样式scss -->
<style lang="scss" scoped>
    div{
        width: 100px;
        height: 100px;
        border: 1px solid red;
    }
</style>