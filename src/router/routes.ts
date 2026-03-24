import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
    redirect: '/home',
    meta: {
      title: '',
      index: 0,
      icon: 'HomeFilled',
      hidden: false,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'Odometer',
    component: () => import('@/views/Dashboard/index.vue'),
    meta: {
      title: '控制台',
      icon: 'Odometer',
      hidden: false,
    },
  },
  {
    path: '/class',
    name: 'Class',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
      hidden: false,
    },
    children: [
      {
        path: '/class/list',
        name: 'ClassList',
        component: () => import('@/views/ClassList/index.vue'),
        meta: {
          title: '班级管理',
          icon: 'Tickets',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
      hidden: false,
    },
    children: [
      {
        path: '/student/list',
        name: 'StudentList',
        component: () => import('@/views/StudentList/index.vue'),
        meta: {
          title: '学生管理',
          icon: 'User',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/activity',
    name: 'Activity',
    redirect: '/activity/list',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
      title: '签到任务管理',
      icon: 'Clock',
      hidden: false,
    },
    children: [
      {
        path: '/activity/list',
        name: 'ActivityList',
        component: () => import('@/views/Activity/index.vue'),
        meta: {
          title: '活动列表',
          icon: 'List',
          hidden: false,
        },
      },
      {
        path: '/activity/create',
        name: 'ActivityForm',
        component: () => import('@/views/Activity/ActivityForm.vue'),
        meta: {
          title: '发布活动',
          icon: 'LocationInformation',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/record',
    name: 'Record',
    redirect: '/record/all',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
      hidden: false,
    },
    children: [
      {
        path: '/record/all',
        name: 'RecordAll',
        component: () => import('@/views/Record/CheckInRecord.vue'),
        meta: {
          title: '签到日志',
          icon: 'Reading',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: 'pathMatch',
      hidden: true,
    },
  },
]
