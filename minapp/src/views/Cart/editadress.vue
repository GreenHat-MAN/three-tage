<template>
  <div>
    <!-- 头部 -->
    <hearder title="编辑收货地址" :back="true"></hearder>

    <!-- 编辑 -->
        <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      :address-info="{
          name: from[0].name,
          tel: from[0].phone,
          addressDetail: from[0].address,
       }"
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
      searchResult: [],
      from:[],
    };
  },
  methods: {
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
  mounted() {
    // console.log(this.$route.params.items);
    this.from.push(this.$route.params.items)
    // console.log(this.from);
  },
};
</script>

<style>
</style>