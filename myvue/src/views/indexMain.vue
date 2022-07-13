<!-- 默认的主页面 -->
<template>
  <div>
    <h2>主页面</h2>
    <div>
      <h4>以下数据都是从vuex仓库取出</h4>
      <ol>
        <li>姓名:{{ name }}</li>
        <li>年龄:{{ age }}</li>
        <li>住址:{{ adress }}</li>
        <li><button @click="add(10)">年龄增加</button></li>
      </ol>
      <p>
        data对象下的值:{{data.first}}和{{data.second.third}}<br>
        <!-- obj对象下的值:{{obj.first}}和{{obj.second.third}}<br> -->
        <button @click="updateobj(100,200)">通过深拷贝修改对象下的值</button>
      </p>
    </div>
  </div>
</template>

<script>
// 导入vuex中的辅助函数
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      // 普通获取数据的方式
      // username:this.$store.state.name,
      // age:this.$store.state.age,
      // adress:this.$store.state.adress
    };
  },

  computed: {

    // 利用计算属性取值搭配辅助函数
    // ...mapState({
    //   //状态的映射关系
    //   username: (state) => state.name, //方法一
    //   age: "age", //方法二字符串传参简写方法一
    //   adress(state) {
    //     return state.adress; //方法三
    //   },
    // }),
    // 直接全部使用简写方式但是变量名需要一致
    ...mapState(['name','age','adress','data','obj']),

  },

  methods: {
    //修改store仓库的值
    // add(val){
    //   //普通方法
    //   this.$store.commit('add',val)
    // },

    // 使用辅助函数
    // ...mapMutations(['add','updateobj']),

    updateobj(num1,num2){
      this.$store.commit('updateobj',[num1,num2])
    }

  },




};
</script>

<style>
</style>