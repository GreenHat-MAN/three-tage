<template>
  <div class="cinema">
    <myheard title="电影院" :back="true">
      <span
        v-if="city"
        @click="gotowhere({ name: 'city', query: { name: city.name } })"
      >
        {{ city.name }} <van-icon name="arrow-down" color="#000"
      /></span>
      <span v-else></span>
    </myheard>

    <!-- 影院排序 -->

    <div class="menu">
      <van-dropdown-menu class="menu-box">
        <van-dropdown-item :title="obj.areaname" ref="item">
          <van-grid class="grid" :gutter="10" :border="true" :column-num="4">
            <van-grid-item
              @click="changeArea(l)"
              v-for="(l, i) in areas"
              :key="i"
              :class="obj.areaname == l.name ? 'active' : ''"
            >
              {{ l.name }}
            </van-grid-item>
          </van-grid>
        </van-dropdown-item>
        <van-dropdown-item v-model="obj.sort" :options="option" />
      </van-dropdown-menu>
    </div>

    <div class="cinlist">
      <CList :list="cinemaList"></CList>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 电影院数据
      list: [],
      // 全城数据
      areas: [
        {
          name: "全城",
          districtId: -1,
        },
      ],
      value: 0,
      option: [
        { text: "默认排序", value: 0 },
        { text: "价格升序", value: 1 },
        { text: "价格降序", value: 2 },
      ],
      obj: {
        // 数组操作的条件
        areaname: "全城",
        sort: 0,
      },
    };
  },
  methods: {
    async getAllCinemas() {
      let res = await this.$ajax.getList(
        {
          cityId: this.city.cityId,
        },
        {
          "X-Host": "mall.film-ticket.cinema.list",
        }
      );
      // 数组去重
      var obj = {}; //  obj.江夏区 = 江夏区
      for (var i = 0; i < res.data.cinemas.length; i++) {
        var item = res.data.cinemas[i];
        if (!obj[item.districtName]) {
          obj[item.districtName] = item.districtName;
          this.areas.push(item.district);
        }
      }
      this.list = res.data.cinemas;
      this.changeCinemaList(res.data.cinemas); //vuex 数据
    },
    ascSort(a, b) {
      return a["lowPrice"] - b["lowPrice"];
    },
    descSort(a, b) {
      return b["lowPrice"] - a["lowPrice"];
    },
    changeArea(l) {
      this.obj = {
        ...this.obj,
        areaname: l.name,
      };
      this.$refs.item.toggle();
    },
  },
  mounted() {
    if (this.city) {
      this.getAllCinemas();
    } else {
      this.$dialog
        .alert({
          title: "友情提示",
          message: "你还没有定位,请先去定位哦.",
          theme: "round-button",
        })
        .then(() => {
          // on close
          this.$router.push({ name: "city" });
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.cinlist {
  padding-bottom: 49px;
}

.menu {
  .grid {
    padding: 20px 0;
    .active {
      ::v-deep .van-grid-item__content {
        border: 1px solid #ff5f16;
        color: #ff5f16 !important;
      }
      // ::v-deep .van-grid-item__text{
      //     color:#ff5f16 !important;
      // }
    }
    ::v-deep .van-grid-item__content {
      padding: 12px 5px;
      border-color: #999;
    }
  }
}
</style>