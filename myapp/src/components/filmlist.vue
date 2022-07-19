<template>
  <!-- 电影列表组件 -->
  <div>
    <ul class="flist">
      <li v-for="(l, i) in list" :key="i" class="litem">
        <router-link class="libox" :to="{ name: 'filminfo' , params:{filmId:l.filmId}}">
          <div class="left">
            <img :src="l.poster" alt="" class="limg" />
          </div>
          <div class="finfo">
            <div class="info-col fname">
              <span class="name">{{ l.name }}</span>
              <span class="item">{{ l.item.name }}</span>
            </div>
            <div class="info-col">
              <span class="label">观众评分</span>
              <span class="grade">{{ l.grade ? l.grade : "暂无评分" }}</span>
            </div>
            <div class="info-col actors">
              <span>主演: </span>
              <span v-for="(l, i) in l.actors" :key="i">{{ l.name }}</span>
            </div>
            <div class="info-col">
              <span>{{ l.nation }}</span> | <span>{{ l.runtime }}分钟</span>
            </div>
          </div>
        </router-link>
        <button
          @click.stop="gotofilmCinemas(l)"
          class="gou"
          :class="type == 2 ? 'yugou' : ''"
        >
          {{type==2?'预购':'购票'}}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "filmlist",
  props: {
    list: Array,
    type: [String, Number],
  },
  data() {
    return {};
  },
  methods: {
    gotofilmCinemas(l) {
      this.$router.push({
        name: "moviesit",
        params: {
          filmId: l.filmId,
        },
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.flist {
  margin-left: 15px;
  .litem {
    padding: 15px 15px 15px 0;
    // height: 94px;
    position: relative;
    width: 100%;
    border-bottom: 1px solid #ededed;
    background: #fff;
    .libox {
      display: flex;
      .left {
        .limg {
          width: 66px;
          height: 99px;
        }
      }
      .finfo {
        padding: 0 10px;
        margin-top: 1px;
        .fname {
          display: flex;
          align-items: center;
          width: 220px;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .actors {
          width: 220px;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          span {
            margin: 0 3px;
          }
        }
        .info-col {
          // overflow: hidden;
          // -o-text-overflow: ellipsis;
          // text-overflow: ellipsis;
          // white-space: nowrap;
          // overflow: hidden;
          // width: 100%;
          font-size: 13px;
          margin-top: 4px;
          color: #797d82;

          .name {
            color: #191a1b;
            font-size: 16px;
          }
          .item {
            font-size: 9px;
            color: #fff;
            background-color: #d2d6dc;
            height: 14px;
            line-height: 14px;
            padding: 0 2px;
            border-radius: 2px;
            margin: 5px;
          }
          .grade {
            color: #ffb232;
            font-size: 14px;
            margin: 0 4px;
          }
        }
      }
    }

    .gou {
      line-height: 25px;
      height: 25px;
      width: 50px;
      color: #ff5f16;
      font-size: 13px;
      text-align: center;
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      border: 1px solid #ff5f16;
      border-radius: 4px;
      background: transparent;
    }
    .yugou {
      color: #ffb232 !important;
      border-radius: #ffb232 !important;
    }
  }
}
</style>