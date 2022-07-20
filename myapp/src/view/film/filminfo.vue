<template>
  <!-- 点击影片进入影片详情 -->
  <div class="film" v-if="film">
    <!-- 头部 -->
    <myheard :title="film.name" :back="true" class="film-header"></myheard>

    <!-- 图片 -->
    <div class="lazy-img film-poster">
      <div class="padding">
        <img
          src="https://assets.maizuo.com/h5/v5/public/app/img/maizuo_padding.7c6a7f11.png"
        />
      </div>
      <div class="lazy-img-wrap">
        <img :src="film.poster" />
      </div>
    </div>

    <!-- 详情 -->
    <div class="film-detail">
      <div class="col">
        <div class="film-name">
          <span class="name">{{ film.name }}</span>
          <span class="item">{{ film.item.name }}</span>
        </div>

        <div class="film-grade">
          <span class="grade">{{ film.grade }}</span>
          <span class="grade-text">分</span>
        </div>
      </div>
      <div class="film-category grey-text">{{ film.category }}</div>
      <div class="film-premiere-time grey-text">2022-04-02上映</div>
      <div class="film-nation-runtime grey-text">
        {{ film.nation }} | {{ film.runtime }}
      </div>
      <!-- <div class="test grey-text">{{ film.synopsis }}</div> -->
      <div class="film-synopsis grey-text" ref="shows">
        {{ film.synopsis }}
      </div>
      <div class="toggle">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAYAAADwdn+XAAAAAXNSR0IArs4c6QAAAQlJREFUKBWNkT1Lw1AUht8TIlJExKlj/4WQFNIacWyHCoLQ1cXdj59g7e7i6CA4OAhOpbdNIKn2X3Ts1NGhocdzbgmk1NJmuCHnvM+Tc+8lEyVfDBzDxdVZtTrBDk8/SSrI8EbAzBH4EAwPc/qJ4/RkG28zklVGWefoYL8BQg/gcsYYmmjU2iQx8feFZjSrjLIyBTBgdjlKn8V4TUQszfsw8LtFkYnTW/lrh5lJoBeq+TenRJkV5EEzHN2B+LEY0t6KnOkhrHtPObMi0KKOCV68iqS03JoacC6T/QLUDmveRw7re02gRT2o+QKfdq9aAE33HDSDwB/bz8Lyr0D7y6uid5t1+XLTFf8Bk+NpPwQfd0oAAAAASUVORK5CYII="
        />
      </div>
    </div>

    <!-- 演员列表 -->
    <div class="actors">
      <div class="actors-title-bar">
        <span class="actors-title-text">演职人员</span>
      </div>
      <div class="row-scroll-wrapper actors-list">
        <ul class="row-scroll-items-nav">
          <li class="row-scroll-item" v-for="(l, i) in film.actors" :key="i">
            <div class="actors-item">
              <div class="lazy-img actors-img">
                <div class="padding">
                  <img
                    src="https://assets.maizuo.com/h5/v5/public/app/img/maizuo_padding.7c6a7f11.png"
                  />
                </div>
                <div class="lazy-img-wrap">
                  <img :src="l.avatarAddress" />
                </div>
              </div>
              <span class="actors-name">{{ l.name }}</span>
              <span class="actors-role">{{ l.role }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 剧照 -->
    <div class="photos">
      <div class="photos-title-bar">

        <span class="photos-title-text">剧照</span>
        <span class="photos-to-all"
          >全部({{film.photos.length}})
        ></span>

      </div>
        <div class="row-scroll-wrapper photos-list">
            <ul class="row-scroll-items-nav">
                <li class="row-scroll-item photos-item-wrap" v-for="(l,i) in film.photos" :key="i">
                    <div class="photos-item">
                        <div class="lazy-img photos-img">
                            <div class="padding">
                              <img src="https://assets.maizuo.com/h5/v5/public/app/img/maizuo_padding.7c6a7f11.png">  
                            </div>
                            <div class="lazy-img-wrap">
                                <img :src="l">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </div>
    
    <div class="nav"></div>

    <!-- 选座购票 -->
    <div class="goSchedule" @click="gotowhere({name:'moviesit',params:{filmId:film.filmId} })">
             选座购票 
    </div>

  </div>
  
</template>

<script>
export default {
  name: "filminfo",
  data() {
    return {
      film: null,
    };
  },
  methods: {
    // 请求电影详情信息
    async getInfo() {
      let res = await this.$ajax.getList(
        {
          filmId: this.$route.params.filmId,
        },
        {
          "X-Host": "mall.film-ticket.film.info",
        }
      );
      this.film = res.data.film;
      console.log(this.film);
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>
.film {
    position: relative;
    min-height:100%;
    .nav{
        height:49px ;
    }
    .goSchedule{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 49px;
        width: 100%;
        text-align: center;
        background-color: #ff5f16;
        color: #fff;
        font-size: 16px;
        line-height: 49px;
    }
  .film-header {
    position: fixed;
    background-color: rgba(255, 255, 255, 0);
    color: transparent;
    transition: all 0.3s ease 0s;
    width: 100vw;
    height: 44px;
    z-index: 1;
  }
  .lazy-img {
    width: 100%;
    background: rgb(249, 249, 249);
    position: relative;
    box-sizing: border-box;
  }
  .padding {
    height: 56vw;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    img {
      width: 64px;
    }
  }
  .lazy-img-wrap {
    width: 100%;
    background: rgb(249, 249, 249);
    opacity: 1;
    display: block;
    position: absolute;
    overflow: hidden;
    top: 0px;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    height: 56vw;
    img {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0px;
      color: #2c3e50;
    }
  }

  .film-detail {
    padding: 15px;
    padding-top: 12px;
    background-color: #fff;
    .col {
      display: flex;
      justify-content: flex-start;
      -webkit-box-align: center;
      align-items: center;
      box-sizing: border-box;

      .film-name {
        width: 256px;
        .name {
          color: #191a1b;
          font-size: 18px;
          height: 24px;
          line-height: 24px;
          margin-right: 7px;
        }
        .item {
          font-size: 9px;
          color: #fff;
          background-color: #d2d6dc;
          height: 14px;
          line-height: 14px;
          padding: 0 2px;
          border-radius: 2px;
          display: inline-block;
        }
      }
      .film-grade {
        width: calc(100% - 250px);
        text-align: right;
        color: #ffb232;
        .grade {
          font-size: 18px;
          font-style: italic;
        }
        .grade-text {
          font-size: 10px;
        }
      }
    }
    .grey-text {
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
      box-sizing: border-box;
    }
    .text {
      width: calc(100vw - 30px);
      opacity: 0;
      position: absolute;
      top: 1px;
      margin-left: -10000px;
      box-sizing: border-box;
    }
    .film-synopsis {
      margin-top: 12px;
      height: 58px;
    }
    .hidde {
      height: 38px !important;
      overflow: hidden;
    }
    .toggle {
      text-align: center;
      display: block;
      height: auto;
      width: 20px;
      margin: auto;
      line-height: normal;
      img {
        width: 8px;
        margin: auto;
        line-height: normal;
      }
    }
    .upper {
      transform: rotate(180deg);
    }
  }

  // 演员列表
  .actors {
    margin-top: 10px;
    background-color: #fff;
    .actors-title-bar {
      width: 100%;
      padding: 15px;
      .actors-title-text {
        font-size: 16px;
        text-align: left;
        color: #191a1b;
        span {
          display: inline-block;
          height: 22.5px;
          line-height: 22px;
        }
      }
    }
    .row-scroll-wrapper {
      height: 140px;
      background: rgb(255, 255, 255);
      overflow-x: auto;
      overflow-y: hidden;
      .row-scroll-items-nav {
        display: flex;
        justify-content: flex-start;
        position: relative;
        width: 100%;
        margin: 0;
        padding-left: 15px;
        list-style: none;
        .row-scroll-item {
          width: 85px;
          min-width: 85px;
          position: relative;
          margin-right: 10px;
          cursor: pointer;
          display: block;
          float: left;
          list-style: none;
          padding: 0;
          margin: 0;
          .actors-item {
            text-align: center;
            .lazy-img {
              width: 85px;
              height: 85px;
              background: rgb(249, 249, 249);
              position: relative;
              .padding {
                width: 85px;
                height: 85px;
                background: rgb(249, 249, 249);
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  width: 64px;
                }
              }
              .lazy-img-wrap {
                width: 85px;
                height: 85px;
                background: rgb(249, 249, 249);
                opacity: 1;
                display: block;
                position: absolute;
                overflow: hidden;
                top: 0;
                img {
                  width: 100%;
                  position: absolute;
                  top: 50%;
                  left: 0;
                }
              }
            }
            .actors-name {
              display: block;
              text-align: center;
              padding-top: 10px;
              font-size: 12px;
              color: #191a1b;
              width: 85px;
              height: 18px;
              //   overflow: hidden;
              //   text-overflow: ellipsis;
              //   white-space: nowrap;
            }
            .actors-role {
              margin-top: 10px;
              display: block;
              text-align: center;
              font-size: 10px;
              color: #797d82;
            }
          }
        }
      }
    }
  }

    // 剧照
    .photos{
        margin-top: 10px;
        margin-bottom: 60px;
        background-color: #fff;
        box-sizing: border-box;
        .photos-title-bar{
            height: 62px;
            width: 100%;
            padding: 15px;
            .photos-title-text{
                font-size: 16px;
                text-align: left;
                color: #191a1b;
                display: inline-block;
                height: 22.5px;
                line-height: 22px;
            }
            .photos-to-all{
                    font-size: 13px;
                    color: #797d82;
                    float: right;
                    display: block;
                    height: 22.5px;
                    line-height: 22px;
            }
        }
        .row-scroll-wrapper{
                height: 115px;
                background: rgb(255, 255, 255);
                overflow-x: auto;
                overflow-y: hidden;
                .row-scroll-items-nav{
                    display: flex;
                    justify-content: flex-start;
                    position: relative;
                    width: 100%;
                    margin: 0;
                    padding-left: 15px;
                    list-style: none;
                    padding: 0;
                    .row-scroll-item{
                        min-width: 150px;
                        position: relative;
                        margin-right: 10px;
                        cursor: pointer;
                        display: block;
                        float: left;
                        list-style: none;
                        padding: 0;
                        margin: 0;
                        .photos-item{
                            .lazy-img{
                                width: 150px;
                                height: 100px;
                                background: rgb(249, 249, 249);
                                position: relative;
                                .padding{
                                    width: 150px;
                                    height: 100px;
                                    background: rgb(249, 249, 249);
                                    display: flex;
                                    justify-content: center; 
                                    align-items: center;
                                    img{
                                        width: 64px;
                                    }
                                }
                                .lazy-img-wrap{
                                   width: 150px;
                                    height: 100px;
                                    background: rgb(249, 249, 249);
                                    opacity: 1;
                                    display: block;
                                    position: absolute;
                                    overflow: hidden;
                                    top: 0;
                                    img{
                                    width: 100%;
                                    position: absolute;
                                    top: 50%;
                                    left: 0;
                                    }
                                } 
                                }
                            }
                        }
                    }
                }
        }
    }

</style>