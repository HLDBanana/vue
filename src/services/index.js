import {request, getData,} from '@/axios/request'
import {platformUrl} from '@/config'

export const getLogin = (data = {}, config = {}) => {
  return request(`${platformUrl}/platform-api/user/login`, data, {notNeedToken: true, ...config})
}
export const userInfoGet = (data = {}, config = {}) => {
  return request(`${platformUrl}/platform-api/user/get`, data, {noloading: true, ...config})
}
export const logOut = (data = {}, config = {}) => { // 退出登录
  return request(`${platformUrl}/platform-api/user/logout`, data, {...config})
}
export const userUpdate = (data = {}, config = {}) => { // 用户账户修改
  return request(`${platformUrl}/platform-api/user/update`, data, {...config})
}

export const getMenuList = (data = {}, config = {}) => { // 菜单列表
  return request(`${platformUrl}/platform-api/user/menu/list`, data, {noloading: true, ...config})
}
export const getAllMenuList = (config = {}) => { // 获取所有子集菜单列表
  return getData(`${platformUrl}/data_analysis/menu/list`, {noloading: true, ...config})
}

// 导航栏
export const getUserOrg = (data = {}, config = {}) => { // 组织架构
  return request(`${platformUrl}/data_analysis/oaSysOrg/getUserOrg`, data, {noloading: true, ...config})
}
export const getCountryList = (data = {}, config = {}) => { // 国家列表
  return request(`${platformUrl}/crm-api/common/country/list`, data, {noloading: true, ...config})
}
export const getCountry = (data = {}, config = {}) => { // 国家列表
  return request(`${platformUrl}/data_analysis/oaSysOrg/getCountry`, data, {noloading: true, ...config})
}

// 首页
export const getDataCollect = (data = {}, config = {}) => { // 首页第一行数据
  return request(`${platformUrl}/data_analysis/homePage/getDataCollect`, data, {noloading: true, ...config})
}
export const getSceneInfoByShop = (data = {}, config = {}) => { // 场景分布统计（按网点）
  return request(`${platformUrl}/data_analysis/homePage/sceneInfoByShop`, data, {noloading: true, ...config})
}
export const getSceneInfoByOrder = (data = {}, config = {}) => { // 场景分布统计（按订单）
  return request(`${platformUrl}/data_analysis/homePage/sceneInfoByOrder`, data, {noloading: true, ...config})
}
export const getSceneInfoByIncome = (data = {}, config = {}) => { // 场景分布统计（按营收）
  return request(`${platformUrl}/data_analysis/homePage/sceneInfoByIncome`, data, {noloading: true, ...config})
}
export const getUserRegisterChannel = (data = {}, config = {}) => { // 用户注册渠道统计
  return request(`${platformUrl}/data_analysis/homePage/userRegisterChannel`, data, {noloading: true, ...config})
}
export const getOrderRatioByMoney = (data = {}, config = {}) => { // 订单占比统计
  return request(`${platformUrl}/data_analysis/homePage/orderRatio`, data, {noloading: true, ...config})
}
export const getOrderRatioByTime = (data = {}, config = {}) => { // 订单占比统计
  return request(`${platformUrl}/data_analysis/homePage/orderTime`, data, {noloading: true, ...config})
}
export const getOrderChannel = (data = {}, config = {}) => { // 订单付款渠道分析
  return request(`${platformUrl}/data_analysis/homePage/orderChannel`, data, {noloading: true, ...config})
}
export const getRevenueStream = (data = {}, config = {}) => { // 营收流水
  return request(`${platformUrl}/data_analysis/income/incomePledge`, data, {noloading: true, ...config})
}
export const getIncomeCompare = (data = {}, config = {}) => { // 营收同比、环比增长分析
  return request(`${platformUrl}/data_analysis/income/incomeCompare`, data, {noloading: true, ...config})
}

// 经营概况
export const getShopDataList = (data = {}, config = {}) => { // 网点数据列表
  return request(`${platformUrl}/data_analysis/manage/getShopDataList`, data, {noloading: true, isNoCancel: true, ...config})
}
export const excelDownload = (data = {}, config = {}) => { // 导出excel
  return request(`${platformUrl}/data_analysis/manage/excelDownloadTop`, data, {noloading: true, ...config})
}
export const getManageDetail = (data = {}, config = {}) => { // 经营概况总成交信息
  return request(`${platformUrl}/data_analysis/manage/getManageDetail`, data, {noloading: true, ...config})
}
export const getShopTerminalInfo = (data = {}, config = {}) => { // 查询网点设备型号和设备号
  return request(`${platformUrl}/data_analysis/manage/getShopTerminalInfo`, data, {noloading: true, ...config})
}

// 交叉分析占比
export const orderAnalysis = (data = {}, config = {}) => {  // 总分析占比
  return request(`${platformUrl}/data_analysis/ratio/orderAnalysis`, data, { noloading: true, ...config })
}
export const analysisByTime = (data = {}, config = {}) => {  // 日均统计
  return request(`${platformUrl}/data_analysis/ratio/analysisByTime`, data, { noloading: true, ...config })
}
export const downloadByTime = (data = {}, config = {}) => {  // 导出日均统计报表
  return request(`${platformUrl}/data_analysis/ratio/excelExport`, data, { noloading: true, ...config })
}
