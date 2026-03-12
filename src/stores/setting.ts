import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutSettingStore = defineStore(
  'layoutSetting',
  () => {
    // 定义是否折叠的变量
    const isCollapse = ref(false)
    const refresh = ref(false)
    // 主题色
    const themeColor = ref('rgba(255, 69, 0, 0.68)')
    // 控制暗黑模式的变量
    const isDark = ref(false)

    // 切换折叠状态
    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value
    }
    // 刷新页面
    const refreshPage = () => {
      refresh.value = !refresh.value
    }
    return {
      isCollapse,
      toggleCollapse,
      refresh,
      refreshPage,
      themeColor,
      isDark,
    }
  },
  {
    persist: true,
  },
)
