<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form :model="queryParams" ref="queryFormRef" :inline="true">
        <el-form-item label="活动标题" prop="title">
          <el-input
            v-model="queryParams.title"
            placeholder="请输入标题"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item label="活动时间">
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD HH:mm:ss"
            @change="handleDateChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="table-wrapper">
      <template #header>
        <div class="toolbar">
          <el-button type="success" icon="Plus" @click="handleAdd">新增活动</el-button>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" border stripe>
        <el-table-column type="index" label="序号" align="center">
          <template #default="{ $index }">
            {{ (queryParams.page! - 1) * queryParams.limit! + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id" width="80" align="center" />
        <el-table-column label="活动状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusTagType(row.startTime, row.endTime)">
              {{ getActivityStatus(row.startTime, row.endTime) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="活动标题"
          align="center"
          prop="title"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column label="目标班级" align="center" prop="targetClassesName" width="250" />
        <el-table-column label="开始时间" align="center" prop="startTime" width="180" />
        <el-table-column label="结束时间" align="center" prop="endTime" width="180" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />

        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template #default="scope">
            <el-button link type="primary" icon="Location" @click="handleCheckIn(scope.row)"
              >签到</el-button
            >
            <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
              >修改</el-button
            >
            <el-button link type="danger" icon="Delete" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="queryParams.page"
          v-model:page-size="queryParams.limit"
          :total="total"
          :page-sizes="[5, 10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="getList"
          @current-change="getList"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { fetchActivityList } from '@/api/activity/index'
import type { ActivityModel, ActivityQueryParams } from '@/types/activity/index'
import { getActivityStatus, ActivityStatus } from '@/utils/getActivityStatus'
import { useRouter } from 'vue-router'
const router = useRouter()
// 2. 响应式数据
const loading = ref(false)
const total = ref(0)
const tableData = ref<any[]>([]) // 建议在此处定义具体的接口类型
const dateRange = ref<[string, string] | []>([])

const queryParams = reactive<ActivityQueryParams>({
  page: 1,
  limit: 10,
  title: undefined,
  startTime: undefined,
  endTime: undefined,
  targetClasses: undefined,
})

// 3. 获取数据方法
const getList = async () => {
  loading.value = true
  try {
    // 模拟 API 请求
    const { data } = await fetchActivityList(queryParams)
    tableData.value = data.records
    total.value = data.total
    console.log('正在请求数据，参数为：', queryParams)
  } finally {
    loading.value = false
  }
}

// 根据状态返回 Element Plus 的 Tag 类型
const getStatusTagType = (start: string, end: string) => {
  const status = getActivityStatus(start, end)
  switch (status) {
    case ActivityStatus.NOT_STARTED:
      return 'info' // 灰色
    case ActivityStatus.ONGOING:
      return 'success' // 绿色
    case ActivityStatus.ENDED:
      return 'danger' // 红色
    default:
      return 'info'
  }
}
// 4. 事件处理
const handleQuery = () => {
  queryParams.page = 1
  getList()
}

const resetQuery = () => {
  dateRange.value = []
  queryParams.page = 1
  queryParams.title = ''
  queryParams.startTime = ''
  queryParams.endTime = ''
  queryParams.createUserId = undefined
  getList()
}

const handleDateChange = (val: any) => {
  if (val) {
    queryParams.startTime = val[0]
    queryParams.endTime = val[1]
  } else {
    queryParams.startTime = ''
    queryParams.endTime = ''
  }
}

const handleAdd = () => {
  router.push('/activity/create')
}

const handleUpdate = (row: any) => {
  ElMessage.info(`修改活动 ID: ${row.id}`)
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确认删除活动 "${row.title}" 吗?`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('删除成功')
    getList()
  })
}

const handleCheckIn = (row: ActivityModel) => {
  console.log(row)
}
onMounted(() => {
  getList()
})
</script>

<style scoped>
.app-container {
  padding: 20px;
  min-height: 80vh;
}
.search-wrapper {
  margin-bottom: 20px;
}
.table-wrapper {
  margin-bottom: 20px;
}
.toolbar {
  display: flex;
  justify-content: flex-start;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
