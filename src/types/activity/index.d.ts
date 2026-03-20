export interface ActivityModel {
  id: number
  title: string
  startTime: string
  endTime: string
  longitude: number
  latitude: number
  radius: number
  targetClassesName: string
  targetClasses: string
  createUserId: number
  createTime: string
  updateTime: string
  status: 0 | 1 | 2
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

export interface UpdateActivityParams {
  id: number
  title?: string
  startTime?: string
  endTime?: string
  // longitude?: number
  // latitude?: number
  // radius?: number
  // targetClassesName?: string
  // targetClasses?: string
  // status?: 0 | 1 | 2
}
