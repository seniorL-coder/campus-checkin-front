<script setup lang="ts">
import type { StudentModel } from '@/types/student'
import { ref, watch, nextTick } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { ClassModel } from '@/types/class'
import { fetchClassesList } from '@/api/class'
import { fetchAddStudent } from '@/api/student'

const visible = defineModel<boolean>()
const props = defineProps<{
  mode: 'add' | 'update',
  row?: StudentModel // 修改时必传，新增时可选
}>()

const emits = defineEmits(['update:students'])

const classesList = ref<ClassModel[]>([])

// 表单引用
const formRef = ref<FormInstance>()

// 表单数据初始化
const initialData = {
  username: '',
  realName: '',
  classId: '' as string | number,
}
const formData = ref({ ...initialData })

// --- 1. 校验规则 ---
const rules: FormRules = {
  username: [
    { required: true, message: '请输入登录账号', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  realName: [
    { required: true, message: '请输入学生姓名', trigger: 'blur' },
  ],
  classId: [
    { required: true, message: '请选择所在班级', trigger: 'change' },
  ],
}
const getClassesList = async () => {
    const { data } = await fetchClassesList()
    classesList.value = data
}

// --- 2. 逻辑处理：打开弹窗时回显或重置 ---
watch(visible, (newVal) => {
  if (newVal) {
    getClassesList()
    if (props.mode === 'update' && props.row) {
      // 修改模式：将 row 的数据浅拷贝给 formData
      formData.value = { username: props.row.username,
        realName:props.row.realName, classId: props.row.classId }
    } else {
      // 新增模式：重置数据
      formData.value = { ...initialData }
    }
    // 清除上一次的校验残留
    nextTick(() => {
      formRef.value?.clearValidate()
    })
  }
})

// --- 3. 提交逻辑 ---
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate( async(valid) => {
    if (valid) {
      if (props.mode === 'add') {
       await  fetchAddStudent(formData.value)
      } else {
        console.log('执行修改逻辑，参数：', formData.value)
        // TODO: 调用你的修改接口
      }
      // 通知更新
      ElMessage.success(props.mode === 'add' ? '添加成功': '更新成功')

      emits('update:students')
      // 成功后关闭弹窗
      visible.value = false
    }
  })
}

const handleCancel = () => {
  visible.value = false
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="mode === 'add' ? '新增学生' : '修改学生'"
    width="500px"
    destroy-on-close
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      status-icon
    >
      <el-form-item label="登录账号" prop="username">
        <el-input v-model="formData.username" placeholder="请输入账号" />
      </el-form-item>

      <el-form-item label="学生姓名" prop="realName">
        <el-input v-model="formData.realName" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item label="所在班级" prop="classId">
        <el-select v-model="formData.classId" placeholder="请选择班级" style="width: 100%">
          <el-option
          v-for="item in classesList"
          :label="item.className"
          :value="item.id"
          :key="item.id"/>
        </el-select>
      </el-form-item>

      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.dialog-footer {
  text-align: right;
  margin-top: 20px;
}
</style>