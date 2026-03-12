import { request } from '@/utils/request.ts'
import type { loginParamsType, LoginResponseType, UserInfoType } from '@/types/user'
import type { ApiResponse } from '@/types/apiResponse'

export const fetchLoginAPI = (data: loginParamsType) => {
  return request<loginParamsType, LoginResponseType>({
    method: 'POST',
    url: '/user/user/login',
    data
  })
}

/**
 * index/info
 * 获取用户信息
 */
export const fetchUserInfoAPI = (id: number) => {
  return request<unknown, UserInfoType>({
    method: 'POST',
    url: '/user/user/info',
    data: { userId: id }
  })
}

/**
 * index/logout
 * 登出
 */
export const fetchLogoutAPI = (id: number) => {
  return request({
    method: 'POST',
    url: '/user/user/logout',
    data: { userId: id }
  })
}
