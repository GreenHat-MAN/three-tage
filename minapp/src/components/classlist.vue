<template>
  <div class="category-part">
    <div class="category-part-item">
        <h5 class="category-title">{{name}}</h5>
        <p class="ip">人气排行</p>
        <ul>
            <li class="category-list" v-for="(l,i) in list.categoryLogicVOList" :key="i">
                <div class="category-item" @click="gotowhere({name:'searchinfo',params:{id:l.id}})">
                    <div class="img-container">
                        <div class="normal-img-container">
                        <img :src="l.img">
                        </div>
                        <p class="desc">{{l.name}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name:'classlist',
    props:['list','name'],
}
</script>

<style lang="scss" scoped>

    .category-part{
        padding: 0 12px;
        .category-part-item{
            position: relative;
            .category-title{
                font-size: 14px;
                line-height: 12px;
                padding: 18px 0;
            }
            .ip{
                position: absolute;
                top: 18px;
                right: 0;
                font-size: 12px;
                color: #fb7299;
                line-height: 12px;
            }
            ul{
                    padding-top: 10px;
                    background: #fff;
                    list-style: none;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                .category-list{
                    .category-item{
                        width: 100%;
                        .img-container{
                            position: relative;
                            padding-top: 30%;
                            .normal-img-container{
                                background: rgb(255, 255, 255);
                                height: 90px;
                                img{
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                        .desc{
                        margin: 6px 0;
                        text-align: center;
                        font-size: 12px;
                        line-height: 14px;
                        color: #999; 
                        }
                    }
                }
            } 
        }
    }

</style>