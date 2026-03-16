import type { ClassModel, CreateClassesType, UpdateClassesType } from '@/types/class'
import { request } from '@/utils/request'

/**
 *
 * @returns 获取班级列表
 */
export const fetchClassesList = () => {
  return request<ClassModel[]>({
    method: 'GET',
    url: '/class/list',
  })
}
/**
 *
 * @param data 修改班级
 * @returns
 */
export const fetchUpdateClasses = (data: UpdateClassesType) => {
  return request({
    method: 'PUT',
    url: '/class',
    data,
  })
}
/**
 * 添加班级
 * @param data
 * @returns
 */
export const fetchCreateClasses = (data: CreateClassesType) => {
  return request({
    method: 'POST',
    url: '/class',
    data,
  })
}

/**
 * 删除班级
 * @param id 班级ID
 * @returns
 */
export const fetchDeleteClasses = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/class/${id}`,
  })
}
