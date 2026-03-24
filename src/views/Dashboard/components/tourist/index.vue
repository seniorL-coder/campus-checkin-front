<template>
  <div class="box">
    <div class="top">
      <p class="title">实时学生统计</p>
      <p class="bg" />

      <p class="right">
        今日新增
        <span>{{ todayCount }}</span>
        人
      </p>
    </div>
    <div class="pepole-nomber">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- 盒子将来echarts展示图形图表节点 -->
    <div class="charts" ref="charts">123</div>
  </div>
</template>
<script lang="ts" setup name="Tourist">
import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
// 水球图拓展插件
import 'echarts-liquidfill'
import { fetchStudentStats } from '@/api/dashboard'
import wsService from '@/utils/socket' // 引入你的 WS 工具

// 注册渲染器
echarts.use([CanvasRenderer])

const people = ref<string>('0人')
const todayCount = ref(0)
const charts = ref<HTMLElement>()
// 使用 shallowRef 提升性能，避免 ECharts 实例被过度响应式追踪
const myChart = shallowRef<echarts.ECharts | null>(null)

/**
 * 更新图表和数据
 * @param total 总人数
 * @param today 今日人数
 */
const updateData = (total: number, today: number) => {
  people.value = total + '人'
  todayCount.value = today

  // 计算水球图比例（这里假设今日新增占比，你可以根据业务修改逻辑）
  // 如果总人数为0，比例为0；否则计算今日/总数
  const ratio = total > 0 ? today / total : 0

  myChart.value?.setOption({
    series: [
      {
        type: 'liquidFill',
        // data 数组可以放多个值，产生多层波浪
        data: [ratio, ratio * 0.8, ratio * 0.6],
        radius: '90%',
        waveAnimation: true,
        animationDuration: 2000,
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: 'none',
            borderColor: '#294D99',
            borderWidth: 8,
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
          },
        },
        // 调整中间文字样式
        label: {
          show: true,
          fontSize: 30,
          color: '#294D99',
          insideColor: '#fff',
          formatter: () => `今日占比\n${(ratio * 100).toFixed(1)}%`,
        },
      },
    ],
  })
}

// 获取初始数据
const loadInitialData = async () => {
  try {
    const res = await fetchStudentStats()
    const { totalCount, todayCount } = res.data
    updateData(totalCount, todayCount)
  } catch {}
}

onMounted(() => {
  // 1. 初始化图表
  if (charts.value) {
    myChart.value = echarts.init(charts.value)
  }

  // 2. 加载首屏数据
  loadInitialData()
  // 3. 集成 WebSocket 实时更新
  // 后端推送的事件名为 'STUDENT_REGISTERED'
  wsService.on<any>('STUDENT_REGISTERED', (data) => {
    // 收到消息后，可以手动累加本地数据，或者重新请求一次接口保证准确
    // 方案 A：直接重新查接口
    // loadInitialData()
    // 方案 B：如果 data 包含了最新统计，直接更新
    updateData(data.totalCount, data.todayCount)
  })
})

// 组件销毁时移除监听，防止内存泄漏
onUnmounted(() => {
  wsService.off('STUDENT_REGISTERED')
})
</script>
<style scoped lang="scss">
.box {
  background: url(@/assets/images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;
    margin-top: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(@/assets/images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 15px;
      span {
        color: orange;
        font-style: italic;
      }
    }
  }
  .pepole-nomber {
    margin-top: 30px;
    display: flex;
    padding: 10px;
    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(@/assets/images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 235px;
  }
}
</style>
