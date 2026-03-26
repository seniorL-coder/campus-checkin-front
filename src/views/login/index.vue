<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import type { loginParamsType } from '@/types/user'
import { ElForm } from 'element-plus'
import { useUserStore } from '@/stores/user.ts'
import { User, Lock } from '@element-plus/icons-vue'

const userStore = useUserStore()

/**
 * 左侧滑入 → 刹车 → 轻微回弹 → 停止
 */

const formData = ref<loginParamsType>({
  username: import.meta.env.DEV ? 'admin' : '',
  password: import.meta.env.DEV ? 'admin123' : '',
})

const formEl = useTemplateRef<InstanceType<typeof ElForm>>('formRef')

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
  ],
}

const onSubmit = async () => {
  await formEl.value?.validate() // 验证表单
  await userStore.login(formData.value)
  ElMessage.success('登录成功!☺️')
}
const onReset = () => {
  formEl.value?.resetFields()
}
</script>

<template>
  <div class="w-full h-full overflow-hidden login-container">
    <el-row class="h-full login-bg" align="middle">
      <el-col :span="10" />
      <el-col :span="10" :xs="{ span: 24 }" :offset="3" class="form_container">
        <Transition name="scale-fade" appear>
          <el-card class="el-card is-always-shadow rounded-lg! mx-auto perspective-distant h-80">
            <template #header>
              <div class="flex items-center justify-around">
                <el-image
                  src="/campus-checkin/public/logo.svg"
                  alt="logo"
                  class="w-[65px]! h-[65px]!"
                />
                <span class="text-3xl font-bold">campus-checkin-admin</span>
              </div>
            </template>
            <el-form ref="formRef" :rules="rules" :model="formData" label-position="left">
              <el-form-item prop="username">
                <el-input
                  v-model="formData.username"
                  :prefix-icon="User"
                  placeholder="请输入用户名"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  :prefix-icon="Lock"
                  v-model="formData.password"
                  placeholder="请输入密码"
                  type="password"
                  :show-password="true"
                />
              </el-form-item>
            </el-form>
            <el-row>
              <el-col :span="12" class="!flex justify-center items-center">
                <el-button @click="onSubmit" type="primary">登录</el-button>
              </el-col>
              <el-col :span="12" class="!flex justify-center items-center">
                <el-button @click="onReset" type="warning">重置</el-button>
              </el-col>
            </el-row>
          </el-card></Transition
        >
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-form-item__content) {
  height: 50px;
  .el-input {
    height: 100%;
  }
}
.login-container {
  background: url(@/assets/images/login_bg.svg) no-repeat center center;
  padding: 20px;
  .login-bg {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    padding: 0 50px;
    background-color: rgb(from var(--el-bg-color-overlay) r g b / 0.6);
    border-radius: 10px;
  }
}
/* 进入前 & 离开后 */
.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

/* 进入中 & 离开中 */
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition:
    opacity 0.4s ease-out,
    transform 0.4s ease-out;
}

/* 进入完成 & 离开前 */
.scale-fade-enter-to,
.scale-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
