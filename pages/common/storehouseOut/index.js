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
      value: 5
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
    }
  },
  switchTab(e) {
    var value = e.currentTarget.dataset.item.value
    if (value != this.data.statusIndex) {
      this.setData({
        statusIndex: value,
        'pageApi.status': value,
      })
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

    } else if (types === 'order') {
      wx.showModal({
        title: '确认订单',
        content: '确认订单？',
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