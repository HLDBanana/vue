// store/permission.js
import { asyncRouterMap, mobile_asyncRouterMap, constantRouterMap } from '@/router';
import { isPC } from '@/utils/common';

function hasPermission(codesObj, route) {
  if (route.meta && route.meta.code) {
    // key 为 code，value 为 ID。code 是不变的，ID 会发生改变（如服务器不同或ID更新）。
    // codesObj = {
    //   "1": 100,
    //   "2": 101,
    //   "3": 102,
    // }
    // codesObj 的 key 和路由的 code 对应则说明有查看此页面权限
    let id = codesObj[String(route.meta.code)]
    route.meta.id = id // 给路由的meta添加和code对应的id，在获取单个页面的查看权限会用到
    return id !== undefined
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, codesObj) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(codesObj, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, codesObj)
      }
      res.push(tmp)
    }
  })
  return res
}

const permission = {
  namespaced: true,
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, codesObj) {
      return new Promise(resolve => {
        let map = isPC() ? asyncRouterMap : mobile_asyncRouterMap
        // let map = asyncRouterMap
        let accessedRoutes = filterAsyncRoutes(map, codesObj)
        commit('SET_ROUTERS', accessedRoutes);
        resolve(accessedRoutes)
      })
    }
  }
};

export default permission;
