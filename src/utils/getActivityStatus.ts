// 定义活动状态枚举
export enum ActivityStatus {
  NOT_STARTED = '未开始',
  ONGOING = '进行中',
  ENDED = '已结束',
  UNKNOWN = '未知',
}

/**
 * 判断活动当前状态
 * @param startTime 开始时间字符串 (如: "2023-10-01 10:00:00")
 * @param endTime 结束时间字符串
 * @returns ActivityStatus
 */
export const getActivityStatus = (startTime?: string, endTime?: string): ActivityStatus => {
  if (!startTime || !endTime) return ActivityStatus.UNKNOWN

  const now = new Date().getTime()
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()

  if (now < start) {
    return ActivityStatus.NOT_STARTED
  } else if (now >= start && now <= end) {
    return ActivityStatus.ONGOING
  } else {
    return ActivityStatus.ENDED
  }
}
