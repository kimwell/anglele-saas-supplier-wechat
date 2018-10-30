const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageApi: {
      pageIndex: 0,
      pageSize: 10,
      id: '',
      customerName: '',
      startCreateTime: '',
      endCreateTime: '',
      amountMin: '',
      amountMax: '',
      realAmountMin: '',
      realAmountMax: '',
      status: '',
      orderType: '',
      updateUser: '',
      startUpdateTime: '',
      endUpdateTime: '',
      orderType: '',
      deliveryManId: '',
      finishStatus: 0
    },
    show: false,
    finishStatusData: [{
      value: 0,
      name: '进行中'
    }, {
      value: 1,
      name: '已完成'
    }],
    subStatusData: [],
    list: [],
    loading: true,
    show: false,
    loadingOver: false,
  },
  //  搜索 输入客户名称
  inputBindName(e) {
    this.setData({
      'pageApi.customerName': e.detail.value,
    })
  },
  //  搜索 输入订单编号
  inputBindId(e) {
    this.setData({
      'pageApi.id': e.detail.value,
    })
  },
  clearSearch(){
    this.setData({
      'pageApi.id': '',
      'pageApi.customerName': '',
      'pageApi.startCreateTime': '',
      'pageApi.endCreateTime': ''
    })
  },
  //  重置搜索
  resetSearch(){
    this.clearSearch();
  },
  //  确认搜索
  okSearch(){

  },
  // 切换订单状态
  switchTab(e) {
    var value = e.currentTarget.dataset.item.value
    if (value != this.data.pageApi.finishStatus) {
      this.setData({
        'pageApi.finishStatus': value,
        'pageApi.status': '',
      })
      this.clearList();
    }
    this.setSubData();
  },
  showSearch(){
    this.setData({
      show: true
    })
  },
  close(){
    this.setData({
      show: false
    })
  },
  //  切换订单子状态
  switchSubTab(e){
    var value = e.currentTarget.dataset.item.value;
    if (value != this.data.pageApi.status) {
      this.setData({
        'pageApi.status': value,
      })
      this.clearList();
    }
  },
  //  重置
  clearList() {
    this.setData({
      'pageApi.pageIndex': 0,
      list: [],
      loading: true,
      show: false,
      loadingOver: false,
    })
    this.getList();
  },
  getList() {
    let that = this;
    if (!that.data.loading) return;
    that.setData({
      'pageApi.pageIndex': that.data.pageApi.pageIndex + 1
    })
    app.api.orderPage(this.data.pageApi).then(res => {
      if (res.code === 1000) {
        res.data.data.forEach(el => {
          el.ctime = app.utils.dateformat(el.newOrderDate, 'yyyy-MM-dd');
        })
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
  goDetail(e){
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/common/orderDetail/index?id=' + item.id,
    })
  },
  setSubData() {
    var arr = [];
    var arr1 = [{
      value: '',
      name: '全部'
    }, {
      value: 2,
      name: '已确认'
    }, {
      value: 3,
      name: '配货中'
    }, {
      value: 4,
      name: '配送中'
    }]
    var arr2 = [{
      value: '',
      name: '全部'
    }, {
      value: 5,
      name: '已完成'
    }, {
      value: 9,
      name: '已取消'
    }]
    if (this.data.pageApi.finishStatus === 0) {
      arr = [...arr1]
    } else {
      arr = [...arr2]
    }
    this.setData({
      subStatusData: arr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
    this.setSubData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loading) this.getList();
  }
})