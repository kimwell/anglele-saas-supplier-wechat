// pages/statistics/stockData/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageApi: {
      produtName: '',
      pageIndex: 0,
      pageSize: 10
    },
    list: [],
    loading: true,
    show: false,
    detail: {},
    loadingOver:false 
  },
  getList() {
    let that = this;
    if (!that.data.loading) return;
    that.setData({
      'pageApi.pageIndex': that.data.pageApi.pageIndex + 1
    })
    app.api.productWareHouse(this.data.pageApi).then(res => {
      if (res.code === 1000) {
        if (res.data.data.length < that.data.pageApi.pageSize) {
          that.setData({
            loading: false,
            loadingOver: true
          })
        }
        that.setData({
          list: that.data.list.concat(res.data.data)
        })
      }
    })
  },
  close(){
    this.setData({
      show: false
    })
  },
  showDetail(e){
    this.setData({
      detail: Object.assign({},e.currentTarget.dataset.item),
      show: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.loading) this.getList();
  }

})