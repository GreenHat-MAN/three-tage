<template>
  <div class="box">
    <!-- 头部 -->
    <hearder :back="true" class="hearder"></hearder>

    <!-- 轮播图 -->
    <div class="swiper">
      <van-swipe @change="onChange">
      <van-swipe-item v-for="(l,i) in shopList.img" :key="i"><img :src="l"></van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{line}}</div>
      </template>
      </van-swipe>
    </div>

    <!-- app -->
    <div class="app">
      <div class="appcenter">
        <div class="appbtn">APP内打开，查看高清图片</div>
      </div>
    </div>

    <!-- 详细信息 -->
    <div class="boxs">
      <div class="info">

        <div class="price">
          <span class="symbol">￥</span>
          <span class="num">{{shopList.price}}</span>
        </div>

        <div class="text-info">

            <div class="infos">
              <div class="text-title">
               {{shopList.name}}
              </div>
              <p>{{shopList.brief}}
              </p>
            </div>

            <div class="rank-tags">
          <div class="rank-tag">
            <div class="rank-tag-icon"></div>
            <div class="rank-tag-content">
              <div class="word-ellipsis-1">
                 SSF榜No.{{shopList.tags?shopList.tags:'暂无排名'}}
              </div>
            </div>
            
          </div>
            </div>
            
        </div>

    </div>
    </div>

    <div class="sendContent">
      <textarea v-model="valCon"></textarea>
      <button @click="sendContent">发布</button>
    </div>

    <!-- 评论内容 -->
    <div class="contents">
      <ul>
        <li v-for="(l,i) in contentList" :key="i">
          Comment content:{{l.content}},<br>
          name:{{l.name}},<br>
          Release time:{{l.time | dateFormat}}
        </li>
      </ul>
    </div>

    
    
    <div class="line"></div>

    <!-- 点击加入购物车 -->
    <van-goods-action>
    <van-goods-action-icon 
     icon="like-o"
      :color ="hasLike?'#f50':'#999'" 
      :text ="hasLike?'Liked':'thumbs-up'"
      @click="toLike"
      :badge="likeCount" 
      />
    <van-goods-action-icon icon="shop-o" text="cart" @click="toCart" :badge="cartLent" />
    <van-goods-action-button color="#be99ff" type="warning" text="add to cart" @click="addCart" />
    <van-goods-action-button color="#7232dd" type="danger" text="Buy now" />
    </van-goods-action>   
    
    
  </div>
</template>

<script>
export default {
  name: "shopinfo",
  data() {
    return {
      valCon:'',//评论内容
      itemsId: "",//商品id
      current: 0,//轮播下标
      line:'',//具体那张轮播页数
      shopList:[],//商品信息
      count:1,//数量初始化
      cartLent:'',//加入购物车的图标数量
      hasLike: false, // 是否已经点赞
      likeCount: 0, // 点赞次数
      contentList:[],//评论内容
    };
  },
  methods: {

    // 去购物车查看
    toCart(){
       this.checkIsLogin(async()=>{
        // 判断用户是否登录
        this.$router.push({name:'cart'});
       })
    },

    // 发请求获取商品详情数据
    async getShopitem(){
      let res=await this.$ajax.getShopInfo({
        itemsId: this.itemsId,
        shopId:'',
        itemsVersion:''
      })
      this.$nextTick(() => {
           this.shopList=res.data;
           this.line=res.data.img.length;
          //  console.log(this.shopList);
        });
    },

    // 轮播发生改变
    onChange(index) {
      this.current = index;
    },

    // 加入购物车
    addCart(){
      // 判断用户是否登录
      this.checkIsLogin(async()=>{
        // 判断该用户下的购物车是否被添加过
        let res=await this.$ajax.getCarts({
          phone: this.userInfo.phone,
          goodId: this.itemsId,
        });
        if (res.length > 0) {
            let data = res[0];
            let res2 = await this.$ajax.updateGood(data.id, {
                count: data.count+1,
            });
            this.$toast.success("Again once!!!");
        } else {
          // 表示没添加过
          let res3 = await this.$ajax.postGood({
            phone: this.userInfo.phone,
            goodId: this.itemsId,
            good: this.shopList,
            count: this.count,
            time: new Date(), // 购买时间
          });
          this.$toast.success("Add to Cart sucess!!!");
          this.getType();
        }
      });
    },

    // 查询种类
   async getType(){
      let res=await this.$ajax.getCarts({phone:this.userInfo.phone});
      this.cartLent=res.length;
    },

    // 点赞功能实现
    // 判断当前用户是否点过赞
    async getHasLike(){
      let res=await this.$ajax.getLikes({
          phone:this.userInfo.phone,
          goodId:this.itemsId
      })
      //强制类型转换,如果返回来的数值长度不大于1则表示没点过赞,将0转换为false
      this.hasLike=!!res.length;
    },
    // 获取点赞次数
    async getLikeCount(){
        let res=await this.$ajax.getLikes({
            goodId:this.itemsId
        })
        this.likeCount=res.length
    },
    // 用户点赞切换
    toLike(){
        // 用户登录才能点赞
        this.checkIsLogin(async()=>{
            // 判断当前是否已经点赞
            if(this.hasLike){
                // 已经点过再次点击删除点赞
                let data = await this.$ajax.getLikes({
                        goodId:this.itemsId,
                        phone:this.userInfo.phone 
                })
                let res=await this.$ajax.deleteCarts(data[0].id)
                this.likeCount--;
                this.hasLike=false;
                this.$toast('Is cancel!!!');
            }else{
                // 还没点过
                let res=await this.$ajax.addToLikes({
                    goodId:this.itemsId,
                    phone:this.userInfo.phone,
                    good:this.shopList,
                })
                this.likeCount++;
                this.hasLike=true;
                this.$toast('Is support!!!');
            }
        })
    },

    // 用户评论内容获取
    async getCont(){
      // 判断该商品下是否存在评论内容
      let res=await this.$ajax.getContent({
        shopId:this.itemsId
      });
      if(res.length>0){
        // 表示有评论内容
        this.contentList=res;
      }else{
        this.$toast.success('该商品还没有评论,赶快发表第一条!!')
      }
    },

    // 发送评论内容
    sendContent(){
      this.checkIsLogin(async()=>{
          let res=await this.$ajax.addContent({
              shopId:this.itemsId,
              name:this.userInfo.username,
              content:this.valCon,
              time: new Date()
          })
      });
      this.getCont();
      this.valCon='';
    }

  },
  mounted() {
    // 获取商品ID
    this.itemsId=this.$route.query.itemsId;
    this.getShopitem();
    this.getLikeCount();
    this.getCont();
    if(this.userInfo){
        this.getHasLike()
        this.getType()
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  .hearder{
    position: absolute;
    background-color:rgba(255, 255, 255, 0.1) ;
  }
  .swiper{
    position: relative;
  }
  .custom-indicator {
    background: rgba(0,0,0,.3);
    border-radius: 10px;
    min-width: 40px;
    height: 20px;
    line-height: 22px;
    display: inline-block;
    font-size: 12px;
    color: #fff;
    text-align: center;
    margin-right: 20px;
    padding: 0 5px;
    box-sizing: border-box;
    position: absolute;
    right:0px;
    bottom: 10px;
  }
  .swiper{
    img{
      width: 100%;
      height: 100%;
    }
  }
  .app{
    margin-top: 20px;
    background-color: #fff;
    padding: 10px;
    .appcenter{
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          .appbtn{
                width: 100%;
                height: 40px;
                text-align: center;
                line-height: 40px;
                border-radius: 20px;
                border: 0.5px solid #e84b85;
                font-family: PingFang SC;
                font-weight: 400;
                font-size: 15px;
                color: #e84b85;
          }
    }
  }
  .info{
    border-radius: 0 5% 5%;
    width: 100%;
    min-height:167px ;
    background: #fff;
    .price{
      width: 100vw;
      height: 64px;
      line-height: 64px;
      background: #fff;
      overflow: hidden;
      padding: 0 12px;
      font-size: 20px;
      color: #fb7299;
      letter-spacing: 1.2px;
      .symbol{
            padding-top: 16px;
            font-size: 15px;
            line-height: 14px;
            font-weight: 500;
      }
      .num{
            font-size: 24px;
            line-height: 24px;
            letter-spacing: 0;
            font-weight: 500;
      }
    }
    .text-info{
      width: 100%;
      height: 145px;
      padding: 12px;
        .infos{
          .text-title{
            font-size: 16px;
            font-weight: 900;
            height: auto;
            max-height: 44px;
            position: relative;
            overflow: hidden;
          }
          p{
                max-height: 36px;
                margin-top: 2px;
                font-size: 12px;
                color: #999;
                letter-spacing: 0;
                line-height: 18px;
                text-align: justify;
                overflow-x: hidden;
                white-space: nowrap;
                border-bottom: 1px solid #e7e7e7;
          }
        }
    }
    .rank-tags{
        margin-top: 12px;
        .rank-tag{
          display: flex;
          align-items: center;
          width: 100%;
          padding: 20px 0 8px;
          font-weight: 700;
          font-size: 12px;
          line-height: 14px;
          color: #212121;
          font-family: SimSun,sans-serif;
          .rank-tag-icon{
            height: 16px;
            width: 16px;
            background-size: 100% 100%;
            flex-shrink: 0;
            flex-grow: 0;
            margin-top: 1px;
            vertical-align: middle;
            background: url('../../../public/img/rank.png') no-repeat 50%;
          }
          .rank-tag-content{
            flex: 1 1;
            margin: 0 5px;
            overflow: hidden;
            .word-ellipsis-1{
                  white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
          }
        }
    }
    .rank-tags ::before{
      content: "";
      display: block;
      height: 1px;
      background: #e7e7e7;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      transform: scaleY(.5);
    }
  }

    
  .line{
    height: 50px;
  }

  .contents{
    width: 100%;
    min-height: 30px;
    ul{
      list-style: none;
      li{
        border-bottom: 1px solid #ccc;
      }
    }
  }

}
</style>