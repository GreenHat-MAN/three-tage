// import { legacy_createStore as createStore } from "redux"
import  data  from '../redux/reducer'

// const store = createStore(data)

// // console.log(store.getState());

// export default store



import { legacy_createStore as createStore } from "redux";

//1、初始化
const initState = {
    num: 1,
};

//2、定义修改方法
const reducer = (state = initState, action) => {
    switch (action.type) {
        case "doAdd":
            return { ...state, num: state.num + 1 };
        case "red":
            return { ...state, num: state.num - 1 };
        default:
            return state;//默认返回state
    }
};

//3、创建store管理reducer
//导出
export const store = createStore(data)


