import '@/styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ElInfiniteScroll } from 'element-plus'
import App from './App.vue'
import router from './router'

// 导入自定义指令
import { lazyPlugin } from './directives'
// 导入全局组件插件
import { componentsPlugin } from './components'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentsPlugin)
app.use(ElInfiniteScroll)

app.mount('#app')
