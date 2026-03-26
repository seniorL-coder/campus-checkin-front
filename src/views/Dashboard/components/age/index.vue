<template>
  <div class="age-box">
    <div class="title">
      <p>年龄比例</p>
      <img :src="titleImg" alt="" />
    </div>
    <!-- 图形图表容器 -->
    <div class="charts" ref="charts" />
  </div>
</template>
<script lang="ts" setup name="Age">
import { ref, onMounted } from 'vue'
import titleImg from '@/assets/images/dataScreen-title.png'

// 引入echarts
import * as echarts from 'echarts/core'
// 引入饼图
import { PieChart } from 'echarts/charts'
// 引入提示框组件
import { TooltipComponent } from 'echarts/components'
// 引入 Canvas 渲染器
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([PieChart, TooltipComponent, CanvasRenderer])
const charts = ref()

// 组件挂载完毕初始化图形图表
onMounted(() => {
  const mychart = echarts.init(charts.value)
  // 设置配置项
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '40px',
      right: '30px',
      orient: 'vertical', // 图例组件方向
      textStyle: {
        color: 'white',
        fontSize: 14,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '19' },
          { value: 735, name: '20' },
          { value: 580, name: '21' },
          { value: 484, name: '22' },
          { value: 300, name: '18' },
        ],
        emphasis: {
          scale: true,
          scaleSize: 10,
          label: {
            show: true,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#ff4500',
          },
        },
      },
    ],
    // 调整图形图表位置
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  }
  mychart.setOption(option)
})
</script>
<style scoped lang="scss">
.age-box {
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
    height: 260px;
  }
}
</style>
