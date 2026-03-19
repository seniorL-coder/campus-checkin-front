<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { ref } from 'vue'

const visible = defineModel<boolean>()

const qrUrl = ref('https://your-site.com/check-in?id=123&token=abc')
</script>

<template>
  <el-dialog class="flex!" width="500" v-model="visible">
    <qrcode-vue :value="qrUrl" :size="400" level="H" />
  </el-dialog>
</template>

<style lang="scss" scoped></style>
