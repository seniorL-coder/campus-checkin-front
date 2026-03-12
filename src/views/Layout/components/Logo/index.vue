<script setup lang="ts">
import LogoConfig from '@/settings.ts'
import { useLayoutSettingStore } from '@/stores/setting.ts'
const layoutSettingStore = useLayoutSettingStore()
</script>

<template>
  <div class="logo flex items-center justify-around">
    <el-image
      fit="cover"
      :class="{ 'w-10': layoutSettingStore.isCollapse, 'w-15': !layoutSettingStore.isCollapse }"
      :src="LogoConfig.logo"
      alt="logo"
    />
    <h1 class="font-bold overflow-hidden" v-show="!layoutSettingStore.isCollapse">
      {{ LogoConfig.title }}
    </h1>
  </div>
</template>

<style scoped lang="sass">
@use '@/styles/element/index.scss' as *
.logo
  height: $base-menu-logo-height
  min-width: 64px
  padding-top: 10px
</style>
