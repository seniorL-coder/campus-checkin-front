export interface loginParamsType {
  username: string
  password: string
}

export interface LoginResponseType {
  id: number
  username: string
  realName: string
  role: 1 | 0
  token: string
}
/**
 * 用户信息类型
 */
export interface UserInfoType {
  id: number
  username: string
  realName: string
  role: 1 | 0
  classId: number
  createTime: string
  updateTime: string
  avatar: string
}
