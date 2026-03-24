<template>
  <div class="line-box">
    <div class="title">
      <p>未来七天游客数量趋势图</p>
      <img :src="titleImg" alt="" />
    </div>
    <div class="charts" ref="charts" />
  </div>
</template>
<script lang="ts" setup name="Line">
import * as echarts from 'echarts/core'
import { ref, onMounted } from 'vue'
import titleImg from '@/assets/images/dataScreen-title.png'

// 引入折线图
import { LineChart } from 'echarts/charts'
// 引入提示框组件
import { TooltipComponent } from 'echarts/components'
// 引入 Canvas 渲染器
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([LineChart, TooltipComponent, CanvasRenderer])
// 获取图形图表的节点
const charts = ref()

onMounted(() => {
  const mycharts = echarts.init(charts.value)
  // 设置配置项
  mycharts.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(50,50,50,0.7)',
      textStyle: {
        color: '#fff',
      },
      axisPointer: {
        type: 'cross',
      },
    },
    // 标题组件
    title: {
      text: '(访问量)',
      textStyle: {
        color: 'white',
      },
    },
    // x|y轴
    xAxis: {
      type: 'category',
      // 两侧不留白
      boundaryGap: 0,
      // 分割线
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // 刻度
      axisTick: {
        show: true,
      },
      axisLabel: {
        color: 'white',
      },
    },
    yAxis: {
      // 分割线
      splitLine: {
        show: false,
      },
      // 轴线设置
      axisLine: {
        show: true,
      },
      axisLabel: {
        color: 'white',
      },
      // 刻度
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      top: 0,
      right: 0,
      bottom: 20,
    },
    series: [
      {
        type: 'line',
        lineStyle: {
          color: 'pink',
        },
        data: [1, 240, 6, 100, 1, 200, 2],
        // 平滑曲线
        smooth: true,
        // 区域填充样式
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0, 150, 255, 0.8)',
              },
              {
                offset: 1,
                color: 'rgba(0, 150, 255, 0)',
              },
            ],
          },
        },
      },
    ],
  })
})
</script>
<style scoped lang="scss">
.line-box {
  width: 100%;
  height: 100%;
  background: url(@/assets/images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 10px 20px;

  .title {
    margin-left: 10px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 40px);
    // background: red;
  }
}
</style>
