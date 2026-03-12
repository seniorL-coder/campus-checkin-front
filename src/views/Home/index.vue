<script setup lang="ts">
import { useLayoutSettingStore } from '@/stores/setting'
import { useUserStore } from '@/stores/user.ts'
import type { LoginResponseType } from '@/types/user'
import { getTimePeriod } from '@/utils/getTimePeriodUtlis.ts'
import { watch } from 'vue'

const userStore = useUserStore()

watch(
  () => userStore.loginResponseInfo,
  (val: LoginResponseType) => {
    const name = val.realName
    if (!name) return

    ElNotification({
      title: name,
      message: `欢迎回来！${getTimePeriod(Date.now())}好！`,
      type: 'success',
    })
  },
  {
    immediate: true,
  },
)
const layoutSettingStore = useLayoutSettingStore()
watch(
  () => layoutSettingStore.isDark,
  () => {
    if (layoutSettingStore.isDark) {
      ElNotification({
        title: '夜间模式',
        message: '已切换到夜间模式，人们都说夜晚是创造力的源泉，希望你在夜间模式下有更多的灵感！',
        type: 'success',
        position: 'bottom-right',
      })
    } else {
      ElNotification({
        title: '日间模式',
        message: '已切换到日间模式，祝你有个愉快的一天！',
        type: 'success',
        position: 'bottom-right',
      })
    }
  },
)
</script>
<template>
  <!-- 首页内容 -->
  <div class="home-main">
    <el-row class="welcome-row" justify="center" align="top">
      <el-col :span="12" class="welcome-column">
        <div class="welcome-card" ref="welcomeCardRef">
          <h2 class="welcome-title">欢迎回来，{{ userStore.loginResponseInfo.realName }}！</h2>
          <p class="welcome-message">很高兴你访问系统！祝你操作愉快。</p>
          <p class="footer-message">如果需要帮助，请随时联系我们！</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="sass">
.home-main
  padding: 50px
  width: 100%
  height: calc(100vh - 10em)
  background-image: url("@/assets/images/welcome.png")
  background-size: cover

.welcome-row
  min-height: 400px

.welcome-column
  text-align: center

.welcome-card
  background-color: rgb(from var(--el-bg-color-overlay) r g b / 0.6)
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2))
  padding: 40px
  border-radius: 10px
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1)

.welcome-title
  font-size: 24px
  color: var(--el-color-primary)
  margin-bottom: 20px

.welcome-message
  font-size: 16px
  margin-bottom: 30px

.footer-message
  font-size: 14px
  margin-top: 20px
</style>
