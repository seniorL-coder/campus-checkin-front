import dayjs from 'dayjs'

export const getTimePeriod = (timestamp: number) => {
  const hour = dayjs(timestamp).hour()

  if (hour >= 0 && hour < 6) return '凌晨'
  if (hour >= 6 && hour < 12) return '上午'
  if (hour >= 12 && hour < 14) return '中午'
  if (hour >= 14 && hour < 18) return '下午'
  return '晚上'
}
