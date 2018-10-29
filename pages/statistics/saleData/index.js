const app = getApp();
var wxCharts = require('../../../utils/wxcharts.js');
var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageApi: {
      startTime: '',
      endTime: '',
      customerName: '',
      productName: '',
      wareHouseId: ''
    },
    list: []
  },
  getData() {
    app.api.productSummary(this.data.pageApi).then(res => {
      if (res.code === 1000) {
        res.data.forEach(el => {
          el.ctime = app.utils.dateformat(el.time, 'yyyy-MM-dd');
        })
        this.setData({
          list: res.data
        })
        this.createLine();
        this.createProfit();
      }
    })
  },
  createSimulationData: function () {
    var categories = [];
    var data = [];
    this.data.list.forEach(el => {
      categories.push(el.ctime);
      data.push(el.saleAmount);
    })
    return {
      categories: categories,
      data: data
    }
  },
  createProfitData(){
    var categories = [];
    var data = [];
    this.data.list.forEach(el => {
      categories.push(el.ctime);
      data.push(el.profitAmount);
    })
    return {
      categories: categories,
      data: data
    }
  },
  createProfit(){
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var profitData = this.createProfitData();
    lineChart = new wxCharts({
      canvasId: 'profitlineCanvas',
      type: 'line',
      categories: profitData.categories,
      animation: true,
      series: [{
        name: '销售利润',
        data: profitData.data
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '成交金额 (万元)',
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
  createLine(){
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'saleslineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      series: [{
        name: '销售额',
        data: simulationData.data,
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '成交金额 (万元)',
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.getData();
  }
})