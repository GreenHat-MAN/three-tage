<template>
<!-- 分类栏 -->
<div class="shop">
    <!-- 头部搜索框 -->
    <van-search shape="round" class="serch" background="#fb7299" placeholder="Product, brand, IP name" @click="toSearch"/>
        <div class="shop-box">
            <div class="shop-left">
                <van-sidebar v-model="activeKey" @change="changeActive">
                    <van-sidebar-item :title="l.typeName" v-for="(l,i) in tyList" :key="i" />
                </van-sidebar>
            </div>
            <div class="shop-right">
              <classlist :list="tyList[activeKey]" :name="tyList[activeKey].typeName"></classlist>
            </div>
        </div>

    <div class="line"></div>

    <!-- 底部导航 -->
    <footers></footers>
</div>
</template>

<script>
export default {
    name:'classify',
    data() {
      return {
        activeKey:0,
        tyList:[],
      }
    },
    methods: {
      changeActive(index){
        this.activeKey=index;
      },
      toSearch(){
        this.$router.push({name:'search'})
      },
      async getCategorys(){
        let res=await this.$ajax.getCategory({
          shopId: 2233
        })
        // console.log(res.data.vo);
        this.tyList=res.data.vo;
      }
    },
    mounted() {
      this.getCategorys();
    },
}
</script>

<style lang="scss" scoped>
.shop{
    &-box{
        margin-top: 50px;
        width:100%;
        // height:calc(100vh - 100px);
        display: flex;
        overflow: hidden;
        .shop-left{
            flex-shrink: 0;
        }
        .shop-right{
            flex:1;
            flex-shrink: 0;
            background: #fff;
        }
    }
    :deep(.van-sidebar-item--select){
        .van-sidebar-item__text{
            color:#ee0a24;
        }
    }
    .serch{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 100;
    }
}
.line{
  margin-top: 20px;
  width: 100%;
  height: 20px;
}
</style>