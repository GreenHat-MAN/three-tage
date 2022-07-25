<template>
<router-link :to="{name:'adress'}"> 

    <div class="user-info">
        <div class="user">
            <div class="info">
                <div class="content">
                    <div class="addr-left">
                        <div class="addr-name-wrapper">
                            <div class="addr-city">
                                <span>{{AdressList.address?AdressList.address:'太阳系/地球'}}</span>
                            </div>
                            <div class="addr-detail">
                                      {{AdressList.dq?AdressList.dq:'江区江南大道 15 号'}}
                            </div>
                            <div class="user-name-wrapper">
                                    {{AdressList.name?AdressList.name:'隔壁老王'}} {{AdressList.tel?AdressList.tel:'1008611'}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</router-link>
        
</template>

<script>
export default {
    name:'Adress',
    data() {
        return {
             disabledList:[
                {
                id: '3',
                name: '隔壁老王',
                tel: '1320000000',
                address: '浙江省杭州市滨江区江南大道 15 号',
                },
             ]
        }
    },
}
</script>

<style lang="scss" scoped>
    .user-info{
            background: #fff;
            width: 100%;
            height: auto;
            .user{
                position: relative;
                .info{
                    display: block;
                    margin-left: 0;
                    margin-right: 0;
                    .content{
                            display: flex;
                            margin-right: 12px;
                            align-items: center;
                            .addr-left{
                                margin-left: 12px;
                                margin: 12px 0 0;
                                width: 100%;
                                .addr-name-wrapper{
                                        outline: 0;
                                        border-style: none;
                                        -webkit-appearance: none;
                                        .addr-city{
                                            display: flex;
                                            font-size: 14px;
                                            color: #212121;
                                            letter-spacing: 0;
                                            line-height: 14px;
                                            align-items: center;
                                        }
                                        .addr-detail{
                                                margin-top: 4px;
                                                font-weight: 500;
                                                font-size: 16px;
                                                color: #212121;
                                                letter-spacing: 0;
                                                line-height: 16px;
                                        }
                                        .user-name-wrapper{
                                            margin-top: 10px;
                                            margin-bottom: 12px;
                                            font-size: 14px;
                                            color: #999;
                                            letter-spacing: 0;
                                            line-height: 14px;
                                        }
                                }
                            }
                    }
                }
            }
    }
</style>