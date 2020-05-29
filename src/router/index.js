import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
]

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { code: 1, },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'pages.dashboard', icon: 'dashboard', code: 1, }
    }]
  },

  {
    path: '/businessOverview',
    component: Layout,
    redirect: '/businessOverview/index',
    meta: { code: 2, },
    children: [
      {
        path: 'index',
        name: 'BusinessOverview',
        component: () => import('@/views/businessOverview/index'),
        meta: { title: 'pages.businessOverview', icon: 'businessOverview', code: 2, }
      },
    ]
  },

  {
    path: '/dataAnalysis',
    component: Layout,
    redirect: '/dataAnalysis/crossProportion',
    meta: { code: 3, },
    children: [
      {
        path: 'crossProportion',
        name: 'crossProportionAnalysis',
        component: () => import('@/views/dataAnalysis/crossProportionAnalysis'),
        meta: { title: 'pages.dataAnalysis', icon: 'crossProportion', code: 3, }
      },
      // {
      //   path: 'tree',
      //   name: 'cashFlowAnalysis',
      //   component: () => import('@/views/dataAnalysis/cashFlowAnalysis'),
      //   meta: { title: '现金流分析', icon: 'tree' }
      // }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

export const mobile_asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { code: 1, },
    children: [{
      path: 'dashboard',
      name: 'mobile_dashboard',
      component: () => import('@/views/dashboard/mobile_dashboard'),
      meta: { title: 'pages.dashboard', icon: 'dashboard', code: 1, }
    }]
  },

  {
    path: '/businessOverview',
    component: Layout,
    redirect: '/businessOverview/index',
    meta: { code: 2, },
    children: [
      {
        path: 'index',
        name: 'mobile_businessOverview',
        component: () => import('@/views/businessOverview/mobile_businessOverview'),
        meta: { title: 'pages.businessOverview', icon: 'businessOverview', code: 2, keepAlive: false, }
      },
    ]
  },

  {
    path: '/mobile_businessOverview_tablePage',
    name: 'mobile_businessOverview_tablePage',
    hidden: true,
    component: () => import('@/views/businessOverview/mobile_businessOverview_tablePage'),
    meta: { title: 'pages.businessOverview', code: 2, }
  },

  {
    path: '/dataAnalysis',
    component: Layout,
    redirect: '/dataAnalysis/crossProportion',
    meta: { code: 3, },
    children: [
      {
        path: 'crossProportion',
        name: 'mobile_crossProportionAnalysis',
        component: () => import('@/views/dataAnalysis/mobile_crossProportionAnalysis'),
        meta: { title: 'pages.dataAnalysis', icon: 'crossProportion', code: 3, }
      },
      // {
      //   path: 'tree',
      //   name: 'cashFlowAnalysis',
      //   component: () => import('@/views/dataAnalysis/cashFlowAnalysis'),
      //   meta: { title: '现金流分析', icon: 'tree' }
      // }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  base: '/data_statistics/',
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
