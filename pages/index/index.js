//index.js
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: false,
    todayItem: {}
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
  onLoad: function () {
    this.getData();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.getData();
  }
})