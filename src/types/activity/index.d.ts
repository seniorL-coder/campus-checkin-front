export interface ActivityModel {
  title: string
  startTime: string
  endTime: string
  longitude: number
  latitude: number
  radius: number
  targetClasses: string
}

export interface ActivityQueryParams {
  page?: number
  limit?: number
  title?: string
  startTime?: string
  endTime?: string
  targetClasses?: string
  createUserId?: number
}
