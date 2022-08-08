<template>
    <div>
        <h2 class="otitle">
            学科管理
        </h2>
        
        <el-row class="mt10">
            <el-button type="danger" @click="addXueke">添加学科</el-button>
        </el-row>
        <el-row class="mt10">
            <el-col span="8">
                <el-input placeholder="请输入关键字" v-model="obj.keyword" ></el-input>
            </el-col> 
            <el-col :span="5" :offset="1">
                <el-button type="success" @click="todoSearch">点击搜索</el-button>
                <el-button type="danger" @click="resetData">重置数据</el-button>
            </el-col>
        </el-row>
        <el-row class="mt10">
            <el-col :span="23">
                <el-table :data="xuekeList" border style="width: 100%">
                    <el-table-column type="index" label="序号"  align="center"  width="60"></el-table-column>
                    <el-table-column  label="学科索引"  align="center" prop="value"  >
                        <template #default="scope">
                            <el-tag color="#123456">{{scope.row._id }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column  label="学科名称"  align="center" prop="name"  >
                        <template #default="scope">
                            <span>{{scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="学科编码"  align="center" prop="value"  >
                        <template #default="scope">
                            <span>{{scope.row.value }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" >
                        <template #default="scope">
                            <el-popconfirm 
                                 confirm-button-text="确定"
                                cancel-button-text="取消"
                                :icon="InfoFilled"
                                icon-color="#626AEF"
                                @confirm="confirmDelOne(scope.row,scope.$index)"
                                title="你确定要删除吗?">
                                <template #reference>
                                    <el-button size="small" type="danger">删除</el-button>
                                </template>
                            </el-popconfirm>
                            
                            <el-button size="small" type="default" @click="updateOne(scope.row,scope.$index)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            
        </el-row>

         <el-dialog
            v-model="dialogVisible"
            :title="flag?'添加学科':'修改学科新'"
            width="30%"
            :before-close="handleClose"
            class="showbox"
        >
             <el-form
                    label-position="top"
                    :model="model"
                    ref="formRef"
                    class="myform"
                    status-icon 
                    :rules="rules"
                    size="default"
                >
                    <el-form-item label="学科名称" prop="name">
                        <el-input  v-model="model.name" autocomplete="off" clearable placeholder="请输入学科名称"  />
                    </el-form-item>
                    <el-form-item label="学科编码" prop="value">
                        <el-input   v-model="model.value" autocomplete="off" clearable placeholder="请输入学科编码"  />
                    </el-form-item>
                </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button :type="flag?'success':'danger'" @click="confirmAction"
                    >{{flag?"添加":'修改'}}</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue';
import { useStore } from 'vuex';
import { Ajax } from '../../api/index.js';
import { ElButton, ElTag, ElMessage } from 'element-plus'
const store = useStore()
const dialogVisible = ref(false)
const flag = ref(true) 
const model = ref({
    
})
const state = reactive({
    obj:{}
})
const {obj} = toRefs(state)
const formRef = ref()
const rules  =reactive({
    name:[
        { required: true, message: '请输入学科名称', trigger: 'blur' },
    ],
    value:[
        { required: true, message: '请输入学科编码', trigger: 'blur' },
    ],
})
const todoSearch = ()=>{
    store.dispatch("getXuekeListAsync",state.obj)
}
const resetData = ()=>{
    state.obj = {}
    store.dispatch("getXuekeListAsync",{})
}
const getXuekeList = (payload={})=>{
    store.dispatch("getXuekeListAsync",payload)
}
onMounted(()=>{
    getXuekeList()
})


const updateOne = (data,index)=>{
    dialogVisible.value = true;
    flag.value = false;
    model.value = Object.assign({},data);  // 深拷贝
    model.index = index; 

}
const confirmDelOne = async  (data,index) =>{
    let res = await Ajax.removexueke({_id:data._id})
    if(res.code==200){
        store.state.xuekeList.splice(index,1);
        store.commit("getXuekeList",store.state.xuekeList)
    }
}
const confirmAction = ()=>{
    formRef.value.validate(async valid=>{
        if(valid){
            if(flag.value){
                let res = await Ajax.addxueke(model.value)
                if(res.code==200){
                    getXuekeList()
                    handleClose()
                }   
            }else{
                // 修改 
                let res = await Ajax.updatexueke(model.value)
                if(res.code==200){
                    // store.state.xuekeList.splice(model.value.index,1,model.value)
                    var lists = store.state.xuekeList.map((item)=>{
                        if(item._id == model.value._id){
                            item = Object.assign({},model.value)
                        }
                        return item;
                    })
                    store.commit("getXuekeList",lists)
                    handleClose()
                }
            }
        }else{
            ElMessage({
                type: 'info',
                message: '请输入有效信息',
            })
        }
    })
}
const handleClose = ()=>{
    dialogVisible.value = false;
    model.value = {}
    formRef.value.resetFields()
}
const addXueke = ()=> {
    dialogVisible.value = true;
}

</script>
