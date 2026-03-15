<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { ClassModel } from '@/types/class'
import { fetchClassesList, fetchCreateClasses, fetchDeleteClasses, fetchUpdateClasses } from '@/api/class'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
type DialogMode = 'add' | 'update'

const classes = ref<ClassModel[]>([])

const pagination = reactive({
 page: 1,
 pageSize: 10,
 pageSizes: [5, 10, 20, 50],
 total: 0,
})

const searchForm = reactive({
 className: '',
 major: '',
})

const isDialogVisible = ref(false)
const dialogMode = ref<DialogMode>('add')
const currentClass = ref<ClassModel | null>(null)

const formRef = ref<FormInstance>()

const initialFormData = {
  id: '' as string | number,
 className: '',
 teacherName: userStore.userInfo.realName,
 major: '',
}

const formData = reactive({ ...initialFormData })

const rules: FormRules = {
 className: [
   { required: true, message: '请输入班级名称', trigger: 'blur' },
 ],
 major: [
   { required: true, message: '请输入所属专业', trigger: 'blur' },
 ],
}

const resetFormData = () => {
 Object.assign(formData, initialFormData)
}

const openAddDialog = () => {
 dialogMode.value = 'add'
 currentClass.value = null
 resetFormData()
 isDialogVisible.value = true
}

const openEditDialog = (row: ClassModel) => {
 dialogMode.value = 'update'
 currentClass.value = row
 Object.assign(formData, {
  id: row.id,
   className: row.className,
   major: row.major,
 })
 isDialogVisible.value = true
}

const handleSearch = () => {
 pagination.page = 1
 loadClassList()
}

const handleResetSearch = () => {
 searchForm.className = ''
 searchForm.major = ''
 pagination.page = 1
 loadClassList()
}

const handlePageChange = (page: number, pageSize: number) => {
 pagination.page = page
 pagination.pageSize = pageSize
 loadClassList()
}

const loadClassList = async () => {
   const { data } = await fetchClassesList()
   classes.value = data

}

const submitDialog = async () => {
 if (!formRef.value) return

 await formRef.value.validate(async (valid) => {
   if (!valid) return

   if (dialogMode.value === 'add') {

     await fetchCreateClasses({
       className: formData.className,
       major: formData.major,
     })
   } else if (dialogMode.value === 'update' && currentClass.value) {

     await fetchUpdateClasses({
       id: formData.id,
       className: formData.className,
       major: formData.major,
     })
   }

   ElMessage.success(dialogMode.value === 'add' ? '新增成功' : '更新成功')

   isDialogVisible.value = false
   await loadClassList()
 })
}

const handleDelete = async (row: ClassModel) => {

 await fetchDeleteClasses(row.id)
 ElMessage.success('删除成功')
 await loadClassList()
}

onMounted(() => {
 loadClassList()
})
</script>

<template>
 <div>
   <el-card>
     <el-form :model="searchForm" inline>
       <el-form-item label="班级名称">
         <el-input
           v-model="searchForm.className"
           placeholder="请输入班级名称"
           clearable
         />
       </el-form-item>
       <el-form-item label="专业">
         <el-input
           v-model="searchForm.major"
           placeholder="请输入专业"
           clearable
         />
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="handleSearch">
           搜索
         </el-button>
         <el-button @click="handleResetSearch">
           重置
         </el-button>
       </el-form-item>
     </el-form>
   </el-card>

   <el-card class="mt-3!">
     <el-button
       class="mb-3!"
       type="primary"
       @click="openAddDialog"
     >
       新增班级
     </el-button>

     <el-table
       :data="classes"
       border
       stripe
     >
       <el-table-column
         type="index"
         label="#"
         width="60"
         align="center"
       />
       <el-table-column
         prop="className"
         label="班级名称"
         align="center"
       />
       <el-table-column
         prop="teacherName"
         label="班主任"
         align="center"
       />
       <el-table-column
         prop="major"
         label="专业"
         align="center"
       />
       <el-table-column
         prop="createTime"
         label="创建时间"
         align="center"
       />
       <el-table-column
         prop="updateTime"
         label="更新时间"
         align="center"
       />
       <el-table-column
         label="操作"
         width="200"
         align="center"
       >
         <template #default="{ row }">
           <el-button
             type="primary"
             size="small"
             @click="openEditDialog(row)"
           >
             修改
           </el-button>
           <el-button
             type="danger"
             size="small"
             @click="handleDelete(row)"
           >
             删除
           </el-button>
         </template>
       </el-table-column>
     </el-table>

   </el-card>

   <el-dialog
     v-model="isDialogVisible"
     :title="dialogMode === 'add' ? '新增班级' : '编辑班级'"
     width="500px"
     destroy-on-close
   >
     <el-form
       ref="formRef"
       :model="formData"
       :rules="rules"
       label-width="100px"
       status-icon
     >
     <el-form-item label="班主任" prop="teacherName">
         <el-input
           disabled
           v-model="formData.teacherName"
           placeholder="请输入班主任姓名"
         />
       </el-form-item>
       <el-form-item label="班级名称" prop="className">
         <el-input
           v-model="formData.className"
           placeholder="请输入班级名称"
         />
       </el-form-item>

       <el-form-item label="专业" prop="major">
         <el-input
           v-model="formData.major"
           placeholder="请输入专业"
         />
       </el-form-item>

       <div class="dialog-footer">
         <el-button @click="isDialogVisible = false">
           取消
         </el-button>
         <el-button type="primary" @click="submitDialog">
           确认
         </el-button>
       </div>
     </el-form>
   </el-dialog>
 </div>
</template>

<style scoped lang="sass">
.dialog-footer
 text-align: right
 margin-top: 20px
</style>

*** End Patch