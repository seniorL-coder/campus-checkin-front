<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { ActivityModel } from '@/types/activity'
import { fetchUpdateActivity } from '@/api/activity'

// 定义接口
interface ActivityDTO {
  id: number | null
  title: string
  startTime: string
  endTime: string
}

const emits = defineEmits(['refreshList'])

// 使用 defineModel 绑定弹窗显示状态和数据行
const visible = defineModel<boolean>()
const rowData = defineProps<{
  rowData: ActivityModel
}>()
const formRef = ref<FormInstance>()
// 内部表单数据，初始由 rowData 同步
const formData = ref<ActivityDTO>({
  id: null,
  title: '',
  startTime: '',
  endTime: '',
})

// 当 rowData 变化（即点击编辑）时，同步给本地 formData
watch(
  rowData,
  (newVal) => {
    formData.value = { ...formData.value, ...newVal }
  },
  { immediate: true },
)

// 自定义校验：结束时间 > 开始时间
const validateTimeRange = (_rule: any, value: string, callback: any) => {
  // if (!value) return callback(new Error('请选择时间'))

  const start = new Date(formData.value.startTime).getTime()
  const end = new Date(value).getTime()

  if (formData.value.startTime && end <= start) {
    callback(new Error('结束时间必须晚于开始时间'))
  } else {
    callback()
  }
}

const rules: FormRules = {
  // title: [{ required: true, message: '必填', trigger: 'blur' }],
  // startTime: [{ required: true, message: '必填', trigger: 'change' }],
  endTime: [{ validator: validateTimeRange, trigger: 'change' }],
}

const validateField = (field: string) => {
  formRef.value?.validateField(field)
}

const handleClose = () => {
  formRef.value?.resetFields()
}

const handleSubmit = async () => {
  await formRef.value?.validate(async (valid) => {
    if (valid) {
      console.log('提交给后端的数据:', formData.value)
      // 表单必须存在一个值
      if ((!formData.value.title.trim() && !formData.value.startTime) || !formData.value.endTime) {
        ElMessage.error('请正确修改')
        return
      }
      await fetchUpdateActivity({
        id: rowData.rowData.id, // 这里直接使用 rowData 的 id，确保更新的是正确的活动
        title: formData.value.title,
        startTime: formData.value.startTime,
        endTime: formData.value.endTime,
      })
      visible.value = false
      //  emit 一个刷新列表的事件
      emits('refreshList')
      ElMessage.success('活动更新成功')
    }
  })
}
</script>

<template>
  <el-dialog v-model="visible" title="编辑活动" width="500px" destroy-on-close @close="handleClose">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" status-icon>
      <el-form-item label="活动标题" prop="title">
        <el-input v-model="formData.title" />
      </el-form-item>

      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="formData.startTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="validateField('endTime')"
        />
      </el-form-item>

      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="formData.endTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>
