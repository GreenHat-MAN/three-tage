<template>
    <div>
        <h2 class="otitle">用户数据分析</h2>
        <el-row class="flex">
            <el-col :span="11" >
                <div class="boxitem" ref="chartOne">

                </div>
            </el-col>
            <el-col :span="11" :offset="1" >
                <div class="boxitem" ref="chartTwo">
                    
                </div>
            </el-col>
        </el-row>
    </div>
</template>


<script setup>
import * as echarts from 'echarts'
import { onMounted, ref  } from 'vue';
import { useStore } from 'vuex';
import { Ajax } from '../../api/index.js';
const store = useStore()
const chartOne = ref()
const chartOneInit = (userList,roleList)=>{
    var myChart = echarts.init(chartOne.value);
    
    var data = []
    roleList.forEach(item=>{
        if(userList.filter(value=>value.role==item.value).length>0){
            data.push({
                value: userList.filter(value=>value.role==item.value).length,  
                name: item.text 
            })
        }
    })
    var option = {
        title: {
            text: '人员占比分析',
            subtext: '百分比',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
            name: '来自数据库',
            type: 'pie',
            radius: '50%',
            data, 
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
            }
        ]
    };
    myChart.setOption(option);
}
const getUserList= async  ()=>{
    let res= await Ajax.getuser()
    let data = await Ajax.getRole() 
    chartOneInit(res.result,data.result)
}
onMounted(()=>{
    getUserList()
})

</script>


<style lang="scss" scoped>
.boxitem{
    width:100%;
    min-height: 470px;
    padding: 15px;
    border:1px solid #ddd;
    border-radius: 10px;
}
</style>
