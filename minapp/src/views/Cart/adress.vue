<template>

<div>
    <!-- 头部 -->
    <hearder title="地址管理" :back="true"></hearder>

    <div class="adress" v-if="userInfo">
        <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        />
    </div>   
    <div class="unadress" v-else>
      <div class="login-wrapper-img"></div>
      <p>你还没有登录哦～</p>
      <p>请先登录后查看地址管理</p>
      <div class="login-button" @click="gotoLogin">登录</div>
    </div>
</div>
    

    

</template>

<script>
export default {
    name:'adress',
    data() {
        return {
            chosenAddressId: '1',
            list:[],
            disabledList:[],
        }
    },
    methods: {
    // 获取地址信息
    async getAdress(){
        let res=await this.$ajax.getAdress({
            username:this.userInfo.username
        })
        // console.log(res);
        this.list=res;
    },
    onAdd() {
    //   Toast('新增地址');
    this.$router.push({name:'editadress'});
    },
    onEdit(item, index) {
    //   Toast('编辑地址:' + index);
        // console.log(item,index);
        this.$router.push({name:'updateadress',params:{items:item}});
    },
    gotoLogin(){
        this.$router.push({name:'login'});
    }
  },
  mounted() {
    this.userInfo?this.getAdress():'';
  },
}
</script>

<style lang="scss" scoped>

.unadress{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    .login-wrapper-img{
      width: 280px;
      height: 150px;
      background: url('../../../public/img/none.png') no-repeat;
      background-size: 100% 100%;
    }
    p{
          padding: 0;
          margin-top: 23px;
          font-size: 16px;
          color: #999;
          letter-spacing: 0;
          text-align: center;
          line-height: 24px;
    }
    .unadress p:last-of-type{
          margin-top: 0;
    }
    .login-button{
      margin-top: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 141px;
      height: 40px;
      color: #fff;
      background: #fb7299;
      box-shadow: 0 1px 4px 0 rgb(255 100 145 / 70%);
      border-radius: 40px;
    }
}

</style>