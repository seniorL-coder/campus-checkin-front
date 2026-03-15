<script setup lang="ts">
import { fetchClassesList } from '@/api/class'
import { fetchStudentList } from '@/api/student'
import type { ClassModel } from '@/types/class'
import type { StudentModel, StudentQueryDTO } from '@/types/student'
import { ref } from 'vue'
import StudentDialog from './components/StudentDialog.vue'

const students = ref<StudentModel[]>([])
const classesList = ref<ClassModel[]>([])

// 控制弹窗的显示与隐藏
const isShowDialog = ref(false)
const mode = ref<'add' |'update'>('add')
const currentStudent = ref<StudentModel>({} as StudentModel)

const pagination = ref({
  page: 1,
  pageSize: 3,
  pageSizes: [3, 5, 10, 15, 20],
  pages: 0,
  total: 0,
})
const formData = ref({
  realName: '',
  classId: '',
})
const studentQueryDTO = ref<StudentQueryDTO>(
  {
    page: pagination.value.page,
    limit: pagination.value.pageSize,
    realName: formData.value.realName,
    classId: undefined,
  },
)
const getStudentList = async (studentQueryDTO: StudentQueryDTO) => {
  const { data } = await fetchStudentList(studentQueryDTO)
  students.value = data.records
  pagination.value.total = data.total
  pagination.value.page = data.page
  pagination.value.pageSize = data.pageSize
  pagination.value.pages = data.pages

}
getStudentList(studentQueryDTO.value)
const handlePageChange = (page: number, limit: number) => {
  studentQueryDTO.value.limit = limit
  studentQueryDTO.value.page = page
  getStudentList(studentQueryDTO.value)
}

const handleSearch = () => {
  studentQueryDTO.value.realName = formData.value.realName
  studentQueryDTO.value.page = 1
  studentQueryDTO.value.limit = 5
  getStudentList(studentQueryDTO.value)
}

const getClassesList = async () => {
  const { data } = await fetchClassesList()
  console.log(data)
  classesList.value = data

}
getClassesList()

const handleClassesChange = (n: string | number | boolean) => {
  studentQueryDTO.value.classId = n as number
  studentQueryDTO.value.page = 1
  studentQueryDTO.value.limit = 5
  getStudentList(studentQueryDTO.value)

}

const handleAddStudent = () => {
  isShowDialog.value = true
  mode.value = 'add'

}

const handleUpdate = (row: StudentModel) => {
console.log(row)

}

const handleDelete = (row: StudentModel) => {
  console.log(row)

}

const getLastStudentList = () => {
  studentQueryDTO.value.page = 1
  getStudentList(studentQueryDTO.value)
}
</script>

<template>
  <div>
    <el-card>
      <el-form :model="formData" inline>
        <el-form-item prop="realName" label="搜索: ">
          <el-input v-model="formData.realName" placeholder="请输入学生姓名搜索" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="formData.realName = ''">重置</el-button>
        </el-form-item>
        <el-form-item label="班级: ">
          <el-select class="w-[200px]!" @change="handleClassesChange" v-model="formData.classId">
            <el-option
            v-for="item in classesList" :label="item.className" :value="item.id" :key="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt-3!">
      <el-button class="mb-3!" type="primary" @click="handleAddStudent">添加</el-button>
      <el-table border stripe :data="students">
        <el-table-column type="index" label="#" align="center" />
        <el-table-column label="头像" align="center">
          <template #default="{ row }">
            <el-avatar :src="row.avatar" />
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="realName" align="center" />
        <el-table-column label="账号" prop="username" align="center" />
        <el-table-column label="班级" prop="className" align="center" />
        <el-table-column label="创建时间" prop="createTime" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleUpdate(row)">修改</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>

          </template>
        </el-table-column>

      </el-table>
      <el-pagination
      class="mt-2!"
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes" :total="pagination.total"
      layout="prev, pager, next, jumper, -> ,total, sizes" @change="handlePageChange" />
    </el-card>
    <student-dialog
     @update:students="getLastStudentList"
     v-model="isShowDialog"
     :mode="mode"
     :row="currentStudent" />
  </div>
</template>

<style scoped lang="sass"></style>
