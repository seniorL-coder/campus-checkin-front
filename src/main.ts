import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import 'virtual:svg-icons-register' // svg 图标注册
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import GlobalComponentsPlugin from '@/plugins/GlobalComponentsPlugin.ts'

// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import { initTheme } from '@/initTheme.ts'

import '@/router/promission'
const app = createApp(App, {
  locale: zhCn,
})

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(GlobalComponentsPlugin)
initTheme()

app.mount('#app')
