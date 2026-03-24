<template>
  <div class="containerBox">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <!-- 数据大屏顶部 -->
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Year class="year" />
          <Counter class="counter" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="Screen">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Counter from './components/counter/index.vue'
import Tourist from './components/tourist/index.vue'
import Top from './components/top/index.vue'
const screen = ref()

// 默认设计稿尺寸
const designWidth = 1920
const designHeight = 1080

// 获取缩放比例
function getScale() {
  const ww = window.innerWidth / designWidth
  const wh = window.innerHeight / designHeight
  // 取最小值：保证内容不被裁剪（等比缩放）
  // 如果你想强制铺满（会拉伸）：直接返回 [ww, wh] 并在 transform 中使用 scale(ww, wh)
  return ww < wh ? ww : wh
}

// 核心处理函数
function updateScale() {
  if (screen.value) {
    const scale = getScale()
    // 关键点：使用 translate(-50%, -50%) 配合 left: 50%; top: 50%
    // 且 transform-origin 必须为 center center
    screen.value.style.transform = `translate(-50%, -50%) scale(${scale})`
  }
}

// 防抖定时器
let timer: number | null = null

function handleResize() {
  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(() => {
    updateScale()
  }, 100)
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
<style scoped lang="scss">
.containerBox {
  width: 100vw;
  height: 100vh;
  background: url(@/assets/images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    width: 1920px;
    height: 1080px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: center center;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .rank {
          flex: 1.2;
        }
        .year {
          flex: 1;
        }
        .counter {
          flex: 1;
        }
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;

        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        .map {
          flex: 3;
          // background: red;
        }
        .line {
          flex: 1;
        }
      }
    }
  }
}
</style>
