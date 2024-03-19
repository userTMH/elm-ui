import { createApp } from 'vue'

import App from './App.vue'

// 引入router
import router from './router'

// 导入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入element plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {toLine} from "./utils"

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    // 全局注册图标
    app.component(`el-icon-${toLine(key)}`, component)
}

// 全局注册组件
import mUI from "./components"
app.use(mUI)


// 注册路由
app.use(router)
// 注册element plus
app.use(ElementPlus)
app.mount('#app')
