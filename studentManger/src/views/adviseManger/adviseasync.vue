<template>



    <div class="common-layout">
        <el-container>
            <el-aside width="40%" class="yijian">
                <h1>提提意见</h1>
                <el-form :model="form"  ref="formRef">

                    <el-form-item>
                        <el-input v-model="form.advise" type="textarea" rows="20" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">发表</el-button>
                        <el-button @click="Cancel">重置</el-button>
                    </el-form-item>

                </el-form>
            </el-aside>
            <el-main>
                <div class="imgs">
                    在人际交往过程中，发表自己的观点和意见是一个很重要的环节。通过这样的举动可以让别人对你有一个更加清晰的认识，也能让别人更加尊重你。那么如何才能在最恰当的时候发表自己的建议呢？我认为应该在其他人阐述完成自己观点的时候，再拿出自己的建议。这个时机一定要把握准确。应该在别人阐述完以后，渴望得到准确的回答的时候，这个时候你抛出你的观点和建议，一般来说都会得到对方的认可和采纳。这样做对你在他人心目中的形象和地位都会有极大的提升，也能让你变得越来越自信！
                    <p class="p1">金融港典狱长---大熊</p>
                    <p class="p2">请给我们宝贵的意见!!!!</p>
                </div>
            </el-main>
        </el-container>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { Ajax } from '../../api';
import { ElButton, ElTag, ElMessage, ElMessageBox } from 'element-plus'
const store = useStore()
const form = ref({})
const formRef = ref()

const Cancel = () => {
    // formRef.value.resetFields()
    form.value = {}
}

const onSubmit = async () => {
    let time = new Date()
    let name = store.state.userInfo[0].stuName
    form.value = {
        ...form.value,
        time,
        name
    }
    let data = await Ajax.addAdvise(form.value)
    if (data.code == 200) {
        form.value = {}
        ElMessage({
            type: 'info',
            message: 'ok',
        })
    }
}
</script>


<style lang="scss" scoped>
.common-layout{
    width: 100%;
    min-height: 500px;
}
    .yijian{
        text-align: center;
        h1{
            font-size: 25px;
            color: aqua;
        }
    }
    .imgs{
        width: 100%;
        min-height:500px;
        background: url('../../assets/images/advise.jpg') no-repeat 100% 100%;
        text-align: left;
        color: black;
        .p1{
            text-align: right;
            font-size: 15px;
            color: brown;
        }
        .p2{
            padding-left: 10px;
            font-size: 15px;

        }
    }
</style>