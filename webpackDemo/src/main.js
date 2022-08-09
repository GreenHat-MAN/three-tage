// 项目主文件
console.log('这是项目的主文件入口');


// 导入react项目
import React from 'react'
import {createRoot}  from 'react-dom/client'
import App from './views/App';
import './styles/index.scss'

const root =createRoot(document.getElementById("app"))
root.render(<App></App>)

