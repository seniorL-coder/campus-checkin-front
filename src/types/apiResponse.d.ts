export interface ApiResponse<T> {
  code: number
  data: T
  msg: string
}

export interface PageLimitType<T>{
  page: number
  pages: number
  pageSize: number
  total: number
  records: T[]
}
