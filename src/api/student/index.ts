import type { PageLimitType } from '@/types/apiResponse'
import type { AddStudentModel, StudentModel, StudentQueryDTO } from '@/types/student'
import { request } from '@/utils/request'

/**
 * 分页查询学生列表
 * @param studentQueryDTO
 * @returns
 */
export const fetchStudentList = (studentQueryDTO : StudentQueryDTO) => {
   return request<PageLimitType<StudentModel>>({
    method: 'POST',
    url: '/student/list',
    data: studentQueryDTO,
   })
}

/**
 *  添加学生
 * @param data
 * @returns
 */
export const fetchAddStudent = (data: AddStudentModel) => {
    return request({
        method:'POST',
        url:'/student',
        data,
    })
}