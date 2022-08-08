<template>
    <div class="common-layout">
        <el-container>
            <el-header>{{ infolist[0].subject }}</el-header>
            <el-main>
                {{infolist[0].content}}
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { inject } from 'vue'

const infolist = inject('list')


</script>