<template>
  <div>
    <h4>登录框(局部组件)</h4>
    <label for="">用户名:</label><input type="text" :value='username'>
    <br>
    <label for="">密码:</label><input type="text" :value='password'>
  </div>
</template>

<script>
export default {
    data() {
        return {
            username:'罗先略',
            password:123456,
        }
    },
}
</script>

<style lang="scss" scoped>

    div{
        width: 300px;
        height: 100px;
        border: 1px solid black;
    }

</style>