<template>
  <div class="box">
    <van-search
      v-model="value"
      shape="round"
      show-action
      placeholder="Product, brand, IP name"
      @search="onSearch"
      @cancel="onCancel"
      background="#fb7299"
    >
      <template #action>
        <div @click="onCancel">cancel</div>
      </template>
    </van-search>


    <van-tabs v-model="active" animated @change="changeActive">
      <van-tab title="commodity">
        <searchres :list="resList"></searchres>
      </van-tab>
      <van-tab title="Diffuse Exhibition">
        <searchres :list="resList"></searchres>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      value:'',
      active: 0,
      content:'',
      resList:[],
    }
  },
  methods: {
    // 查询方法
    async getResult(){
      let res=await this.$ajax.searchSug({
        term: this.content,
        type: this.active+1,
        platform: 'h5'
      });
      this.$nextTick(()=>{
          this.resList=res.data.vo;
          console.log(this.resList);
      })
    },

    changeActive(name){
      if(this.content!=null){
        this.active=name;
        this.getResult()
      }
    },

    onSearch(val) {
        //根据输入的内容查询
      // console.log(val);
      this.content=val;
      this.getResult(); 
    },

    onCancel() {
      // 点击取消按钮并返回
      this.goback();
    },

  },
};
</script>

<style>
</style>