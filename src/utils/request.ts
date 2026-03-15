import axios, { type AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types/apiResponse'
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import router from '@/router'
import Nprogress from 'nprogress'
let loadingInstance: any = null

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  withCredentials: true,
})

request.interceptors.request.use(
  (config) => {
    Nprogress.start()
    loadingInstance = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0,0,0,0.2)',
    })
    const { token } = storeToRefs(useUserStore())
    if (token.value) {
      config.headers.Authorization = token.value
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  async <T>(res: AxiosResponse<ApiResponse<T>>): Promise<T> => {
    const response = res.data
    Nprogress.done()
    loadingInstance?.close()
   if(response.code === 1) {
    return response.data as T
   }else{
    ElMessage.error(response.msg)
    return Promise.reject(response.msg)
   }
  },
  async (error) => {
    const userStore = useUserStore()
    // 网络或服务器错误
    const status = error?.response?.status
    if (status === 401) {
      ElMessage.error('登录失效，请重新登录')

      userStore.clearUserInfo() // 清除本地token

      router.replace('/login')
      return Promise.reject(error)
    }
    ElMessage.error(error?.message || '网络错误')
    return Promise.reject(error)
  },
)
