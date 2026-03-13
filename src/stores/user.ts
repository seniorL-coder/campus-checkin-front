import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchLoginAPI, fetchLogoutAPI, fetchUserInfoAPI } from '@/api/user'
import type { loginParamsType, LoginResponseType, UserInfoType } from '@/types/user'
import { constantRoutes } from '@/router/routes'
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router'

export const useUserStore = defineStore(
  'user',
  () => {
    const route = useRoute()
    const router = useRouter()
    // 登录成功之后存储的用户信息
    const token = ref('')
    const loginResponseInfo = ref<LoginResponseType>({} as LoginResponseType)
    const userInfo = ref<UserInfoType>({} as UserInfoType)
    const menuRoutes = ref<RouteRecordRaw[]>(
      constantRoutes,
    ) // 侧边菜单只展示布局下的业务子路由

    const login = async (userInfo: loginParamsType) => {
      const res = await fetchLoginAPI(userInfo)
      if (res.role === 1) {
        loginResponseInfo.value = res
        token.value = res.token
        const redirect = route.query.redirect as string
        router.push(redirect || '/')
        await getUserInfo(res.id)
      } else {
        ElMessage.warning('请使用教师账号登录')
        throw new Error('请使用教师账号登录')
      }
    }
    const getUserInfo = async (id: number) => {
      const res = await fetchUserInfoAPI(id)
      userInfo.value = res
    }
    // 删除token
    const logout = async (id: number) => {
      await fetchLogoutAPI(id)
      token.value = ''
      loginResponseInfo.value = {} as LoginResponseType
      userInfo.value = {} as UserInfoType
      window.location.replace('/login')
    }

    return {
      token,
      loginResponseInfo,
      userInfo,
      menuRoutes,
      login,
      getUserInfo,
      logout,
    }
  },
  {
    persist: {
      pick: ['token', 'loginResponseInfo', 'userInfo'],
    },
  },
)
