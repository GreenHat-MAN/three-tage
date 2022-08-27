<template>
    <div class="errorpage" ref="bgstar" id="bgstar">
        <!-- <div class="down" @click="gotowhere"> 剩余 {{ time }} S</div> -->
        <img :src="PIC" alt="" class="myimg tada1">
        <span v-for="(l, i) in spanNum" :key="i" class="spandot" :style="l"></span>
        <div class="demo-progress" @click="gotowhere">
            <el-progress type="circle"  :percentage="percentage" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue';
import Img from '@/assets/images/503.png'
import { useRouter } from 'vue-router';
let timer = null
const bgstar = ref()
const time = ref(5)
const PIC = ref(Img)
const percentage= ref(0)
const state = reactive({
    spanNum: [],
    n: 1000
})
const { spanNum, n } = toRefs(state);   // 取值 reactive 
const router = useRouter()
const gotowhere = () => {
    router.push({name:'login'})
}
const timeDown = () => {
    timer = setInterval(() => {
        if (percentage.value <= 100) {
            percentage.value++
        } else {
            clearInterval(timer)
            timer = null
            gotowhere()
        }
    }, 60)
}

const getSpanNumList = () => {
    var width = bgstar.value.clientWidth;
    var height = document.getElementById("bgstar").clientHeight;

    for (var i = 0; i < 520; i++) {
        var left = Math.round(width * Math.random())
        var top = Math.round(height * Math.random())
        var rate = Math.random() * 2.5 // 频率 
        var scaler = Math.random() * 1.5
        var r = 255;
        var g = 255;
        var b = 255;
        var opacity = Math.random()

        state.spanNum.push({
            left: left + 'px',
            top: top + 'px',
            transform: `scale(${scaler})`,
            animationDelay: rate + 's',
            background: `rgba(${r},${g},${b},${opacity})`
        })
    }
}
onMounted(() => {
    timeDown()
    getSpanNumList()
})
</script>

<style lang="scss" scoped>
// scope 独立的css作用域 

.demo-progress .el-progress--line {
    margin-bottom: 15px;
    width: 350px;
}

.demo-progress .el-progress--circle {
    cursor: pointer;
    margin-right: 15px;
    position: absolute;
    right: 0px;
    top: 0px;
}

.errorpage {
    width: 100%;
    height: 100%;
    background: #000;
    position: relative;
    padding: 0 !important;
    overflow: hidden;

    .down {
        position: absolute;
        left: 20px;
        top: 20px;
        border: 1px solid #fff;
        color: #fff;
        width: 70px;
        height: 30px;
        border-radius: 10px;
        text-align: center;
        line-height: 30px;
    }

    .dao {
        position: absolute;
        top: 20px;
        right: 20px;

        ::v-deep .van-circle__text {
            color: #fff !important;
        }
    }

    .myimg {
        width: 270px;
        height: 270px;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        z-index: 10;
    }

    .spandot {
        position: absolute;
        z-index: 100;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        animation: flash 3s infinite alternate;

    }

    @keyframes flash {
        from {
            opacity: 0;
        }

        to {
            opacity: 0.5;
        }
    }
}
</style>