// pages/statistics/transactionData/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageApi: {
      startTime: '',
      endTime: ''
    },
    item: {}
  },
  getData(){
    app.api.summaryStatistics(this.data.pageApi).then(res => {
      if (res.code === 1000) {
        this.setData({
          item: Object.assign({},res.data)
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  }
})