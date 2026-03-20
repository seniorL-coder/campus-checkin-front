import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useActivityStore = defineStore(
  'activity',
  () => {
    // 存储已初始化的活动 ID 列表
    const initializedIds = ref<number[]>([])

    // 添加已初始化的 ID
    const addInitializedId = (id: number) => {
      if (!initializedIds.value.includes(id)) {
        initializedIds.value.push(id)
      }
    }

    // 判断是否已初始化
    const isInitialized = (id: number | null) => {
      if (id === null) return false
      return initializedIds.value.includes(id)
    }

    return {
      initializedIds,
      addInitializedId,
      isInitialized,
    }
  },
  {
    // 开启持久化，这样刷新页面数据也不会丢
    persist: true,
  },
)
