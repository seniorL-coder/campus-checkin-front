<script setup lang="ts">
// import { useRouter } from 'vue-router'

defineOptions({
  name: 'menu-component',
})
const { menuList } = defineProps(['menuList'])
// const router = useRouter()
// const goRoute = (name?: string) => {
//   if (!name) return
//   router.push({ name })
// }
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <template v-if="!item.children && !item.meta.hidden">
      <el-menu-item :index="item.path">
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <template #title>
          <span> {{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-else-if="item.children?.length === 1 && !item.meta.hidden">
      <menu-component :menu-list="item.children" />
    </template>
    <template v-else-if="item.children?.length > 1 && !item.meta.hidden">
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon><component :is="item.meta.icon" /></el-icon>
          <span> {{ item.meta.title }}</span>
        </template>
        <menu-component :menu-list="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<style scoped lang="scss">
/* 1. 针对没有子菜单的普通项：因为是根节点，直接写类名，不要用 :deep 包裹外层 */
.el-menu-item.is-active {
  background-color: rgba(from var(--el-menu-active-color) r g b / 0.15) !important;
  border-left: 3px solid var(--el-menu-active-color) !important;
  color: var(--el-menu-active-color) !important;
}

/* 2. 针对有子菜单的父级项：el-sub-menu 是根节点(不用deep)，但它内部的标题 el-sub-menu__title 是组件内部生成的(需要deep) */
.el-sub-menu.is-opened > :deep(.el-sub-menu__title) {
  background-color: rgba(from var(--el-menu-active-color) r g b / 0.1);
}

/* 3. 如果你想让带子菜单的父级项在激活时文字也高亮： */
.el-sub-menu.is-active > :deep(.el-sub-menu__title) {
  color: var(--el-menu-active-color) !important;
}
</style>
