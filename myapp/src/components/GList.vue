<template>
  <ul class="glist">
        <li v-for="(l,i) in list" :key="i" class="gitem">
            <router-link class="glink" :to="{name:'good',params:{goodId:l.id},query:{name:l.name}}">
                <img :src="l.img" class="gimg" alt="">
                <div class="ginfo">
                    <h2 class="gname">{{l.name}}</h2>
                    <p class="gp">
                        <span class="price">价格: ¥{{l.price}}</span>
                        <span class="type">分类: {{l.type.text}}</span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name:'GList',
    props:['list']
}
</script>


<style lang="scss" scoped>
.glist{
    padding:15px;
    width:100%;
    height:100%;
    overflow: auto;
    .gitem{
        margin-top:15px;
        padding:10px;
        border:1px solid #ddd;
        border-radius: 10px;
        .glink{
            width:100%;
            display:block;
            .gimg{
                width:100%;
                height:220px;
                border-radius: 10px;
            }
            .ginfo{
                .gname{
                    color:#666;
                    font-size: 14px;
                    margin:6px 0;
                }
                .gp{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 12px;
                    .price{
                        color:darkorange;
                    }
                    .type{
                        color:darkorchid;
                    }
                }
            }
        }
    }
}
</style>