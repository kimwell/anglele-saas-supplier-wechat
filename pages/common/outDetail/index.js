const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {}
  },
  getDetail(id){
    app.api.wareHouseOutDetail({id: id}).then(res =>{
      if (res.code === 1000) {
        res.data.ctime = app.utils.dateformat(res.data.updateTime, );
        this.setData({
          details: Object.assign({},res.data)
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.getDetail(id);
  }
})