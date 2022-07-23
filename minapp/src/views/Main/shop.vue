<template>
  <div class="box">
    <!-- 头部 -->
    <div class="header">
      <div class="content">
         会员购
      </div>
    </div>

    <!-- 购物主页分类 -->
    <div class="col">
      <!-- 搜索框 -->
      <div class="serach">
        <router-link class="ser" :to="{ name: 'search' }"
          ><span><van-icon name="search" />搜一搜</span></router-link
        >
      </div>
      <!-- 商品类别 -->
      <div class="category">
        <div class="item" v-for="(l, i) in gameList" :key="i">
          <router-link :to="{ name:l.name,query:{parentCategory:l.parentCategory,values:l.values,text:l.text} }">
            <div class="item-img">
              <img :src="l.background" />
            </div>
            <p class="desc">{{ l.text }}</p>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 试听 -->
    <div class="container">
      <router-link :to="{ name: '' }" class="con-left">
        <img src="../../../public/img/msic.png" />免费音频试听
      </router-link>

      <router-link :to="{ name: '' }" class="con-right">
        <img src="../../../public/img/book.png" />免费漫画试读
      </router-link>
    </div>

    <!-- 数据展示 -->
    <loadmore :getFilmsRefresh="getFilmsRefresh" :loadData="loadData">
    <div class="home">
        <div class="goods" v-for="(l, i) in goodsList" :key="i">
          <router-link :to="{name:'shopinfo',query:{itemsId:l.itemsId}}">
                <div class="goods-img">
                <div class="normal-img-container">
                  <img :src="l.firstImgUrl" />
                </div>
              </div>
              <div class="goods-info">
                <div class="desc-container">
                  <p class="goods-title">{{ l.title }}</p>
                </div>
                <div class="tag-list"></div>
                <p class="goods-price">
                  <span class="symbol">￥</span>
                  <span class="number">{{ l.price[0] }}</span>
                </p>
              </div>
          </router-link>
        </div>
    </div>
    </loadmore>

    <div class="line"></div>
  </div>
</template>

<script>
import PIC1 from "../../../public/img/手办.png";
import PIC2 from "../../../public/img/周边.png";
import PIC3 from "../../../public/img/漫展.png";
import PIC4 from "../../../public/img/今日上新.png";
import PIC5 from "../../../public/img/扭蛋.png";
import PIC6 from "../../../public/img/游戏.png";
import PIC7 from "../../../public/img/漫画.png";
import PIC8 from "../../../public/img/分类.png";
export default {
  name: "shop",
  data() {
    return {
      PIC1,
      PIC2,
      PIC3,
      PIC4,
      PIC5,
      PIC6,
      PIC7,
      PIC8,
      gameList: [],
      goodsList: [],
      pageNum: 1,
      pageSize: 10,
      total: 350,
    };
  },
  methods: {
    // 刷新请求
    async getFilmsRefresh() {
      let res = await this.$ajax.getShop(
        {
          pageNum: this.pageNum, // 页码
          pageSize: this.pageSize,
          network: "",
          mobi_app: "iphone",
          openEvent: "cold",
          build: 0,
          mVersion: 7,
          platform: "h5",
          feedType: 0,
        }
      );
      this.$nextTick(() => {
        this.goodsList = res.data.vo.list;
      });
    },

    // 加载更多
    async loadData(dataLoad, dataEnd) {
      this.pageNum++;
      if (this.pageNum > Math.ceil(this.total / this.pageSize)) {
        dataEnd();
      } else {
        let res = await this.$ajax.getShop({
          pageNum: this.pageNum, // 页码
          pageSize: this.pageSize,
          network: "",
          mobi_app: "iphone",
          openEvent: "cold",
          build: 0,
          mVersion: 7,
          platform: "h5",
          feedType: 0,
        });
        this.$nextTick(() => {
          this.goodsList = this.goodsList.concat(res.data.vo.list); // 数据累加
          dataLoad();
          console.log(this.goodsList);
        });
      }
    },

    // 获取首页商城数据
    async getDate(options) {
      let res = await this.$ajax.getShop(options);
      this.goodsList = res.data.vo.list;
      console.log(this.goodsList);
    },

  },
  
  mounted() {
    // 分类选项
    this.gameList = [
      { background: PIC1, text: "手办" ,name:'categoryinfo',parentCategory:'category_sb',values:'1_107'},
      { background: PIC2, text: "周边",name:'categoryinfo', parentCategory:'category_zb' ,values:'1_109'},
      { background: PIC3, text: "漫展演出", name:'503'},
      { background: PIC4, text: "今日上新", name:'404'},
      { background: PIC5, text: "潮玩扭蛋", name:'categoryinfo',parentCategory:'category_cwnd' ,values:'2_681'},
      { background: PIC6, text: "游戏相关", name:'categoryinfo',parentCategory:'category_game' ,values:'1_716'},
      { background: PIC7, text: "图书漫画", name:'categoryinfo',parentCategory:'category_book' ,values:'1_735'},
      { background: PIC8, text: "全部分类",name:'classify'},
    ];

    // 调用数据请求
    this.getDate({
      network: "",
      mobi_app: "iphone",
      openEvent: "cold",
      build: 0,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      mVersion: 7,
      platform: "h5",
      feedType: 0,
    });
  
  },

};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;

  .header{
    position: fixed;
    z-index: 101;
    left: 0;
    top: 0;
    background: #fff;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0;
    .content{
      position: relative;
      color: #000;
      font-weight: 600;
      height: 44px;
      line-height: 44px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      letter-spacing: 0;
      text-align: center;
    }
  }

  .col {
    background: #fff;
    .serach {
      margin-top: 50px !important;
      height: 30px !important;
      text-align: center;
      background: rgb(241, 242, 243);
      color: rgb(153, 153, 153);
      height: 30px;
      line-height: 30px;
      border-radius: 30px;
      vertical-align: middle;
      font-size: 0;
      position: relative;
      padding: 0 10px;
      margin: 0 auto;
      .ser{
        color: #000;
      }
      span {
        font-size: 14px;
        vertical-align: middle;
      }
    }
    .category {
      margin-top: 14px;
      display: flex;
      box-sizing: border-box;
      flex-wrap: wrap;
      padding: 0 10px;
      .item {
        width: 25%;
        height: 60px;
        margin-bottom: 10px;
        .item-img {
          margin: 0 auto;
          width: 40px;
          height: 40px;
          position: relative;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .desc {
          margin-top: 4px;
          font-size: 12px;
          text-align: center;
          color: #212121;
        }
      }
    }
  }

  .container {
    // width: 375px;
    min-height: 66px;
    display: flex;
    padding: 12px;
    background: #fff;
    .con-left,
    .con-right {
      margin-right: 12px;
      border: 1px solid #e7e7e7;
      border-radius: 4px;
      height: 42px;
      line-height: 42px;
      flex-grow: 1;
      text-align: center;
      font-size: 14px;
      color: #999;
      img {
        display: inline;
        width: 20px;
        height: 20px;
        position: relative;
        top: 4px;
        margin-right: 5px;
      }
    }
  }

  .home {
    position: relative;
    padding: 0 12px;
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    background: linear-gradient(180deg, #fff, #f4f4f4) no-repeat top, #f4f4f4;
    background-size: 100% 3.57rem, 100% 100%;
    outline: 0;
    border-style: none;
    .goods {
      overflow: hidden;
      margin-bottom: 7px;
      position: relative;
      display: flex;
      flex-direction: column;
      width: 172px;
      height: 266px;
      background-color: #fff;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 10%);
      border-radius: 4px;
      a{
        color: #212121; 
      }
      .goods-img {
        width: 172px;
        height: 163px;
        padding-top: 0;
        overflow: hidden;
        .normal-img-container {
          background: rgb(255, 255, 255);
          height: 180px;
          overflow: hidden;
          width: 100%;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .goods-info {
        position: relative;
        box-sizing: border-box;
        padding: 6px 8px 10px;
        .desc-container {
          position: relative;
          .goods-title {
            position: relative;
            font-family: PingFangSC;
            font-size: 12px;
            line-height: 18px;
            height: 36px;
          }
        }
        .tag-list {
          margin-top: 6px;
          height: 14px;
          font-size: 0;
        }
        .goods-price {
          margin-top: 4px;
          padding: 0 4px;
          color: #ff5687;
          letter-spacing: 0;
          font-size: 20px;
          .symbol {
            font-size: 14px;
          }
          .number {
            margin-left: -2px;
            font-size: 18px;
          }
        }
      }
    }
  }

  .line {
    height: 30px;
  }

}
</style>