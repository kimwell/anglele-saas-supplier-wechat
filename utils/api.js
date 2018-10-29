// export const URI = 'http://192.168.0.252:8082'
const URI = 'https://saas.anglele.com'
const fetch = require('./fetch')

/**
 * 数据获取公共封装
 */
function fetchApi(path, params) {
  return fetch(URI, path, params)
}


/** =====================登录接口======================== */

/**
 * 登录
 * 
 */
export const login = (params) => {
  return fetchApi('api/login', params).then(res => res.data)
}

/**
 * 查询当前登录人信息
 * 
 */
export const findCurrentUser = () => {
  return fetchApi('auth/baseuser/findCurrentUser').then(res => res.data)
}


/**
 * 交易汇总
 * 
 */
export const summaryStatistics = (params) => {
  return fetchApi('sys/dataStatistics/summaryStatistics', params).then(res => res.data)
}

/**
 * 货品库存管理
 * 
 */

export const productWareHouse = (params) => {
  return fetchApi('sys/dataStatistics/productWareHouse', params).then(res => res.data)
}


/**
 * 销售利润报表
 * 
 */

export const orderProfit = (params) => {
  return fetchApi('sys/dataStatistics/orderProfit', params).then(res => res.data)
}
/**
 * 今日订单汇总
 * 
 */

export const todayOrderSummary = () => {
  return fetchApi('sys/dataStatistics/todayOrderSummary').then(res => res.data)
}

/**
 * 产品销售汇总
 * 
 */

export const productSummary = (params) => {
  return fetchApi('sys/dataStatistics/productSummary', params).then(res => res.data)
}