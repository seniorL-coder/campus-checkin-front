<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { fetchActivityList, fetchStatusToEnd } from '@/api/activity/index'
import type { ActivityModel, ActivityQueryParams } from '@/types/activity/index'
import { useRouter } from 'vue-router'
import QrCode from './QrCode/index.vue'
const router = useRouter()
// 2. 响应式数据
const total = ref(0)
const tableData = ref<ActivityModel[]>([]) // 建议在此处定义具体的接口类型
const dateRange = ref<[string, string] | []>([])

const isShowQrCode = ref(false)

const queryParams = reactive<ActivityQueryParams>({
  page: 1,
  limit: 5,
  title: undefined,
  startTime: undefined,
  endTime: undefined,
  targetClasses: undefined,
})

// 3. 获取数据方法
const getList = async () => {
  const { data } = await fetchActivityList({ ...queryParams, title: queryParams.title?.trim() })
  tableData.value = data.records
  total.value = data.total
}

// 根据状态返回 Element Plus 的 Tag 类型
const getStatusTagType = (status: number) => {
  switch (status) {
    case 0:
      return 'info' // 灰色
    case 1:
      return 'success' // 绿色
    case 2:
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
const handleStatusTOEnd = (row: ActivityModel) => {
  ElMessageBox.confirm(`确定要结束签到活动 "${row.title}" 吗?`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    await fetchStatusToEnd(row.id!)
    ElMessage.success('活动已结束')
    getList()
  })
}
const handleCheckIn = async (row: ActivityModel) => {
  isShowQrCode.value = true
  console.log(row)
}
onMounted(() => {
  getList()
})
</script>

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

      <el-table :data="tableData" border stripe>
        <el-table-column type="index" label="序号" align="center">
          <template #default="{ $index }">
            {{ (queryParams.page! - 1) * queryParams.limit! + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id" width="80" align="center" />
        <el-table-column label="活动状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusTagType(row.status)">
              {{ 0 === row.status ? '未开始' : 1 === row.status ? '进行中' : '已结束' }}
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
        <el-table-column label="操作" align="center" width="280" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="1 === row.status"
              link
              type="primary"
              icon="Location"
              @click="handleCheckIn(row)"
              >签到</el-button
            >
            <el-button
              v-if="row.status === 1"
              link
              type="warning"
              icon="SwitchButton"
              @click="handleStatusTOEnd(row)"
              >结束</el-button
            >
            <el-button
              v-if="row.status !== 2"
              link
              type="primary"
              icon="Edit"
              @click="handleUpdate(row)"
              >修改</el-button
            >
            <el-popconfirm
              title="删除将同步删除所有相关数据，确定删除吗？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button link type="danger" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
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
    <QrCode v-model="isShowQrCode" />
  </div>
</template>

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
