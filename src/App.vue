<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import wsService from '@/utils/socket'
import { useUserStore } from './stores/user'
onMounted(() => {
  const token = useUserStore().token
  // 如果本地有 token，说明是登录状态（或者是刷新页面），直接重连
  if (token) {
    wsService.connect(token)
  }
})
</script>

<template>
  <RouterView />
</template>

<style lang="sass" scoped>
 header
  background-color: darkred
  color: white
  display: flex
nav
  display: flex
  color: aqua
</style>
