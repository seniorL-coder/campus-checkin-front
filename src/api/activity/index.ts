import type { ActivityModel, ActivityQueryParams, UpdateActivityParams } from '@/types/activity'
import type { PageLimitType } from '@/types/apiResponse'
import { request } from '@/utils/request'

/**
 * 创建活动
 * @param data
 * @returns
 */
export const fetchCreateActicity = (data: any) => {
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

/**
 * 结束活动
 * @param id
 * @returns
 */
export const fetchStatusToEnd = (id: number) => {
  return request({
    method: 'GET',
    url: `/activity/status/end/${id}`,
  })
}

/**
 * 更新活动信息
 * @param data
 */
export const fetchUpdateActivity = (data: UpdateActivityParams) => {
  return request({
    method: 'PUT',
    url: '/activity',
    data,
  })
}

/**
 * 获取签到链接
 */
export const fetchGetSignInLink = (data: { activityId: number }) => {
  return request({
    method: 'POST',
    url: '/activity/sign',
    data,
  })
}
/**
 * 初始化签到列表
 */
export const fetchInitSignInList = (id: number) => {
  return request({
    method: 'POST',
    url: `/activity/initCheckIn/${id}`,
  })
}
