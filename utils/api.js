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



/**
 * 出库列表
 * 
 */

export const wareHouseOutPage = (params) => {
  return fetchApi('sys/wareHouseOut/page', params).then(res => res.data)
}


/**
 * 出库单详情
 * 
 */

export const wareHouseOutDetail = (params) => {
  return fetchApi('sys/wareHouseOut/detail', params).then(res => res.data)
}


/**
 * 出库确认
 * 
 */

export const confirmOut = (params) => {
  return fetchApi('sys/wareHouseOut/confirmOut', params).then(res => res.data)
}


/**
 * 所有配送人
 * 
 */

export const findAllDeliveryMan = (params) => {
  return fetchApi('sys/deliveryMan/findAllDeliveryMan', params).then(res => res.data)
}

/**
 * 货品出库
 * 
 */

export const productOut = (params) => {
  return fetchApi('sys/wareHouseOut/productOut', params).then(res => res.data)
}


/**
 * 小程序数据统计
 * 
 */

export const wxOrderStatics = () => {
  return fetchApi('sys/dataStatistics/wxOrderStatics').then(res => res.data)
}



/**
 * 订单分页
 * 
 */

export const orderPage = (params) => {
  return fetchApi('sys/order/page', params).then(res => res.data)
}


/**
 * 订单详情
 * 
 */

export const findOneOrder = (params) => {
  return fetchApi('sys/order/findOneOrder', params).then(res => res.data)
}

/**
 * 取消订单
 * 
 */
export const orderCancel = (params) => {
  return fetchApi('sys/order/cancel', params).then(res => res.data)
}

/**
 * 订单费用历史
 * 
 */
export const orderFeeHistory = (params) => {
  return fetchApi('sys/orderFee/history', params).then(res => res.data)
}

/**
 * 修改密码
 * 
 */
export const changePass = (params) => {
  return fetchApi('api/changePass', params).then(res => res.data)
}

/**
 * 所有仓库
 * 
 */
export const findWareHouseList = () => {
  return fetchApi('sys/warehouse/findWareHouse').then(res => res.data)
}