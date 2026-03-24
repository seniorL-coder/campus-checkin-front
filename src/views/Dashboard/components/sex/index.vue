<template>
  <div class="sex-box">
    <div class="title">
      <p>男女比例</p>
      <img :src="titleImg" alt="" />
    </div>

    <div class="gender">
      <div class="man">
        <img :src="manImg" alt="" />
      </div>
      <div class="women">
        <img :src="womanImg" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts" />
  </div>
</template>
<script lang="ts" setup name="Sex">
import * as echarts from 'echarts/core'
import { onMounted, ref } from 'vue'
import titleImg from '@/assets/images/dataScreen-title.png'
import manImg from '@/assets/images/man.png'
import womanImg from '@/assets/images/woman.png'

// 引入柱状图
import { BarChart } from 'echarts/charts'
// 引入提示框组件
import { TooltipComponent, LegendComponent } from 'echarts/components'
// 引入 Canvas 渲染器
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([BarChart, TooltipComponent, LegendComponent, CanvasRenderer])

// 获取图形图表的DOM节点
const charts = ref()

onMounted(() => {
  // 获取echarts类实例
  const mycharts = echarts.init(charts.value)
  // 设置实例的配置项
  mycharts.setOption({
    // 标题组件
    title: {
      text: '男女比例', // 主标题
      textStyle: {
        // 主标题颜色
        color: 'skyblue',
      },
      left: '40%',
    },
    // x|y
    xAxis: {
      // type: 'category',
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: { show: false, type: 'category' },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: '#007AFE',
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        // 调整柱条位置
        barGap: '-100%',
        itemStyle: {
          color: '#FF4B7A',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  })
})
</script>
<style scoped lang="scss">
.sex-box {
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
  .gender {
    display: flex;
    justify-content: center;
    .man {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(@/assets/images/man-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .women {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(@/assets/images/woman-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    display: flex;
    justify-content: space-between;
    color: white;
  }
  .charts {
    height: 100px;
  }
}
</style>
