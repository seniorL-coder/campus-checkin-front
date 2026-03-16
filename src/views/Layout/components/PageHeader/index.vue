<script setup lang="ts">
import { useLayoutSettingStore } from '@/stores/setting'
import { useUserStore } from '@/stores/user.ts'
import { ref } from 'vue'
import { initTheme } from '@/initTheme.ts'

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const handleCommand = async (command: string) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await userStore.logout(userStore.userInfo.id)
    ElMessage.success('退出成功')
  }
}
// 折叠切换
const handleCollapse = () => {
  layoutSettingStore.toggleCollapse()
}
// 刷新
const handleRefresh = () => {
  layoutSettingStore.refreshPage()
}

// 全屏
const handleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

const changeThemeColor = (val: string | null) => {
  layoutSettingStore.themeColor = val!
  initTheme()
}
const changeThemeMode = (val: boolean | string | number) => {
  layoutSettingStore.isDark = val as boolean
  initTheme()
}
</script>

<template>
  <el-page-header
    title=" "
    @back="handleCollapse"
    :icon="layoutSettingStore.isCollapse ? 'Fold' : 'Expand'"
  >
    <template #content>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in $route.matched"
          v-show="item.meta.title"
          :key="item.path"
          :to="item.path"
        >
          <el-icon><component :is="item.meta.icon" /></el-icon>
          <span class="ml-1!">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button size="small" icon="Refresh" @click="handleRefresh" />
        <el-button size="small" icon="FullScreen" @click="handleFullScreen" />
        <el-popover placement="bottom" trigger="click">
          <template #reference> <el-button size="small" icon="Setting" /> </template>
          <div>
            主题色:
            <el-color-picker
              :predefine="predefineColors"
              v-model="layoutSettingStore.themeColor"
              @change="changeThemeColor"
            />
          </div>
          <div>
            暗黑模式:
            <el-switch
              active-icon="Moon"
              inactive-icon="Sunny"
              inline-prompt
              v-model="layoutSettingStore.isDark"
              @change="changeThemeMode"
            />
          </div>
        </el-popover>
        <el-avatar :src="userStore.userInfo.avatar ?? ''" class="mr-2! ml-2!" />
        <el-dropdown @command="handleCommand">
          <span>
            {{ userStore.userInfo.realName }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout"> 退出登录 </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
  </el-page-header>
</template>

<style scoped lang="sass">
:deep(.el-breadcrumb__inner)
  display: flex
  align-items: center
  justify-content: center
</style>
