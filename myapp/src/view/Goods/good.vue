<template>
  <div class="good" v-if="good">
    <myheard :title="good.name"></myheard>
    <img :src="good.img" class="goodimg" />
    <div class="ginfo">
      <van-cell-group>
        <van-cell title="商品类型" :value="good.type.text" />
        <van-cell
          title="商品单价"
          :value="good.price.toFixed(2) + '元'"
        ></van-cell>
        <van-cell title="商品折扣" :value="good.discount + '折'"></van-cell>
        <van-cell title="购买数量">
          <template #default>
            <van-stepper v-model="count" :min="1" :max="100" />
          </template>
        </van-cell>
        <van-cell title="购买小计" :value="amount.toFixed(2) + '元'"></van-cell>
      </van-cell-group>
    </div>

    <van-goods-action>

      <van-goods-action-icon
       icon="like-o"
        :color="hasLike?'#f50':'#999'" 
        :text="hasLike?'已点赞':'点赞'"
         @click="todoLikeAction" 
         :badge="likeCount" />

      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-icon icon="star-o" :color="hasColls?'#f50':'#999'" :text="hasColls?'已收藏':'收藏'" @click="toCollect" 
      :badge="collectCount" />

      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="toCart"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: "good",
  data() {
    return {
      good: null,
      goodId: "",
      count: 1, // 购买数量
      hasLike: false, // 是否已经点赞
      likeCount: 0, // 所有人的点赞次数
      hasColls:false,//是否收藏过
      collectCount:0//收藏次数
    };
  },

  computed: {
    amount() {
      return Math.floor(this.good.discount / 10 + this.good.price * this.count);
    },
  },


  methods: {

    // 获取商品详情
    async getGoods() {
      let res = await this.$ajax.getGoodList({
        id: this.goodId,
      });
      this.good = res[0];
      //   console.log(this.good);
    },


    // 添加到购物车
    toCart() {
      this.checkIsLogin(async () => {
        // 判断该数据是否被添加过
        let res = await this.$ajax.getCarts({
          phone: this.userInfo.phone,
          goodId: this.goodId,
        });
            if (res.length > 0) {
            let data = res[0];
            let res2 = await this.$ajax.updateGood(data.id, {
                count: this.count + data.count,
            });
            this.$toast.success("Again once!!!");
        } else {
          // 表示没添加过
          let res3 = await this.$ajax.postGood({
            phone: this.userInfo.phone,
            goodId: this.goodId,
            good: this.good,
            count: this.count,
            time: new Date(), // 购买时间
          });
          this.$toast.success("Add to Cart sucess!!!")
        }
      });
    },


    // 点赞功能实现
    // 判断当前用户是否点过赞
    async getHasLike(){
        let res=await this.$ajax.getLikes({
            phone:this.userInfo.phone,
            goodId:this.goodId
        })
        //强制类型转换,如果返回来的数值长度不大于1则表示没点过赞,将0转换为false
        this.hasLike=!!res.length;
    },
    // 获取点赞次数
    async getLikeCount(){
        let res=await this.$ajax.getLikes({
            goodId:this.goodId
        })
        this.likeCount=res.length
    },
    // 用户点赞切换
    todoLikeAction(){
        // 用户登录才能点赞
        this.checkIsLogin(async()=>{
            // 判断当前是否已经点赞
            if(this.hasLike){
                // 已经点过再次点击删除点赞
                let data = await this.$ajax.getLikes({
                        goodId:this.goodId,
                        phone:this.userInfo.phone 
                })
                let res=await this.$ajax.deleteCarts(data[0].id)
                this.likeCount--;
                this.hasLike=false;
                this.$toast('Is cancel!!!');
            }else{
                // 还没点过
                let res=await this.$ajax.addToLikes({
                    goodId:this.goodId,
                    phone:this.userInfo.phone,
                    good:this.good,
                })
                this.likeCount++;
                this.hasLike=true;
                this.$toast('Is support!!!');
            }
        })
    },


    // 收藏功能实现
    // 判断当前用户是否收藏过该商品
    async gethasColls(){
        let res=await this.$ajax.getCollects({
            phone:this.userInfo.phone,
            goodId:this.goodId
        })
        //强制类型转换,如果返回来的数值长度不大于1则表示没点过赞,将0转换为false
        this.hasColls=!!res.length;
    },
    // 获取收藏的次数
    async getcollectCount(){
        let res=await this.$ajax.getCollects({
            goodId:this.goodId
        })
        this.collectCount=res.length
    },
    //用户收藏切换
    toCollect(){
        // 用户登录才能点赞
        this.checkIsLogin(async()=>{
            // 判断当前是否已经点赞
            if(this.hasColls){
                // 已经点过再次点击删除点赞
                let data = await this.$ajax.getCollects({
                        goodId:this.goodId,
                        phone:this.userInfo.phone 
                })
                let res=await this.$ajax.deleteCollects(data[0].id)
                this.collectCount--;
                this.hasColls=false;
                this.$toast('Is cancel!!!');
            }else{
                // 还没点过
                let res=await this.$ajax.addCollects({
                    goodId:this.goodId,
                    phone:this.userInfo.phone,
                    good:this.good,
                })
                this.collectCount++;
                this.hasColls=true;
                this.$toast('Is support!!!');
            }
        })
    }
    
  },


  mounted() {
    // 获取商品列表传过来的ID
    this.goodId = this.$route.params.goodId;
    // 调用获取商品详情的方法
    this.getGoods();
  },


};


</script>

<style lang="scss" scoped>
.good {
  .goodimg {
    width: 100%;
    height: 300px;
  }
  .ginfo {
    margin-top: 15px;
    padding: 15px;
    width: 100%;
  }
}
</style>