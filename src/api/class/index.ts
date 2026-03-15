import type { ClassModel } from '@/types/class'
import { request } from '@/utils/request'

/**
 *
 * @returns 获取班级列表
 */
export const fetchClassesList = () => {
    return request<ClassModel[]>({
        method:'GET',
        url:'/class/list',
    })
}