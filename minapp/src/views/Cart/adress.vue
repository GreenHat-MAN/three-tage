<template>

<div>
    <!-- 头部 -->
    <hearder title="地址管理" :back="true"></hearder>

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
            phone:this.userInfo.phone
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
        console.log(item,index);
        this.$router.push({name:'editadress',params:{items:item}});
    },
  },
  mounted() {
    this.getAdress();
  },
}
</script>

<style>

</style>