import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
const app = createApp(App)
app.use(store).use(router).use(ElementPlus, { locale }).mount('#app')
