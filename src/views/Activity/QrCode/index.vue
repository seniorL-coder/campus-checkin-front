<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { ref } from 'vue'
import { fetchStatusToEnd } from '@/api/activity/index'

const visible = defineModel<boolean>()

const props = defineProps<{
  activityId: number | null
  getList: () => Promise<void>
}>()
const handleStatusTOEnd = () => {
  if (!props.activityId) {
    return ElMessage.error('无效的活动ID')
  }
  ElMessageBox.confirm('确定要结束当前签到活动" 吗?', '警告', {
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
const qrUrl = ref('https://your-site.com/check-in?id=123&token=abc')
</script>

<template>
  <el-dialog class="flex!" width="500" v-model="visible">
    <qrcode-vue :value="qrUrl" :size="400" level="H" />
    <el-button type="warning" icon="SwitchButton" @click="handleStatusTOEnd()">结束签到</el-button>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
