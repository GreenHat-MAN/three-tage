<template>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      :offset="300"
    >
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>

<script>
export default {
    name:'loadmore',
    props:['getFilmsRefresh','loadData'],
    data() {
        return {
            isLoading:false,  // 是否刷新
            loading:false,  // 是否加载更多
            finished:false , // 是否全部加载 
        }
    },
    methods: {
        onRefresh(){
            setTimeout(()=>{
                this.isLoading = false;
                this.$toast("刷新成功")
                this.getFilmsRefresh()
            },500)
        },
        onLoad(){
            setTimeout(()=>{
                this.loadData(()=>{
                    this.loading = false;
                    this.$toast("加载更多数据成功")
                },()=>{
                    this.finished = true;
                    this.$toast("数据见底了")
                })
            },500)
        }
    },
};
</script>