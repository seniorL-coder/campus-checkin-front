<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Edit } from '@element-plus/icons-vue'
import type { CheckInVO, CheckInQueryDTO } from '@/types/checkIn/index'
import { fetchRecordList, fetchUpdateCheckInStatus } from '@/api/record'
import wsService from '@/utils/socket'
import { useUserStore } from '@/stores/user'
import moment from 'moment'
// --- 状态变量 ---
const loading = ref(false)
const tableData = ref<CheckInVO[]>([])
const total = ref(0)

const queryParams = reactive<CheckInQueryDTO>({
  page: 1,
  limit: 10,
  userName: '',
  activityTitle: '',
})

const updateStatusApi = async (params: { userId: number; activityId: number; status: string }) => {
  await fetchUpdateCheckInStatus(params)
}

// 获取列表数据
const handleQuery = async () => {
  loading.value = true
  try {
    const { data } = await fetchRecordList(queryParams)

    tableData.value = data.records
    total.value = data.total
  } finally {
    loading.value = false
  }
}

// 重置查询
const resetQuery = () => {
  queryParams.userName = ''
  queryParams.activityTitle = ''
  queryParams.page = 1
  handleQuery()
}

// 更新学生签到状态
const handleUpdateStatus = (row: CheckInVO) => {
  ElMessageBox.prompt('请输入新的状态码 (0:未签到, 1:已签到, 2:缺勤, 3:范围外)', '修改签到状态', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[0-3]$/,
    inputErrorMessage: '状态码必须是 0-3 之间的数字',
  }).then(async ({ value }) => {
    await updateStatusApi({ userId: row.userId, activityId: row.activityId, status: value })
    ElMessage.success('状态更新成功')
    handleQuery()
  })
}

// 状态样式映射
const getStatusType = (status: number) => {
  const map: any = { 0: 'info', 1: 'success', 2: 'danger', 3: 'warning' }
  return map[status] || 'info'
}

const getStatusLabel = (status: number) => {
  const map: any = { 0: '未签到', 1: '已签到', 2: '缺勤', 3: '范围外' }
  return map[status] || '未知'
}

onMounted(() => {
  handleQuery()

  const token = useUserStore().token
  wsService.connect(token)

  // 监听后端发送的 JSON，type 匹配则触发回调
  wsService.on<any>('STUDENT_SIGNED_IN', (data) => {
    // data 结构参考后端：{ userId: 123, activityId: 456, checkTime: "2023-..." }
    ElNotification({
      title: '新签到提醒',
      // 使用模板字符串组装消息内容
      message: `学生 ID: ${data.userId} 已于 ${moment(data.checkTime).format('YYYY-MM-DD HH:mm:ss')} 签到成功`,
      type: 'success', // 成功的绿色样式
      position: 'top-right', // 屏幕右上角出现
      duration: 2000, // 3秒后自动关闭
    })
  })
})
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="学生姓名">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input
            v-model="queryParams.activityTitle"
            placeholder="请输入"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleQuery">查询</el-button>
          <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="table-wrapper">
      <el-table v-loading="loading" :data="tableData" border stripe>
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column align="center" prop="userName" label="学生姓名" min-width="120" />
        <el-table-column
          align="center"
          prop="activityTitle"
          label="活动名称"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column prop="checkTime" label="签到时间" width="180" align="center" />

        <el-table-column label="签到状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="活动状态" width="100" align="center">
          <template #default="{ row }">
            <span v-if="row.activityStatus === 0">未开始</span>
            <span v-else-if="row.activityStatus === 1" style="color: #409eff">进行中</span>
            <span v-else style="color: #909399">已结束</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="150" align="center">
          <template #default="{ row }">
            <el-button type="primary" link :icon="Edit" @click="handleUpdateStatus(row)">
              修改状态
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="queryParams.page"
          v-model:page-size="queryParams.limit"
          layout="prev, pager, next, jumper, -> , total, sizes,"
          :total="total"
          @size-change="handleQuery"
          @current-change="handleQuery"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  padding: 20px;
  min-height: 100vh;

  .search-wrapper {
    margin-bottom: 20px;
  }

  .table-wrapper {
    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
