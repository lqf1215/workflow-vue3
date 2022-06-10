
import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
//全局样式
// import './style/index.scss'
//UI
import ElementPlus from 'element-plus'
//路由
import router from './router'

import '@/assets/style.css'
import Node from '@/components/Generator/node.vue'
const app = createApp(App)
//状态
// import store from './store'
// createApp(App).use(router).use(ElementPlus).component(node).mount('#app')
app.component('Node', Node); //初始化组件
app.use(router).use(ElementPlus ).mount('#app')
export default app