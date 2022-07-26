<template>
    
    <div>
    <!-- 头部 -->
    <hearder title="Modify receiving address" :back="true"></hearder>

    <!-- 修改地址 -->
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :area-columns-placeholder="['Please select', 'Please select', 'Please select']"
      @save="onSave"
      @delete="onDelete"
      :address-info="{
          name: info[0].name,
          tel: info[0].tel,
          addressDetail: info[0].dq,
          areaCode: info[0].areaCode,
          postalCode: info[0].postcode,
          isDefault: info[0].isdefault==0?false:true,
          username:info[0].username,
          id:info[0].id
       }"
      />
    </div>
    

</template>

<script>
import { areaList } from '@vant/area-data';
export default {
    name:'updateadress',
    data() {
        return {
            areaList,
            info:[],//地址列表初始值
            isdefault:'',
        }
    },
    methods: {
        // 修改地址信息
        async onSave(name){
            // console.log(name);
            let res=await this.$ajax.updateAdress(name.id,{
                address:`${name.province}/${name.city}/${name.county}`,//地址
                name:name.name,//姓名
                tel:Number(name.tel),//手机号
                dq:name.addressDetail,//地区信息
                isDefault:Boolean(name.isDefault=='flase'?0:1),//是否设为默认地址
                postcode:name.postalCode,//邮编
                areaCode:name.areaCode,
                username:this.userInfo.username
            });
            if(res){
                this.$toast.success('Successfully modified!!!');
                this.goback();
            }
            
        },
        async onDelete(){
            let res=await this.$ajax.delAdress(this.info[0].id,{});
            this.$toast.success('Successfully deleted!!!');
            this.goback();
        }
    },
    mounted() {
        this.info.push(this.$route.params.items);
        // console.log(this.info[0]);
    },
}
</script>

<style>

</style>