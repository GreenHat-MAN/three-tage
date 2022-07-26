<template>
  <van-pull-refresh
    v-model="isLoading"
    success-text="Refresh successful"
    @refresh="onRefresh"
  >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="No more"
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
                this.$toast("Refresh successful")
                this.getFilmsRefresh()
            },500)
        },
        onLoad(){
            setTimeout(()=>{
                this.loadData(()=>{
                    this.loading = false;
                    this.$toast("Loading more data succeeded")
                },()=>{
                    this.finished = true;
                    this.$toast("Data bottomed out")
                })
            },500)
        }
    },
};
</script>