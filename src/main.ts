import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './assets/chitu.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)  // ✅ 全局引入 Element Plus

app.mount('#app')