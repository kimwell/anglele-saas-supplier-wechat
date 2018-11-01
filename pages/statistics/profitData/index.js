// pages/statistics/profitData/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageApi: {
      orderId: '',
      customerName: '',
      createOrderTimeBegin: '',
      createOrderTimeEnd: '',
      sellPriceBegin: '',
      sellPriceEnd: '',
      profitBegin: '',
      profitEnd: '',
      pageIndex: 0,
      pageSize: 10
    },
    list: [],
    loading: true,
    show: false,
    loadingOver: false,
    startTime: '',
    endTime: ''
  },
  inputBindCustomer() {

  },
  changeStart(e) {
    let val = e.detail.value
    this.setData({
      startTime: val,
      'pageApi.createOrderTimeBegin': this.tranData(val),
    })
  },
  changeEnd(e) {
    let val = e.detail.value
    this.setData({
      endTime: val,
      'pageApi.createOrderTimeEnd': this.tranData(val),
    })
  },
  //  年月日转毫秒时间戳
  tranData(val) {
    var date = val;
    date = date.replace(/-/g, '/');
    var time = new Date(date).getTime();
    return time
  },
  //  输入客户名称
  inputBindCustomer(e) {
    this.setData({
      'pageApi.customerName': e.detail.value
    })
  },
  searchs() {
    this.setData({
      'pageApi.pageIndex': 0,
      list: [],
      loading: true,
      loadingOver: false
    })
    this.getList();
  },
  clearSearchs() {
    this.setData({
      'pageApi.createOrderTimeBegin': '',
      'pageApi.createOrderTimeEnd': '',
      'pageApi.customerName': '',
      'pageApi.pageIndex': 0,
      startTime: '',
      endTime: '',
      list: [],
      loading: true,
      loadingOver: false
    })
    this.getList();
  },
  getList() {
    let that = this;
    if (!that.data.loading) return;
    that.setData({
      'pageApi.pageIndex': that.data.pageApi.pageIndex + 1
    })
    app.api.orderProfit(this.data.pageApi).then(res => {
      if (res.code === 1000) {
        res.data.page.data.forEach(el => {
          el.ctime = app.utils.dateformat(el.newOrderDate, 'yyyy-MM-dd');
        })
        if (res.data.page.data.length < that.data.pageApi.pageSize) {
          that.setData({
            loading: false,
            loadingOver: true
          })
        }
        that.setData({
          list: that.data.list.concat(res.data.page.data)
        })
      }
    })
  },
  goRouter(e) {
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/common/orderDetail/index?id=' + item.id + '&isProfit=' + true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loading) this.getList();
  }

})