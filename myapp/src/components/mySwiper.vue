<template>
  <div class="swiper-container" :id="id">
    <div class="swiper-wrapper">
     <!-- 插槽放置动态轮播图的内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 导入轮播图插件
import swiper from 'swiper';
export default {
    name:'MySwipe',
    props:{
        id:{
            type:String,
            default(){
                return "sbox"
            }
        },
        options:{
            type:Object,
            default(){

            }
        }
    },
    mounted() {
        // 实例化轮播图
      let myswiper=new swiper("#"+this.id,this.options)  
    },
};
</script>

<style>
</style>