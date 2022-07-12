<!-- 第二个子组件girl -->
<template>
  <div>
    <h3>第二个子组件girl</h3>

    <!-- 通过事件总线修改兄弟组件的值 -->
    <button @click="changboy">修改兄弟组件的值</button>

  </div>
</template>

<script>
export default {
    methods: {
        changboy(){
            this.$bus.$emit('changboy','我是来修改兄弟组件的')
        }
    },
}
</script>

<style scoped>
    div{
        width: 50px;
        height: 50px;
        border: 1px solid black;
    }
</style>