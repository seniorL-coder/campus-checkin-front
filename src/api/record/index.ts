import type { PageLimitType } from '@/types/apiResponse'
import type { CheckInQueryDTO, CheckInVO } from '@/types/checkIn'
import { request } from '@/utils/request'

/**
 * 获取签到列表
 * @param params
 * @returns
 */
export const fetchRecordList = (params: CheckInQueryDTO) => {
  return request<PageLimitType<CheckInVO>>({
    method: 'GET',
    url: '/checkIn',
    params,
  })
}

// 更新学生签到状态
export const fetchUpdateCheckInStatus = (params: {
  userId: number
  activityId: number
  status: string
}) => {
  return request({
    method: 'GET',
    url: '/checkIn/update',
    params,
  })
}
