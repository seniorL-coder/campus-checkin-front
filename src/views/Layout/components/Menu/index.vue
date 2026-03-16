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
/* 1. 只针对真正的叶子菜单项（没有子菜单的项）进行高亮 */
/* 这样当子项激活时，样式只会加在子项自己身上，不会影响父级 */
.el-menu-item.is-active {
  background-color: rgba(from var(--el-menu-active-color) r g b / 0.15) !important;
  border-left: 3px solid var(--el-menu-active-color) !important;
  color: var(--el-menu-active-color) !important;
}

/* 2. 针对父级项：只保留“展开时”的微弱背景色（可选） */
/* 如果你连展开时的浅色背景也不想要，这段也可以删掉 */
.el-sub-menu.is-opened > :deep(.el-sub-menu__title) {
  background-color: rgba(from var(--el-menu-active-color) r g b / 0.05);
}

/* 3. 核心改动：显式重置父级在激活态（子项选中时）的文字颜色 */
/* 强制让父级标题在子项活跃时保持默认颜色，不跟随主题色 */
.el-sub-menu.is-active > :deep(.el-sub-menu__title) {
  color: var(--el-menu-text-color) !important;
}
</style>
