import type { PageLimitType } from '@/types/apiResponse'
import type { CheckInQueryDTO, CheckInVO } from '@/types/checkIn'
import { request } from '@/utils/request'

export const fetchRecordList = (params: CheckInQueryDTO) => {
  return request<PageLimitType<CheckInVO>>({
    method: 'GET',
    url: '/checkIn',
    params,
  })
}
