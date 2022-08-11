<template>
    <div>
        <video :src="vSrc" muted autoplay class="myvideo"></video>
    </div>
</template>

<script setup>
import { ref } from 'vue';

    const vSrc=ref("https://publicdate.oss-cn-hangzhou.aliyuncs.com/newbaodao/baodao.mp4")

</script>