<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#fff',
  },
  width: {
    type: String,
    default: '2rem',
  },
  height: {
    type: String,
    default: '2rem',
  },
})
</script>
<template>
  <svg class="svg-icon">
    <use :href="prefix + name" :fill="color" :width="width" :height="height" />
  </svg>
</template>
<style scoped lang="sass">
.svg-icon
  height: 100%                // 使 SVG 高度与 li 高度一致
  width: 24px                 // 固定宽度，设置图标宽度
  margin-right: 10px          // 图标与文本之间的间距
  margin-top: 13.5%
</style>
