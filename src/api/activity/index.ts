import type { ActivityModel, ActivityQueryParams } from '@/types/activity'
import type { PageLimitType } from '@/types/apiResponse'
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

/**
 * 分页查询活动列表
 * @param data
 * @returns
 */
export const fetchActivityList = (data: ActivityQueryParams) => {
  return request<PageLimitType<ActivityModel>>({
    method: 'POST',
    url: '/activity/list',
    data,
  })
}

// 修改活动状态为已结束
// /admin/activity/status/end/{id}
export const fetchStatusToEnd = (id: number) => {
  return request({
    method: 'GET',
    url: `/activity/status/end/${id}`,
  })
}
