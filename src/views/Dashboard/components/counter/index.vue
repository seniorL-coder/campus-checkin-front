<template>
  <div class="counter-box">
    <div class="title">
      <p>数据统计</p>
      <img :src="titleImg" alt="" />
    </div>
    <div class="charts" ref="charts" />
  </div>
</template>
<script lang="ts" setup name="Counter">
// 引入echarts
import * as echarts from 'echarts/core'
import { ref, onMounted } from 'vue'
import titleImg from '@/assets/images/dataScreen-title.png'

// 引入雷达图
import { RadarChart } from 'echarts/charts'
// 引入提示框组件
import { TooltipComponent } from 'echarts/components'
// 引入 Canvas 渲染器
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([RadarChart, TooltipComponent, CanvasRenderer])

// 获取DOM节点
const charts = ref()

onMounted(() => {
  // 一个容器可以展示多种类型的图形图表
  const mycharts = echarts.init(charts.value)
  const option = {
    title: {
      text: 'Basic Radar Chart',
      textStyle: {
        color: 'white',
      },
    },
    legend: {
      data: ['Allocated Budget', 'Actual Spending'],
      textStyle: {
        color: 'white',
      },
    },
    radar: {
      // shape: 'circle',
      axisName: {
        color: 'white',
      },
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: 'Actual Spending',
          },
        ],
      },
    ],
  }
  mycharts.setOption(option)
})
</script>
<style scoped>
.counter-box {
  width: 100%;
  height: 100%;
  background: url(@/assets/images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>
