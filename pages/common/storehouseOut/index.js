// pages/common/storehouseOut/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageApi: {
      pageIndex: 0,
      pageSize: 6,
      status: 1,
      orderId: '',
      customerName: '',
      updateUser: '',
      updateTimeBegin: '',
      updateTimeEnd: '',
      id: ''
    },
    list: [],
    loading: true,
    show: false,
    loadingOver: false,
    statusIndex: 1,
    statusData: [{
      name: '待确认',
      value: 1
    }, {
      name: '已确认',
      value: 2
    }, {
      name: '已出库',
      value: 3
    }, {
      name: '已完成',
      value: 4
    }, {
      name: '已取消',
      value: 9
    }],
    showAction: false,
    deliveryMan: [],
    actions: [{
      name: '确定',
      color: '#ed3f14'
    }],
    deliveryManIndex: null,
    outApi: {
      id: '',
      deliveryManId: ''
    },
    searchShow: false,
    startTime: '',
    endTime: '',
    left: 27
  },
  showSearch(){
    this.setData({
      searchShow: true
    })
  },
  changeStart(e) {
    let val = e.detail.value
    this.setData({
      startTime: val,
      'pageApi.updateTimeBegin': this.tranData(val),
    })
  },
  changeEnd(e) {
    let val = e.detail.value
    this.setData({
      endTime: val,
      'pageApi.updateTimeEnd': this.tranData(val),
    })
  },

  //  年月日转毫秒时间戳
  tranData(val) {
    var date = val;
    date = date.replace(/-/g, '/');
    var time = new Date(date).getTime();
    return time
  },
  //  搜索 输入客户名称
  inputBindName(e) {
    this.setData({
      'pageApi.customerName': e.detail.value,
    })
  },
  //  搜索 输入出库单号
  inputBindId(e) {
    this.setData({
      'pageApi.id': e.detail.value,
    })
  },
  //  搜索 输入订单编号
  inputBindOrderId(e) {
    this.setData({
      'pageApi.orderId': e.detail.value,
    })
  },
  clearSearch() {
    this.setData({
      'pageApi.id': '',
      'pageApi.orderId': '',
      'pageApi.customerName': '',
      'pageApi.updateTimeBegin': '',
      'pageApi.updateTimeEnd': '',
      startTime: '',
      endTime: '',
    })
  },
  //  重置搜索
  resetSearch() {
    this.clearSearch();
    this.clearList();
    this.close();
  },
  close() {
    this.setData({
      searchShow: false
    })
  },
  //  确认搜索
  okSearch() {
    this.clearList();
    this.close();
  },
  switchTab(e) {
    var value = e.currentTarget.dataset.item.value;
    var idx = e.currentTarget.dataset.idx;
    if (value != this.data.statusIndex) {
      this.setData({
        statusIndex: value,
        'pageApi.status': value,
        left: idx === 0 ? 27 : (idx * 134 + 27).toFixed(2)
      })
      this.clearSearch();
      this.clearList();
    }
  },
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
  //  操作
  optionsItem(e) {
    let that = this;
    var types = e.currentTarget.dataset.type;
    var item = e.currentTarget.dataset.item;
    if (types === 'detail') {
      wx.navigateTo({
        url: '/pages/common/outDetail/index?id=' + item.id,
      })
    } else if (types === 'order') {
      wx.showModal({
        title: '确认出库订单',
        content: '确认出库订单？',
        success: function (res) {
          if (res.confirm) {
            that.confirmOut(item)
          }
        }
      })
    } else {
      this.setData({
        'outApi.id': item.id,
        showAction: true
      })
    }
  },
  handleCancel() {
    this.setData({
      showAction: false,
      'outApi.deliveryManId': '',
      deliveryManIndex: null
    });
  },
  // 确认出库
  handleClickItem() {
    if (this.data.outApi.deliveryManId != '') {
      var params = JSON.parse(JSON.stringify(this.data.outApi));
      app.api.productOut(params).then(res => {
        if (res.code == 1000) {
          this.clearList();
          this.setData({
            showAction: false,
            'outApi.deliveryManId': '',
            deliveryManIndex: null
          });
          wx.showToast({
            title: '出库成功',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '请选择配送员',
        icon: 'none'
      })
    }
  },
  /// 选择配送人
  selectedDeliver(e) {
    var idx = e.currentTarget.dataset.idx;
    var item = e.currentTarget.dataset.item;
    this.setData({
      deliveryManIndex: idx,
      'outApi.deliveryManId': item.id
    });
  },
  // 确认订单
  confirmOut(data) {
    app.api.confirmOut({
      id: data.id
    }).then(res => {
      if (res.code === 1000) {
        this.clearList();
        wx.showToast({
          title: '确认成功',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },
  getList() {
    let that = this;
    if (!that.data.loading) return;
    that.setData({
      'pageApi.pageIndex': that.data.pageApi.pageIndex + 1
    })
    app.api.wareHouseOutPage(this.data.pageApi).then(res => {
      if (res.code === 1000) {
        res.data.data.forEach(el => {
          el.ctime = app.utils.dateformat(el.updateTime, );
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
  //  查询所有配送人
  findAllDeliveryMan() {
    app.api.findAllDeliveryMan({ manType: 1 }).then(res => {
      if (res.code === 1000) {
        this.setData({
          deliveryMan: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.status) {
      this.setData({
        statusIndex: Number(options.status),
        'pageApi.status': Number(options.status),
      })
    }
    this.getList();
    this.findAllDeliveryMan();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loading) this.getList();
  }
})