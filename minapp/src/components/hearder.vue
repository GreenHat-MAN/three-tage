<template>

  <van-nav-bar :title="title">

    <template #left>
      <!-- 插槽动态显示数据 -->
      <slot v-if="back">
        <span class="back" @click="goback">
          <van-icon name="arrow-left" size="18" color="#f50" />
        </span>
      </slot>
    </template>
    <template #right>
        <slot v-if="!back">
            <van-icon name="replay" size="18" />
            <span class="logins" @click="goLogin" v-text="text">
                
            </span>
        </slot>
    </template>

    </van-nav-bar>

</template>

<script>
export default {
  name: "hearder",
   props: {
    title: String,
    back: {
      type: Boolean,
      default: true,
        }
    },
  data() {
    return {
        text:'Change it',
    };
  },
  methods: {
    goLogin(){
        if(this.$route.name=='login'){
            this.$router.push({name:'phone'});
        }else if(this.$route.name=='phone'){
            this.$router.push({name:'login'});
        }
    }
  },

};
</script>

<style>
</style>