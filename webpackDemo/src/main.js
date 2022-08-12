// 项目主文件
console.log('这是项目的主文件入口');


// 导入react项目
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './views/App';
import './styles/index.scss'


import { Provider } from 'react-redux'
import { store } from '../src/store';

const root = createRoot(document.getElementById("app"))
root.render(
            <Provider store={store}>
                <App></App>
            </Provider>
)

