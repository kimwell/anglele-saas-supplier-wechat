// pages/common/orderDetail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    logList: [],
    isProfit: false //  利润报表过来的
  },
  getData(id){
    app.api.findOneOrder({ id: id }).then(res => {
      res.data.order.utime = app.utils.dateformat(res.data.order.newOrderDate, 'yyyy-MM-dd');
      res.data.order.ctime = app.utils.dateformat(res.data.order.updateTime);
      if(res.data.order.status === 5){
        this.getLog(res.data.order.id)
      }
      if(res.code === 1000){
        this.setData({
          order: Object.assign({},res.data)
        })
      }
    })
  },
  getLog(id){
    app.api.orderFeeHistory({orderId:id}).then(res =>{
      if(res.code === 1000){
        this.setData({
          logList:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isProfit){
      this.setData({
        isProfit: true
      })
    }
    this.getData(options.id)
  }
})