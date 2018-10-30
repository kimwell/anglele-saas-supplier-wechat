//index.js
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: false,
    todayItem: {},
    staticsItem: []
  },
  getData(){
    var that = this;
    app.api.todayOrderSummary().then(res => {
      if(res.code === 1000){
        that.setData({
          todayItem: Object.assign({},res.data)
        })
      }
    })
  },
  getStatics() {
    var that = this;
    app.api.wxOrderStatics().then(res =>{
      if(res.code === 1000){
        that.setData({
          staticsItem: Object.assign({}, res.data)
        })
      }
    })
  },
  goOutRoute(e){
    var status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: '/pages/common/storehouseOut/index?status=' + status,
    })
  },
  goOrderRoute(){
    wx.navigateTo({
      url: '/pages/common/order/index',
    })
  },
  onLoad: function () {
    this.getData();
    this.getStatics();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.getData();
  }
})