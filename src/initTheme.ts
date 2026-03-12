import { useLayoutSettingStore } from '@/stores/setting'

export function initTheme() {
  const layoutSettingStore = useLayoutSettingStore()
  const html = document.documentElement

  const themeColor = layoutSettingStore.themeColor

  if (themeColor) {
    html.style.setProperty('--el-color-primary', themeColor)
  }

  html.classList.toggle('dark', layoutSettingStore.isDark)
}
