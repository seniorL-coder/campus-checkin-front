import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App, Plugin } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobeComponents: Record<string, any> = {
  SvgIcon,
}

const plugin: Plugin = {
  install(app: App) {
    for (const key in allGlobeComponents) {
      app.component(key, allGlobeComponents[key])
    }

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
export default plugin
