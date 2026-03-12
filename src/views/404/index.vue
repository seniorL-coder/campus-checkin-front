<template>
  <div class="error-container">
    <!-- 动画 -->
    <Vue3Lottie
      class="anim"
      animationLink="/animations/404.json"
      :height="280"
      :loop="true"
      :autoPlay="true"
    />

    <!-- 标题 -->
    <h1 class="title">Oops! 页面丢失了</h1>

    <!-- 描述 -->
    <p class="desc">您访问的页面不存在哦!</p>

    <!-- 按钮 -->
    <div class="btns">
      <el-button type="primary" @click="goHome">返回首页</el-button>
      <el-button @click="goBack">返回上一页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => router.push('/')
const goBack = () => router.back()
</script>

<style scoped>
.error-container {
  height: 100vh;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.anim {
  margin-bottom: 10px;
}

/* 主标题 */
.title {
  font-size: 28px;
  font-weight: 700;
  margin-top: 10px;
  background: linear-gradient(135deg, #409eff, #66b1ff);
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 2px;
}

/* 副标题 */
.desc {
  margin-top: 8px;
  font-size: 16px;
  color: #666;
  max-width: 420px;
  line-height: 1.6;
}

/* 按钮组 */
.btns {
  margin-top: 25px;
  display: flex;
  gap: 12px;
}
</style>
