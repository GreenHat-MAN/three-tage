<template>
    <div class="box">
        <input type="file" class="fileinp"  ref="fileRef"  @change="startUpload" >
         <el-tooltip
            effect="dark"
            content="更新头像"
            placement="bottom"
        >
            <el-avatar class="avatar" v-if="userInfo[0].avatar" @click="clickLoad" :size="33" :src="userInfo[0].avatar.replace(/public/,baseURL+'static')" />
            <el-avatar class="avatar"  @click="clickLoad" v-else :size="33" :src="circleUrl" />
        </el-tooltip>


        
    </div>
</template>


<script setup>

import { reactive, toRefs,ref,computed } from 'vue'
import {  useStore } from 'vuex';
import { Ajax } from '../../api/index.js';
import { baseURL } from '../../api/request.js';

const fileRef=ref()
const store=useStore()
const userInfo = computed(()=>store.state.userInfo)
const state = reactive({
    circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})

const { circleUrl } = toRefs(state)

const startUpload= async ()=>{
    let file=fileRef.value.files[0]
    const data = new FormData()
    data.append('file',file)

    //上传
    let res=await Ajax.getImgs(data)

    if(res.code==200){
        let result=await Ajax.updateAll({
            avatar:res.path
        })
        userInfo.value.avatar=res.path
        store.commit('changeUserInfo',userInfo.value)
        
    }

}

//点击上传
const clickLoad= ()=>{
    fileRef.value.click()
}

</script>

<style lang="scss" scoped>

.box{
    cursor: pointer;
    width: 20%;
    .avatar{
        margin-top: 5px;
    }
    .fileinp{
        display: none;
    }
}
    
</style>