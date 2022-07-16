<template>
  <van-nav-bar :title="title">
    <template #left>
      <!-- 插槽动态显示数据 -->
      <slot v-if="back">
        <span class="back" @click="goback">
          <van-icon name="arrow-left" size="18" color="#f50" />返回
        </span>
      </slot>
    </template>

    <template #right>
      <van-popover
        v-model="showPopover"
        trigger="click"
        :actions="actions"
        @select="onSelect"
        theme="dark"
        placement="bottom-end"
      >
        <template #reference>
          <van-icon name="ellipsis" size="18" />
        </template>
      </van-popover>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: "myheard",
  props: {
    title: String,
    back: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
        showPopover:false,
            actions:[
                { text: '搜索', icon: 'search',name:'search' , disabled:this.$route.name=='search'},
                { text: '主页', icon: 'wap-home-o',name:'movie' ,disabled:this.$route.name=='movie'},
                { text: '影院', icon: 'user-o',name:'mine',disabled:this.$route.name=='cinema' },
                { text: '新片', icon: 'points',name:"news",disabled:this.$route.name=='news' },
                { text: '购物', icon: 'photo-o',name:"shop",disabled:this.$route.name=='shop'}  
            ]
    }
  },
  methods: {
    onSelect(value){
            console.log(value)
            this.$router.push({name:value.name})
        }
  },
};
</script>

<style>
.back {
  display: flex;
  align-items: center;
  color: #f50;
}
</style>