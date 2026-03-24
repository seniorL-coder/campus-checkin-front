import type { StudentStatsVO } from '@/types/dashboard'
import { request } from '@/utils/request'

/**
 * 获取学生统计信息
 * @returns
 */
export const fetchStudentStats = () => {
  return request<StudentStatsVO>({
    url: '/dashboard/student/stats',
  })
}
