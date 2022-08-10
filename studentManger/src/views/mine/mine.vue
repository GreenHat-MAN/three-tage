<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="35%">
                <el-container>
                    <el-header class="tou">

                        <el-row class="name">
                            <el-col :span="11" offset="1">
                                <div class="imgs" v-if="userInfo" :style="{ width: collapse ? '0' : '100%' }">
                                    <el-avatar class="avatar" v-if="userInfo[0].avatar" :size="200"
                                        :src="userInfo[0].avatar.replace(/public/, baseURL + 'static')" />
                                    <el-avatar class="avatar" v-else :size="33" :src="circleUrl" />
                                </div>
                            </el-col>
                            <el-col v-if="userInfo" :span="11" offset="1" class="namePlus">
                                <p>{{ userInfo[0].stuName }}</p>
                                <br>
                                <el-rate 
                                void-color="white"
                                v-model="value" 
                                :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
                                show-text 
                                />
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24" class="positon">
                                <p v-if="userInfo" class="boxs">
                                    {{ roleList.find(item=>item.value==userInfo[0].role).text}}
                                </p>
                            </el-col>
                        </el-row>

                    </el-header>
                    <el-main class="bodys">
                        <div>
                           <h1>个人简介</h1>
                           <hr/>
                           <p class="jianjie">
                            本人在校热爱祖国，尊敬师长，团结同学，乐于助人，是老师的好帮手，同学的好朋友。本人品德兼优、性格开朗、热爱生活，有较强的实践能力和组织能力。我学习勤奋，积极向上，喜欢和同学讨论并解决题目，经常积极参加班级及学校组织的各种活动。
                           </p>
                        </div>
                    </el-main>
                </el-container>
            </el-aside>
            <el-main>
                <el-calendar v-model="values" />
            </el-main>
        </el-container>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore
const values = ref(new Date())
const value = ref()

</script>

<style lang="scss" scoped>
.common-layout {
    background-color: white;

    .tou {
        width: 100%;
        min-height: 300px;
        padding: 20px;
        background-color: #ccc;
        margin-bottom: 20px;
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
    }

    .bodys {
        width: 100%;
        min-height: 250px;
        background-color: #ccc;
        padding: 20px;
    }
}

.name {
    display: flex;
    align-items: center;
    justify-content: center;

    .namePlus {
        color: aqua;

        p {
            font-size: 30px;
        }
    }
}
.positon{
    display: flex;
    align-items: center;
    justify-content: center;
}
.boxs{
    width: 200px;
    height: 50px;
    border: 1px solid yellow;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    font-weight: bold;
}
.bodys{
    h1{
       text-align: left; 
       font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    }
    hr{
        width: 90%;
    }
    
}
.jianjie{
    text-align: left;
    
}
</style>