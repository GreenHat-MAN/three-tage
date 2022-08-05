<template>
    <el-aside :width="collapse ? '0%' : '200px'" class="mymenu">
        <div class="box">

            <div class="imgs" v-if="userInfo" :style="{ width: collapse ? '0' : '100%' }">
                <el-avatar class="avatar" v-if="userInfo[0].avatar" :size="100"
                    :src="userInfo[0].avatar.replace(/public/, baseURL + 'static')" />
                <el-avatar class="avatar" v-else :size="33" :src="circleUrl" />
            </div>
            <el-menu router default-active="2" class="el-menu-vertical-demo" :collapse="collapse">

                <div v-for="(l, i) in routerLists" :key="i">
                    <div v-if="l.children">
                            <el-sub-menu :index="l.path">
                                <template #title>
                                    <el-icon>
                                        <component :is="l.icon" />
                                    </el-icon>
                                    <span>{{l.text}}</span>
                                </template>
                                <div v-for="(item,index) in l.children" :key="index">
                                     <el-menu-item-group>
                                        <el-menu-item :index="item.path">
                                            <template #title>
                                                <el-icon>
                                                    <component :is="item.icon" />
                                                </el-icon>
                                                <span>{{item.text}}</span>
                                            </template>
                                        </el-menu-item>
                                     </el-menu-item-group>
                                </div>
                            </el-sub-menu>
                    </div>
                    <div v-else>
                        <el-menu-item :index="l.path">
                            <el-icon>
                                <component :is="l.icon" />
                            </el-icon>
                            <span>{{l.text}}</span>
                        </el-menu-item>
                    </div>
                </div>











                <!-- <div v-for="(l, i) in routerLists" :key="i">
                    <el-sub-menu :index="l.path">
                        <template #title>
                            <el-icon>
                                <component :is="l.icon" />
                            </el-icon>
                            <span>{{ l.text }}</span>
                        </template>
                        <div v-if="l.children">
                            <el-sub-menu v-for="(item, index) in l.children" :index="item.path" :key="index">
                                
                                    <template #title>
                                    <el-icon>
                                        <component :is="item.icon" />
                                    </el-icon>
                                    <span>{{ item.text }}</span>
                                    </template>
                            </el-sub-menu>
                        </div>
                    </el-sub-menu>
                </div> -->

            </el-menu>
        </div>
    </el-aside>
</template>


<script setup>
import { ref } from 'vue'
import { baseURL } from '../../api/request.js';
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')


</script>


<style lang="scss" scoped>
.box {
    background-color: #ccc;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 400px;
    background-color: #ccc;
}
</style>