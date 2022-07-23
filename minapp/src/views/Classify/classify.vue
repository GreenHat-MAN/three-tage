<template>
<!-- 分类栏 -->
<div class="shop">
    <!-- 头部搜索框 -->
    <van-search shape="round" background="#fb7299" placeholder="商品、品牌、IP名" @click="toSearch"/>
        <div class="shop-box">
            <div class="shop-left">
                <van-sidebar v-model="activeKey" @change="changeActive">
                    <van-sidebar-item :title="l.typeName" v-for="(l,i) in tyList" :key="i" />
                </van-sidebar>
            </div>
            <div class="shop-right">
              
            </div>
        </div>

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
      changeActive(){

      },
      toSearch(){
        this.$router.push({name:'search'})
      },
      async getCategory(){
        let res=await this.$ajax.getCategory({
          shopId: 2233
        })
        console.log(res.data.vo);
        this.tyList=res.data.vo;
      }
    },
    mounted() {
      this.getCategory();
    },
}
</script>

<style lang="scss" scoped>
// .shop{
//     &-box{
//         width:100%;
//         height:calc(100vh - 100px);
//         display: flex;
//         overflow: hidden;
//         .shop-left{
//             flex-shrink: 0;
//         }
//         .shop-right{
//             flex:1;
//             flex-shrink: 0;
//         }
//     }
//     ::v-deep .van-sidebar-item--select{
//         .van-sidebar-item__text{
//             color:#ee0a24;
//         }
//     }
// }
  .shop-box{
      display: flex;
      justify-content: space-between;
      .shop-left{
        width: 22%;
        overflow: scroll;
      }
      .shop-left{
        width: 78%;
        overflow: scroll;
      }
  }
</style>