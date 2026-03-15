import { request } from '@/utils/request.ts'
import type { loginParamsType, LoginResponseType, UserInfoType } from '@/types/user'

export const fetchLoginAPI = (data: loginParamsType) => {
  return request<loginParamsType, LoginResponseType>({
    method: 'POST',
    url: '/user/login',
    data,
  })
}

/**
 * index/info
 * 获取用户信息
 */
export const fetchUserInfoAPI = () => {
  return request<unknown, UserInfoType>({
    method: 'POST',
    url: '/user/info',
  })
}

/**
 * index/logout
 * 登出
 */
export const fetchLogoutAPI = (id: number) => {
  return request({
    method: 'POST',
    url: '/user/logout',
    data: { userId: id },
  })
}
