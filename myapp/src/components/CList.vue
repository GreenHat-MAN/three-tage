<template>
    <ul class="clist">
        <li class="item" v-for="(l,i) in list" :key="i">
            <router-link :to="{name:'cinema-detail',params:{
                cinemaId:l.cinemaId,
                date,
                filmId,
            }}">
                <div class="one">
                    <div class="name">{{l.name}}</div>
                    <div class="price"><span class="small">¥</span>{{l.lowPrice/100}}<span class="small">起</span></div>
                </div>
                <div class="two">
                    <div class="address">{{l.address}}</div>
                    <div class="dis">{{l.Distance ? (l.Distance/1000).toFixed(0)+"KM":'距离未知'}}</div>
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name:'CList',
    props:{
        list:Array,
        date:Number,
        filmId:Number 
    }
}
</script>

<style lang="scss" scoped>
.clist{
    .item{
        padding: 15px;
        position: relative;
        background: #fff;
        .one{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name{
                width:280px;
                font-size: 15px;
                margin-bottom: 5px;
                color: #191a1b;
                overflow: hidden;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .price{
                font-size: 15px;
                color: #ff5f16;
                .small{
                    font-size: 8px;
                }
            }
        }
        .two{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .address{
                width:280px;
                font-size: 13px;
                margin-bottom: 5px;
                color: #797d82;
                overflow: hidden;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .dis{
                color: #797d82;
                font-size: 10px;
                line-height: 26px;
            }
        }
    }
}
</style>

