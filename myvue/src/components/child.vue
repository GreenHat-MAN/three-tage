<!-- 第一子组件boy -->
<template>
  <div>
    <h3>第一个子组件boy</h3>
    <p>修改父组件的数量:<button @click="add">增加</button></p>
    <p>修改父组件的标题:{{title}}</p>
    <p><input type="text" @input="changetxt" ref="chantxt"></p>


    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
    props:{
        title:String,
        changetxt:Function
    },
    data() {
        return {
            msg:'123'
        }
    },
    methods: {
        add(){
            this.$parent.num++
        }
    },
    mounted() {
        this.$bus.$on('changboy',val=>{
            this.msg=val
        })

        
    },
    watch:{
        changetxt(){
            this.msg=this.$refs.chantxt.value
        }
    }
}
</script>

<style scoped>
        div{
                width: 50px;
                height: 50px;
                border: 2px solid pink;
            }
</style>