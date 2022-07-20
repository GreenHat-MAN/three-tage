<template>
  <div class="shop">
    <myheard title="电影商城" :back="false"></myheard>
    <div class="shop-box">
      <div class="shop-left">
        <van-sidebar v-model="activeKey" @change="changeActive">
          <van-sidebar-item v-for="(l, i) in goodTypes" :title="l.text" :key="i"
          />
        </van-sidebar>
      </div>
      <div class="shop-right">
        <GList :list="goodList" v-if="activeKey == 0"></GList>
        <GList
          :list="
            goodList.filter(
              (item) => item.type.text == goodTypes[activeKey].text
            )
          "
          v-else
        ></GList>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
    };
  },
  methods: {
    changeActive(index) {
      this.activeKey = index;
    },
  },
  mounted() {
    this.getGoodListAsync();
    // console.log(this.goodTypes);
  },
};
</script>

<style lang="scss" scoped>
.shop {
  &-box {
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    overflow: hidden;
    .shop-left {
      flex-shrink: 0;
    }
    .shop-right {
      flex: 1;
      flex-shrink: 0;
    }
  }
  ::v-deep .van-sidebar-item--select {
    .van-sidebar-item__text {
      color: #ee0a24;
    }
  }
}
</style>