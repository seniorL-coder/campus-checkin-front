// --- 类型定义 ---
export interface CheckInQueryDTO {
  page: number
  limit: number
  userName?: string
  activityTitle?: string
}

export interface CheckInVO {
  id: number
  activityId: number
  userId: number
  userName: string
  activityTitle: string
  startTime: string
  endTime: string
  checkTime: string
  status: number // 0-未签到, 1-已签到, 2-缺勤, 3-范围外
  activityStatus: number // 0-未开始, 1-进行中, 2-已结束
  longitude: number
  latitude: number
}
