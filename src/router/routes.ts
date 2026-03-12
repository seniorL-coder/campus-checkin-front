import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
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
    path: '/acl',
    name: 'Acl',
    component: () => import('@/views/Layout/index.vue'),
    redirect: '/acl/role',
    meta: {
      title: '权限管理',
      icon: 'Lock',
      hidden: false,
    },
    children: [
      {
        path: '/acl/role',
        name: 'Role',
        component: () => import('@/views/Acl/Role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
          hidden: false,
        },
      },
      {
        path: '/acl/permission',
        name: 'Permission',
        component: () => import('@/views/Acl/Permission/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Lock',
          hidden: false,
        },
      },
      {
        path: '/acl/user',
        name: 'User',
        component: () => import('@/views/Acl/User/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'User',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/views/Layout/index.vue'),
    redirect: '/product/trademark',
    meta: {
      title: '商品管理',
      icon: 'Goods',
      hidden: false,
    },
    children: [
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/Product/Trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
          hidden: false,
        },
      },
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/Product/Attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'TakeawayBox',
          hidden: false,
        },
      },
      {
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/Product/SPU/index.vue'),
        meta: {
          title: 'SPU管理',
          icon: 'TakeawayBox',
          hidden: false,
        },
      },
      {
        path: '/product/sku',
        name: 'Sku',
        component: () => import('@/views/Product/SKU/index.vue'),
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/Screen/index.vue'),
    meta: {
      title: '数据大屏',
      icon: 'Monitor',
      hidden: false,
    },
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
    name: '404',
    meta: {
      title: 'pathMatch',
      hidden: true,
    },
  },
]
