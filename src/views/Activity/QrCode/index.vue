<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { ref, watch, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useActivityStore } from '@/stores/activity' // 引入 store
import { fetchGetSignInLink, fetchStatusToEnd, fetchInitSignInList } from '@/api/activity/index'

const visible = defineModel<boolean>()
const activityStore = useActivityStore()

const props = defineProps<{
  activityId: number | null
  getList: () => Promise<void>
}>()

const qrUrl = ref('')
const initLoading = ref(false)

// 【优化】：从 Pinia 中判断当前活动是否已初始化
const isCurrentInitialized = computed(() => {
  return activityStore.isInitialized(props.activityId)
})

const getQrUrl = async () => {
  if (!props.activityId) return
  try {
    const res = await fetchGetSignInLink({ activityId: props.activityId })
    qrUrl.value = 'https://bytedancetech.site/campus-checkin-h5/checkIn' + res.data
  } catch {
    ElMessage.error('获取二维码失败')
  }
}

// 50s 轮询 动态更新二维码链接，确保用户扫码时链接有效
let qrInterval: number | null = null
watch(
  () => visible.value,
  (newVal) => {
    if (newVal) {
      getQrUrl()
      qrInterval = window.setInterval(getQrUrl, 50000) // 每50秒刷新一次二维码链接
    } else {
      if (qrInterval) {
        clearInterval(qrInterval)
        qrInterval = null
      }
    }
  },
)

const handleInitList = async () => {
  if (!props.activityId) return ElMessage.warning('无效的活动ID')

  initLoading.value = true
  try {
    await fetchInitSignInList(props.activityId)
    ElMessage.success('初始化成功')

    // 【优化】：同步到 Pinia，触发持久化存储
    activityStore.addInitializedId(props.activityId)
  } catch (error: any) {
    // 1. 获取错误消息字符串
    const errorMsg = error?.msg || String(error)

    // 2. 判断是否为“已存在”的冲突错误
    // 这里的判断条件根据你后端返回的实际字符串调整，比如 '已存在' 或特定的错误码
    if (errorMsg.includes('已存在') || errorMsg.includes(`${props.activityId}`)) {
      ElMessage.info('检测到该活动已初始化，正在为您展示二维码...')

      // 关键：虽然接口报错了，但既然是因为“已存在”，说明业务上已经初始化过了
      // 手动将其存入 Pinia，解锁前端遮罩
      activityStore.addInitializedId(props.activityId)
    } else {
      // 3. 如果是其他真正的错误，才提示初始化失败
      ElMessage.error('初始化失败: ' + errorMsg)
    }
  } finally {
    initLoading.value = false
  }
}

const handleStatusTOEnd = () => {
  if (!props.activityId) return
  ElMessageBox.confirm('确定要结束当前签到活动吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    await fetchStatusToEnd(props.activityId!)
    ElMessage.success('活动已结束')
    visible.value = false
    props.getList()
  })
}

watch(
  () => visible.value,
  (newVal) => {
    if (newVal) getQrUrl()
  },
)
</script>

<template>
  <el-dialog width="500" v-model="visible" destroy-on-close>
    <div class="flex flex-col items-center justify-center gap-6 py-4">
      <div
        class="relative w-100 h-100 flex items-center justify-center border border-gray-200 rounded-lg"
      >
        <qrcode-vue :value="qrUrl" :size="360" level="M" />

        <div
          v-if="!isCurrentInitialized"
          class="absolute inset-0 z-10 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center"
        >
          <el-icon size="40" color="#e6a23c" class="mb-2"><WarningFilled /></el-icon>
          <div class="text-gray-600 mb-6 font-bold">待初始化签到数据</div>
          <el-button
            type="primary"
            size="large"
            round
            :loading="initLoading"
            @click="handleInitList"
          >
            点击初始化并生成二维码
          </el-button>
        </div>
      </div>

      <el-button type="warning" plain icon="SwitchButton" class="w-100" @click="handleStatusTOEnd">
        结束本次活动
      </el-button>
    </div>
  </el-dialog>
</template>
