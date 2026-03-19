<script setup lang="ts">
import { ref, reactive, nextTick, onMounted, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import AMapLoader from '@amap/amap-jsapi-loader'
import { Location } from '@element-plus/icons-vue'
import type { ActivityModel } from '@/types/activity'
import { fetchCreateActicity } from '@/api/activity'
import type { ClassModel } from '@/types/class'
import { fetchClassesList } from '@/api/class'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps<{
  initialData?: ActivityModel
}>()
const classesList = ref<ClassModel[]>([])
/** --- 表单相关逻辑 --- **/
const formRef = ref<FormInstance>()
const form = reactive({
  id: null, // 修改逻辑通常需要 ID
  title: '',
  radius: 100,
  targetClasses: [] as number[],
  startTime: '',
  endTime: '',
  address: '',
  longitude: 115.115237,
  latitude: 30.152103,
})

// 修改回显：模拟从 API 获取数据并注入表单
const initEditData = (data: ActivityModel) => {
  Object.assign(form, data)
  // 确保 address 字符串存在，用于回显表单只读框
  if (data.longitude && data.latitude) {
    form.address = `${data.longitude}, ${data.latitude}`
  }
}
// 获取班级列表
const getClassesList = async () => {
  const { data } = await fetchClassesList()
  console.log('获取班级', data)

  classesList.value = data
}

// 模拟页面加载时如果是修改模式
onMounted(() => {
  getClassesList()
  if (props.initialData) {
    initEditData(props.initialData)
  }
})

// 2. 自定义校验：结束时间必须晚于开始时间
const validateEndTime = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('请选择结束时间'))
  } else if (form.startTime && value <= form.startTime) {
    callback(new Error('结束时间必须晚于开始时间'))
  } else {
    callback()
  }
}

// 3. 校验规则
const rules = reactive<FormRules>({
  title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  targetClasses: [
    { type: 'array', required: true, message: '请至少选择一个目标班级', trigger: 'change' },
  ],
  radius: [{ required: true, message: '请输入签到半径', trigger: 'blur' }],
  startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  endTime: [{ required: true, validator: validateEndTime, trigger: 'change' }],
  address: [{ required: true, message: '请在地图上选择签到中心点', trigger: 'change' }],
})

/** --- 地图选点逻辑 --- **/
const mapVisible = ref(false)
const searchKey = ref('湖北师范大学文理学院')
let map: any = null
let marker: any = null
let AMapInstance: any = null
let circle: any = null

// 打开地图弹窗
const openMap = async () => {
  mapVisible.value = true
  await nextTick()
  initMap()
}

const initMap = () => {
  // 即使 map 存在，如果 DOM 重新渲染了也需要处理，但用了 destroy-on-close 和 map=null，这里逻辑更稳健
  if (map) return

  AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY,
    version: '2.0',
  })
    .then((AMap) => {
      AMapInstance = AMap
      map = new AMap.Map('map-container', {
        viewMode: '2D',
        zoom: 1,
        center: [form.longitude, form.latitude],
      })

      // 回显关键：初始化时根据 form 的值绘制视觉元素
      updateVisuals(form.longitude, form.latitude)

      map.on('click', (e: any) => {
        const { lng, lat } = e.lnglat
        updateLocation(lng, lat)
      })
    })
    .catch(() => {})
}

// 统一更新地图上的视觉元素
const updateVisuals = (lng: number, lat: number) => {
  if (!map || !AMapInstance) return
  const position = [lng, lat]

  // 1. 更新标记
  if (marker) map.remove(marker)
  marker = new AMapInstance.Marker({ position })
  map.add(marker)

  // 2. 更新半径圆圈
  if (circle) map.remove(circle)
  circle = new AMapInstance.Circle({
    center: position,
    radius: form.radius || 100,
    strokeColor: '#409eff',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#409eff',
    fillOpacity: 0.35,
  })
  map.add(circle)

  map.setFitView([circle])
  map.setZoom(16)
}

// 监听半径变化，实现修改数值时地图同步回显
watch(
  () => form.radius,
  (newVal) => {
    if (map && circle) {
      circle.setRadius(newVal)
      map.setFitView([circle])
    }
  },
)

const updateLocation = (lng: number, lat: number) => {
  form.longitude = lng
  form.latitude = lat
  form.address = `${lng}, ${lat}`
  updateVisuals(lng, lat)
  formRef.value?.validateField('address')
}

const getPosition = async () => {
  if (!searchKey.value) return

  try {
    const response = await fetch(
      `https://restapi.amap.com/v3/geocode/geo?key=${import.meta.env.VITE_AMAP_SEARCH_ADDRESS_KEY}&address=${searchKey.value}`,
    )
    const res = await response.json()
    if (res.geocodes?.length > 0) {
      const [lng, lat] = res.geocodes[0].location.split(',').map(Number)
      updateLocation(lng, lat)
    }
  } catch (e) {
    ElMessage.error('地点查询失败')
  }
}

const onDialogClose = () => {
  if (map) {
    map.destroy()
    map = null
    marker = null
    circle = null
  }
}

/** --- 提交逻辑 --- **/
const onSubmit = async () => {
  const isValid = await formRef.value?.validate()
  if (isValid) {
    if (form.id) {
      console.log('执行修改 API (PUT/POST)', form)
      // TODO: 调用修改接口，例如 updateActivity(form.id, form)
    } else {
      const data = {
        title: form.title,
        startTime: form.startTime,
        endTime: form.endTime,
        longitude: form.longitude,
        latitude: form.latitude,
        radius: form.radius,
        targetClasses: form.targetClasses.join(','),
      }
      await fetchCreateActicity(data)
      ElMessage.success('创建成功!')
      formRef.value?.resetFields()
      router.push('/activity/list')
    }
  }
}
</script>

<template>
  <div class="page-wrapper">
    <h3>{{ form.id ? '编辑活动' : '创建活动' }}</h3>

    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="活动名称" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="签到半径" prop="radius">
        <el-input-number v-model="form.radius" :min="10" />
        <span style="margin-left: 10px">米</span>
      </el-form-item>

      <el-form-item label="签到地点" prop="address">
        <el-input v-model="form.address" readonly placeholder="请点击右侧按钮选择坐标">
          <template #append>
            <el-button @click="openMap">
              <el-icon><Location /></el-icon>在地图上选择
            </el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="目标班级" prop="targetClasses">
        <el-select v-model="form.targetClasses" multiple style="width: 100%">
          <el-option
            v-for="item in classesList"
            :key="item.id"
            :label="item.className"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          {{ form.id ? '保存修改' : '立即创建' }}
        </el-button>
        <el-button @click="() => formRef?.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      @close="onDialogClose"
      v-model="mapVisible"
      title="地图选点"
      width="70%"
      destroy-on-close
    >
      <div class="map-dialog-content">
        <el-tag class="mb-2!"> ( 滚轮可放大缩小地图, 左键长按拖动地图位置, 点击选点 )</el-tag>
        <div class="map-search-bar">
          <el-input v-model="searchKey" placeholder="输入地址搜索" @keyup.enter="getPosition">
            <template #append>
              <el-button @click="getPosition">搜索</el-button>
            </template>
          </el-input>
        </div>
        <div id="map-container" />
        <div class="map-footer-info">
          当前选中：<el-tag>{{ form.longitude }}</el-tag
          >, <el-tag> {{ form.latitude }}</el-tag> | 半径：<el-tag>{{ form.radius }}</el-tag
          >m
        </div>
      </div>
      <template #footer>
        <el-button type="primary" @click="mapVisible = false">确定选择</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  max-width: 800px;
  min-height: 80vh;
  padding: 20px;
}
#map-container {
  width: 100%;
  min-height: 60vh;
}
.map-search-bar {
  margin-bottom: 10px;
}
.map-footer-info {
  margin-top: 10px;
  font-size: 13px;
}
</style>
