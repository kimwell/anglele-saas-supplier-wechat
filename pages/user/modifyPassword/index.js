const app = getApp();
var util = require('../../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataApi: {
      newPassword: '',
      newPasswordAgain: ''
    }
  },
  newPsd(e) {
    let val = e.detail.detail.value;
    this.setData({
      'dataApi.newPassword': val
    })
  },
  newagaPsd(e) {
    let val = e.detail.detail.value;
    this.setData({
      'dataApi.newPasswordAgain': val
    })
  },
  modifyOk() {
    if (this.data.dataApi.newPassword != '' && this.data.dataApi.newPasswordAgain != '') {
      if (this.data.dataApi.newPassword === this.data.dataApi.newPasswordAgain) {
        let params = JSON.parse(JSON.stringify(this.data.dataApi));
        params.newPassword = util.hexMD5(params.newPassword)
        params.newPasswordAgain = util.hexMD5(params.newPasswordAgain)
        app.api.changePass(params).then(res => {
          if (res.code === 1000) {
            wx.showModal({
              title: '修改密码',
              content: '密码修改成功，请重新登录',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.removeStorageSync('authorization');
                  wx.removeStorageSync('user');
                  wx.reLaunch({
                    url: '/pages/login/index',
                  })
                }
              }
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
          title: '两次密码输入不一致',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})