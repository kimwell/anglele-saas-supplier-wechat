// pages/common/orderDetail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    logList: []
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
    this.getData(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})