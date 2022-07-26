<template>
  <div>
    <!-- 头部 -->
    <hearder title="Add receiving address" :back="true"></hearder>

    <!-- 地址新增 -->
    
      <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :area-columns-placeholder="['Please select', 'Please select', 'Please select']"
      @save="onSave"
      />
      
    
  </div>
</template>


<script>
import { areaList } from '@vant/area-data';
export default {
  name: "editadress",
  data() {
    return {
      areaList,
      isdefault:'',//是否设为默认地址
    };
  },
  methods: {
    async onSave(name) {
      console.log(name);
      // 新增收货地址信息
      let data=await this.$ajax.getAdress({
        username:this.userInfo
      })
      let res=await this.$ajax.postAdress({
        address:`${name.province}/${name.city}/${name.county}`,//地址
        name:name.name,//姓名
        tel:Number(name.tel),//手机号
        dq:name.addressDetail,//地区信息
        isDefault:Boolean(name.isDefault=='flase'?0:1),//是否设为默认地址
        postcode:name.postalCode,//邮编
        areaCode:name.areaCode,
        username:this.userInfo.username
      })
      // console.log(res);
      if(JSON.stringify(data).indexOf(JSON.stringify(res)) === -1){
        this.$toast.success('Address added successfully!!!');
         this.$router.push({name:'mine'});
      }else{
        this.$toast.filed('The address already exists');
      }
    },
  },
};
</script>

