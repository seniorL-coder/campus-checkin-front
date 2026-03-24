<template>
  <div class="map-box" ref="map">我是Map组件</div>
</template>
<script lang="ts" setup name="Map">
import { ref, onMounted } from 'vue'
// 1. 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 2. 引入地图图表、航线图（lines）
import { MapChart, LinesChart } from 'echarts/charts'
// 3. 引入提示框，标题，直角坐标系，地理坐标系组件，组件后缀都为 Component
import {
  GeoComponent,
  GridComponent,
  TooltipComponent, // 可选
} from 'echarts/components'
// 4. 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { SVGRenderer } from 'echarts/renderers'

// 引入中国地图的JSON数据
import chinaJSON from './chaina.json'

// 5. 注册必须的组件
echarts.use([MapChart, LinesChart, GeoComponent, GridComponent, TooltipComponent, SVGRenderer])
const flightData = [
  {
    coords: [
      [116.405285, 39.904989],
      [91.132212, 29.660361],
    ],
  }, // 北京 -> 拉萨
  {
    coords: [
      [116.405285, 39.904989],
      [87.617733, 43.792818],
    ],
  }, // 北京 -> 乌鲁木齐
  {
    coords: [
      [116.405285, 39.904989],
      [121.472644, 31.231706],
    ],
  }, // 北京 -> 上海
  {
    coords: [
      [116.405285, 39.904989],
      [113.264434, 23.129162],
    ],
  }, // 北京 -> 广州
  {
    coords: [
      [116.405285, 39.904989],
      [114.057868, 22.543099],
    ],
  }, // 北京 -> 深圳
  {
    coords: [
      [116.405285, 39.904989],
      [104.065735, 30.659462],
    ],
  }, // 北京 -> 成都
  {
    coords: [
      [116.405285, 39.904989],
      [120.153576, 30.287459],
    ],
  }, // 北京 -> 杭州
  {
    coords: [
      [116.405285, 39.904989],
      [118.796877, 32.060255],
    ],
  }, // 北京 -> 南京
]

// 获取DOM元素
const map = ref()

// 注册中国地图
echarts.registerMap('china', chinaJSON as Parameters<typeof echarts.registerMap>[1])
onMounted(() => {
  const mychart = echarts.init(map.value)
  // 设置配置项
  mychart.setOption({
    // 地图组件
    geo: {
      zoom: 1.3, // 地图缩放级别
      map: 'china', // 中国地图
      roam: true, // 鼠标缩放效果
      // 地图位置调试
      left: 150,
      top: 150,
      right: 150,
      bottom: 150,
      // 地图上文字设置
      label: {
        show: true, // 显示文字
        color: 'white',
        // fontSize: 14,
      },
      itemStyle: {
        // 区域背景颜色
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#005ad4' }, // 顶部较亮的蓝色
            { offset: 1, color: '#002c6a' }, // 底部较深的蓝色
          ],
        },
        borderColor: '#3297ff', // 省份边界线颜色（浅蓝色）
        borderWidth: 1, // 边界线宽度
        shadowColor: 'rgba(0, 54, 255, 0.4)', // 阴影颜色
        shadowBlur: 10, // 阴影模糊程度，产生发光效果
        shadowOffsetX: 0,
        shadowOffsetY: 5,
        opacity: 1,
      },
      // 地图高亮效果
      emphasis: {
        itemStyle: {
          color: '#00f2ff',
        },
        label: {
          show: true, // 是否显示文字
          color: '#ffeb7b', // 文字颜色
          fontSize: 20, // 字体大小
          fontWeight: 'bold', // 字体加粗
          // 甚至可以设置文字阴影让它更立体
          textBorderColor: '#000', // 文字描边颜色
          textBorderWidth: 1, // 文字描边宽度
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10,
        },
      },
    },
    // 布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      // 第一层：流光轨迹线
      {
        type: 'lines',
        zlevel: 1, // 放在底层
        effect: {
          color: '#00f2ff', // 轨迹流光的颜色（建议亮青色）
        },
        lineStyle: {
          color: '#00f2ff', // 静态航线的颜色
          width: 2, // 航线宽度
          opacity: 0.8, // 航线透明度（调得很淡，形成若隐若现的科技感）
          curveness: 0.3, // 必须有弯曲度，才会有航线感
        },
        data: flightData, // 使用之前定义的 flightData
      },
      // 第二层：飞机图标
      {
        type: 'lines',
        zlevel: 2, // 放在高层，避免被地图挡住
        effect: {
          show: true,
          period: 6, // 飞机飞得比流光稍慢一点，更有层次
          trailLength: 0, // 飞机后面不要带尾迹，保持图标清晰
          symbol:
            'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
          symbolSize: 15, // 飞机大小
          color: '#ff4500', // 飞机颜色
        },
        lineStyle: {
          width: 0, // 这一层不显示背景线，只显示飞机
          curveness: 0.3,
        },
        data: flightData,
      },
      {
        type: 'lines',
        zlevel: 2,
        // 专门负责跑飞机的特效（如你之前的飞机图标）
        effect: {
          // show: true,
          period: 6,
          trailLength: 0,
          symbol:
            'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
          symbolSize: 12,
          color: '#00f2ff', // 飞机颜色
        },
        lineStyle: {
          width: 0, // 不显示跑飞机的这条轨迹线
          curveness: 0.3,
        },
        data: flightData,
      },
    ],
  })
})
</script>
<style scoped></style>
