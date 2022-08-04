<template>
<el-aside :width="collapse?'0%':'200px'" class="mymenu">
    <div class="box" >

        <div class="imgs" v-if="userInfo" :style="{width:collapse?'0':'100%'}">
            <el-avatar class="avatar" v-if="userInfo[0].avatar" :size="100" :src="userInfo[0].avatar.replace(/public/,baseURL+'static')" />
            <el-avatar class="avatar"  v-else :size="33" :src="circleUrl" />
        </div>
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="collapse">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>权限管理</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="1-1">权限列表</el-menu-item>
                    <el-menu-item index="1-2">权限信息</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
                <el-icon>
                    <icon-menu />
                </el-icon>
                <template #title>首页</template>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <el-icon>
                    <document />
                </el-icon>
                <template #title>个人中心</template>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>意见管理</template>
            </el-menu-item>
            <el-menu-item index="5">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>公告管理</template>
            </el-menu-item>
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

const circleUrl=ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')


</script>


<style lang="scss" scoped>

.box{
    background-color: #ccc;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 400px;
    background-color: #ccc;
}

</style>