// pages/my_forest/my_forest.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMainChartDisplay: true,
    color_1_1: "#ffffff",
    color_1_2: "#f66a0c",
    color_1_3: "#f66a0c",
    color_2_1: "#f66a0c",
    color_2_2: "#f66a0c",
    color_2_3: "#ffffff",
    color_3_1: "#f66a0c",
    color_3_2: "#f66a0c",
    color_3_3: "#ffffff",
    status: Number,
    dateStr: {},
    tree: [],
    chartData: {
      main: {
        data: [0, 20, 30, 40, 300, 30, 10, 20, 30, 40, 100, 30, 0, 20, 30, 40, 300, 30, 10, 20, 30, 40, 100, 30],
        categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      }
    },
    max: 120,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var that = this
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? ("0" + (nowDate.getMonth() + 1)) : nowDate.getMonth() + 1;
    var day = nowDate.getDate() < 10 ? ("0" + nowDate.getDate()) : nowDate.getDate();
    var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minutes = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var seconds = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    var dateStr = year + "-" + month + "-" + day;
    var userid = wx.getStorageSync('openid')
    console.log(dateStr);
    that.setData({
      'dateStr.year': year,
      'dateStr.month': month,
      'dateStr.day': day,
    })
    wx.request({
      url: 'http://localhost:8080/userinformation/userinformation',
      data: {
        userid: wx.getStorageSync('openid')
      },
      method: 'GET',
      success: function(res) {
        console.log(res.data)
        that.setData({
          tree: res.data.treeNumber,
        })
      }
    })
    console.log(userid)
    wx.request({
      url: 'http://localhost:8080/displayuserstastic/displayuserstasticday',
      method: 'GET',
      data: {
        userId: userid,
        date: dateStr,
      },
      success: function(res) {
        that.setData({
          'chartData.main.data': res.data.minutesList
        })
        console.log(res.data)
        console.log(that.data.chartData.main.data)
        try {
          var width = wx.getSystemInfoSync().windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }
        columnChart = new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          animation: true,
          categories: that.data.chartData.main.categories,
          legend: false,
          series: [{
            name: "打卡时长",
            color: '#fa9857',
            data: that.data.chartData.main.data,
            format: function(val, name) {
              return val.toFixed(0);
            },

          }],
          yAxis: {
            format: function(val) {
              return val + '分钟';
            },
            min: 0,
            disabled: true,
            max: that.data.max
          },
          xAxis: {
            disableGrid: false,
            type: 'calibration'
          },
          extra: {
            column: {
              width: 15,
            },
            legendTextColor: '#000000'
          },
          width: width,
          height: 150,
        });
      },
    })

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  clickDay: function() {
    var that = this;
    that.setData({
      color_1_1: "#ffffff",
      color_1_2: "#f66a0c",
      color_1_3: "#f66a0c",
      color_2_1: "#f66a0c",
      color_2_2: "#f66a0c",
      color_2_3: "#ffffff",
      color_3_1: "#f66a0c",
      color_3_2: "#f66a0c",
      color_3_3: "#ffffff",

      status: 1,
    })

  },
  clickWeek: function() {
    var that = this;
    that.setData({
      color_2_1: "#ffffff",
      color_2_2: "#f66a0c",
      color_2_3: "#f66a0c",
      color_1_1: "#f66a0c",
      color_1_2: "#f66a0c",
      color_1_3: "#ffffff",
      color_3_1: "#f66a0c",
      color_3_2: "#f66a0c",
      color_3_3: "#ffffff",
      status: 2,
    })
    var dateStr = that.data.dateStr.year + "-" + that.data.dateStr.month + "-" + that.data.dateStr.day;
    var userid = wx.getStorageSync('openid')
    wx.request({
      url: 'http://localhost:8080/displayuserstastic/displayuserstasticweek',
      method: 'GET',
      data: {
        userId: userid,
        date: dateStr,
      },
      success: function(res) {
        var weekCate = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat']
        that.setData({
          'chartData.main.data': res.data.minutesList,
          'chartData.main.categories': weekCate,
        })
        console.log(res.data)
        console.log(that.data.chartData.main.data)
        try {
          var width = wx.getSystemInfoSync().windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }
        columnChart = new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          animation: true,
          categories: that.data.chartData.main.categories,
          legend: false,
          series: [{
            name: "打卡时长",
            color: '#fa9857',
            data: that.data.chartData.main.data,
            format: function(val, name) {
              return val.toFixed(0);
            },

          }],
          yAxis: {
            format: function(val) {
              return val + '分钟';
            },
            min: 0,
            disabled: true,
            max: that.data.max
          },
          xAxis: {
            disableGrid: false,
            type: 'calibration'
          },
          extra: {
            column: {
              width: 15,
            },
            legendTextColor: '#000000'
          },
          width: width,
          height: 150,
        });
      },
    })
  },

  clickMonth: function() {
    var that = this;
    that.setData({
      color_3_1: "#ffffff",
      color_3_2: "#f66a0c",
      color_3_3: "#f66a0c",
      color_1_1: "#f66a0c",
      color_1_2: "#f66a0c",
      color_1_3: "#ffffff",
      color_2_1: "#f66a0c",
      color_2_2: "#f66a0c",
      color_2_3: "#ffffff",
      status: 3,
    })
  },

  //日历切换至下一天/周/月
  toNextDay: function() {
    var that = this
    //如果是大月
    var month = parseInt(that.data.dateStr.month)
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month ==12) {
      if (that.data.dateStr.day >= 31) {
        //如果是12月31号
        if (that.data.dateStr.month >= 12) {
          var newYear = that.data.dateStr.year + 1
          var newMonth = 1;
          var newDay = 1;
          that.setData({
            'dateStr.year': newYear,
            'dateStr.month': newMonth,
            'dateStr.day': newDay,
          })
          console.log(that.data.dateStr);
        } //如果不是12月，但是是31号 
        else {
          var newMonth = parseInt(that.data.dateStr.month) + 1;
          var newDay = 1;
          that.setData({
            'dateStr.month': newMonth,
            'dateStr.day': newDay,
          })
        }
        console.log(that.data.dateStr);

      }
      //不大于31正常处理
      else {
        var newDay = parseInt(that.data.dateStr.day) + 1;
        that.setData({
          'dateStr.day': newDay,
        })
        console.log(that.data.dateStr);
      }
    } //如果是除2月意外的小月 
    else if(month!=2){
      //如果是30号
      if (that.data.dateStr.day >= 30) {
        var newMonth = parseInt(that.data.dateStr.month) + 1;
        var newDay = 1;
        that.setData({
          'dateStr.month': newMonth,
          'dateStr.day': newDay,
        })
        console.log(that.data.dateStr);
      } //如果不是30号正常处理
      else {
        var newDay = parseInt(that.data.dateStr.day) + 1;
        that.setData({
          'dateStr.day': newDay,
        })
        console.log(that.data.dateStr);
      }
    }//如果是2月
    else{
      //如果是闰年
      var year=that.data.dateStr.year;
      var cond1 = year % 4 == 0;  //条件1：年份必须要能被4整除
      var cond2 = year % 100 != 0;  //条件2：年份不能是整百数
      var cond3 = year % 400 == 0;  //条件3：年份是400的倍数
      //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
      //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
      //所以得出判断闰年的表达式：
      var cond = cond1 && cond2 || cond3;
      if(cond){
        //如果是29号
        if (that.data.dateStr.day >= 29) {
          var newMonth = parseInt(that.data.dateStr.month) + 1;
          var newDay = 1;
          that.setData({
            'dateStr.month': newMonth,
            'dateStr.day': newDay,
          })
          console.log(that.data.dateStr);
        }
        //不是29号
        else {
          var newDay = parseInt(that.data.dateStr.day)  + 1;
          that.setData({
            'dateStr.day': newDay,
          })
          console.log(that.data.dateStr);
        }
      }else{
      //如果不是闰年正常处理
      //如果是28号
        if (that.data.dateStr.day >= 28) {
          var newMonth = parseInt(that.data.dateStr.month) + 1;
          var newDay = 1;
          that.setData({
            'dateStr.month': newMonth,
            'dateStr.day': newDay,
          })
          console.log(that.data.dateStr);
        } //如果不是28号正常处理
        else {
          var newDay = parseInt(that.data.dateStr.day) + 1;
          that.setData({
            'dateStr.day': newDay,
          })
          console.log(that.data.dateStr);
        }
      }
    }
    //判断是否需要给日和月加“0”
    if (that.data.dateStr.month < 10 && typeof (that.data.dateStr.month) == 'number') {
      var month = "0" + that.data.dateStr.month
      that.setData({
        'dateStr.month': month
      })
    }
    if (that.data.dateStr.day < 10 && typeof (that.data.dateStr.day) == 'number') {
      var day = "0" + that.data.dateStr.day
      that.setData({
        'dateStr.day': day
      })
    }
  },

  //日历切换至上一天/周/月
  toLastDay: function() {
    var that = this
    //如果是大月
    var lastMonth = parseInt(that.data.dateStr.month)-1
    if (lastMonth == 1 || lastMonth == 3 || lastMonth == 5 || lastMonth == 7 || lastMonth == 8 || lastMonth == 10 || lastMonth == 12) {
      if (that.data.dateStr.day <= 1) {
        //如果是1月1号
        if (that.data.dateStr.month <= 1) {
          var newYear = that.data.dateStr.year - 1
          var newMonth = 12;
          var newDay = 31;
          that.setData({
            'dateStr.year': newYear,
            'dateStr.month': newMonth,
            'dateStr.day': newDay,
          })
          console.log(that.data.dateStr);
        } //如果不是1月，但是是1号 
        else {
          var newMonth = parseInt(that.data.dateStr.month) - 1;
          var newDay = 31;
          that.setData({
            'dateStr.month': newMonth,
            'dateStr.day': newDay,
          })
        }
        console.log(that.data.dateStr);

      }
      //不小于等于1正常处理
      else {
        var newDay = parseInt(that.data.dateStr.day) - 1;
        that.setData({
          'dateStr.day': newDay,
        })
        console.log(that.data.dateStr);
      }
    } //如果上个月是除2月以外的小月 
    else if (lastMonth != 2) {
      //如果是1号
      if (that.data.dateStr.day <= 1) {
        var newMonth = parseInt(that.data.dateStr.month) - 1;
        var newDay = 30;
        that.setData({
          'dateStr.month': newMonth,
          'dateStr.day': newDay,
        })
        console.log(that.data.dateStr);
      } //如果不是1号正常处理
      else {
        var newDay = that.data.dateStr.day - 1;
        that.setData({
          'dateStr.day': newDay,
        })
        console.log(that.data.dateStr);
      }
    }//如果上个月是2月
    else {
      //如果是闰年
      var year = that.data.dateStr.year;
      var cond1 = year % 4 == 0;  //条件1：年份必须要能被4整除
      var cond2 = year % 100 != 0;  //条件2：年份不能是整百数
      var cond3 = year % 400 == 0;  //条件3：年份是400的倍数
      //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
      //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
      //所以得出判断闰年的表达式：
      var cond = cond1 && cond2 || cond3;
      if (cond) {
        //如果是1号
        if (that.data.dateStr.day <= 1) {
          var newMonth = parseInt(that.data.dateStr.month) - 1;
          var newDay = 29;
          that.setData({
            'dateStr.month': newMonth,
            'dateStr.day': newDay,
          })
          console.log(that.data.dateStr);
        }
        //不是1号
        else {
          var newDay = parseInt(that.data.dateStr.day) - 1;
          that.setData({
            'dateStr.day': newDay,
          })
          console.log(that.data.dateStr);
        }
      } else {
        //如果不是闰年正常处理
        //如果是1号
        if (that.data.dateStr.day <= 1) {
          var newMonth = parseInt(that.data.dateStr.month) - 1;
          var newDay = 28;
          that.setData({
            'dateStr.month': newMonth,
            'dateStr.day': newDay,
          })
          console.log(that.data.dateStr);
        } //如果不是28号正常处理
        else {
          var newDay = parseInt(that.data.dateStr.day) - 1;
          that.setData({
            'dateStr.day': newDay,
          })
          console.log(that.data.dateStr);
        }
      }
      
    }
    //判断是否需要给日和月加“0”
    if (that.data.dateStr.month < 10 && typeof (that.data.dateStr.month) == 'number') {
      var month = "0" + that.data.dateStr.month
      that.setData({
        'dateStr.month': month
      })
    }
    if (that.data.dateStr.day < 10 && typeof (that.data.dateStr.day) == 'number') {
      var day = "0" + that.data.dateStr.day
      that.setData({
        'dateStr.day': day
      })
    }
  }

})