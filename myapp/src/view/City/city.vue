<template>
  <!-- 城市定位信息 -->
  <div class="city">
    <myheard
      :title="$route.query.name ? '当前城市-' + $route.query.name : '城市定位'"
    ></myheard>
    <div class="searchbar">
      <van-search
        v-model="keyword"
        show-action
        placeholder="输入城市名或拼音"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
    <div class="indexlist" v-if="flag">
      <div class="hot-city">
        <p class="city-index-title">热门城市</p>
        <ul class="clist">
          <li
            class="item"
            @click="chooseCity(l)"
            v-for="(l, i) in hotCity"
            :key="i"
          >
            <div class="city">
              {{ l.name }}
            </div>
          </li>
        </ul>
      </div>
      <van-index-bar>
        <div v-for="(l, i) in indexList" :key="i">
          <van-index-anchor :index="l" />
          <van-cell
            :title="item.name"
            @click="chooseCity(item)"
            v-for="(item, index) in cityList.filter(
              (v) => v.pinyin.indexOf(l.toLowerCase()) == 0
            )"
            :key="index"
          />
        </div>
      </van-index-bar>
    </div>
    <div class="searchlist" v-else>
      <div class="slist" v-if="slist.length > 0">
        <van-cell
          :title="item.name"
          @click="chooseCity(item)"
          v-for="(item, index) in slist"
          :key="index"
        />
      </div>
      <div v-else>
        <van-empty
          image="data:image/png;base64,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"
          description="没有找到匹配的城市"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      keyword: "",
      flag: true,
      indexList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      slist: [], // 搜索得到的数据
    };
  },
  methods: {
    chooseCity(city) {
      console.log(city);
      this.changeCity(city); //选择城市
      this.$router.go(-1);
    },
    onSearch(value) {
      console.log(value);
      this.flag = false;
      this.slist = this.cityList.filter(
        (item) =>
          item.name.indexOf(value) != -1 || item.pinyin.indexOf(value) != -1
      );
    },
    onCancel() {
      this.flag = true;
      this.slist = [];
    },
    async getcityinfo() {
      let res = await this.$ajax.getList(
        {},
        {
          "X-Host": "mall.film-ticket.city.list",
        }
      );
      this.changeCityList(res.data.cities);
    },
  },
  mounted() {
    this.getcityinfo();
  },
  beforeRouteLeave(to, from, next) {
    // ...
    if (this.city) {
      next();
    } else {
      next(false);
      this.$toast("请先选择当前定位的城市!!!");
    }
  },
};
</script>

<style lang="scss" scoped>
.city {
  .hot-city {
    background-color: #fff;
    padding-left: 15px;
    padding-top: 15px;
    .city-index-title {
      font-size: 13px;
      color: #797d82;
      margin-bottom: 10px;
      margin-left: 5px;
    }
    .clist {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: calc(33.33333vw - 11px);
        text-align: center;
        padding-bottom: 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        .city {
          height: 30px;
          background-color: #f4f4f4;
          line-height: 30px;
          border-radius: 3px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin: 0 7.5px;
          font-size: 14px;
          color: #191a1b;
        }
      }
    }
  }
}
</style>