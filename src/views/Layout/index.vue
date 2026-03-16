<script setup lang="ts">
import Logo from '@/views/Layout/components/Logo/index.vue'
import { useUserStore } from '@/stores/user.ts'
import MenuComponent from '@/views/Layout/components/Menu/index.vue'
import PageHeaderCom from '@/views/Layout/components/PageHeader/index.vue'
import { useLayoutSettingStore } from '@/stores/setting.ts'
import { nextTick, ref, watch } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()
const refreshFlag = ref(true)

watch(
  () => layoutSettingStore.refresh,
  () => {
    refreshFlag.value = false
    // nextTick 的回调会在 当前响应式更新完成后、DOM 更新完成后 执行。
    // 也就是说：当前轮响应式更新完成后立即执行，不等到下一次响应更新。
    nextTick(() => {
      refreshFlag.value = true
    })
  },
)
</script>

<template>
  <el-container>
    <el-aside :width="layoutSettingStore.isCollapse ? '64px' : '260px'" class="aside-nav">
      <Logo />

      <el-scrollbar class="scrollBar">
        <el-menu
          unique-opened
          :collapse="layoutSettingStore.isCollapse"
          router
          :default-active="$route.path"
          :collapse-transition="false"
        >
          <MenuComponent :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header
        ><el-card><PageHeaderCom /></el-card
      ></el-header>
      <el-main class="mt-4!">
        <el-card>
          <el-config-provider :locale="zhCn">
            <RouterView v-slot="{ Component }">
              <Transition name="slide-fade" appear>
                <component :is="Component" v-if="refreshFlag" :key="$route.fullPath" />
              </Transition>
            </RouterView>
          </el-config-provider>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="sass">
@use '@/styles/element/index.scss' as *
:deep(.el-aside)
  border-right: 1px solid rgba(from var(--el-border-color) r g b / .6)
  padding-left: 1px
.aside-nav
  height: 100vh
  transition: width .3s ease-out

.scrollBar
  height: calc(100vh - $base-menu-logo-height)
.menu-list

  border-right: none
.el-menu
  border-right: none
:deep(.is-active)

:deep(.el-main)
  height: calc(100vh - 16px - 60px)
:deep(.el-card__body)
  overflow: hidden
/* ---------- 进入动画 ---------- */
.slide-fade-enter-from
  opacity: 0
  transform: translateX(-100%) // 从左滑入

.slide-fade-enter-active
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out

.slide-fade-enter-to
  opacity: 1
  transform: translateX(0)

/* ---------- 离开动画 ---------- */
.slide-fade-leave-from
  opacity: 1
  position: absolute
  transform: translateX(0) // 保持原位

.slide-fade-leave-active
  position: absolute
  transition: opacity 0.3s ease-in

.slide-fade-leave-to
  opacity: 0
  position: absolute
  transform: translateX(0) // 不位移，直接淡出
</style>
