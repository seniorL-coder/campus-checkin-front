import { useUserStore } from '@/stores/user'
import router from './index'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Setting from '@/settings.ts'
router.beforeEach(async (to) => {
  const userStore = useUserStore()
  document.title = `${Setting.title} - ${to.meta.title ?? ''}`
  Nprogress.start()
  if (userStore.token && userStore.token !== '') {
    if (to.path === '/login') {
      return '/'
    }
    // if (!userStore.isFetched) {
    //   await userStore.getUserInfo()
    //   return {
    //     path: to.path,
    //     query: to.query,
    //     hash: to.hash,
    //     replace: true,
    //   }
    // }
    return true
  } else {
    ElMessage.warning('请先登录')
    if (to.path === '/login') {
      return true
    }
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }

  }
})

router.afterEach(() => {
  Nprogress.done()
})
