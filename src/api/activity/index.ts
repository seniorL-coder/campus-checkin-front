import type { ActivityModel } from '@/types/activity'
import { request } from '@/utils/request'

/**
 * 创建活动
 * @param data
 * @returns
 */
export const fetchCreateActicity = (data: ActivityModel) => {
  return request({
    method: 'POST',
    url: '/activity/create',
    data,
  })
}
