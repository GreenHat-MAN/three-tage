<template>
  <div>
    <h1>{{err}}</h1>
  </div>
</template>

<script>
export default {
    data() {
        return {
            err:404
        }
    },
}
</script>

<style scoped>
    div{
        width: 500px;
        height: 500px;
        background: red;
        text-align: center;
        line-height: 500px;
        font-size: 30px;
    }
</style>