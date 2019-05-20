// pages/ranking_list/ranking_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页面配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    color_1_1: "#ffffff",
    color_1_2: "#f66a0c",
    color_1_3: "#f66a0c",
    color_2_1: "#f66a0c",
    color_2_2: "#f66a0c",
    color_2_3: "#ffffff",
    status: 1,
    clockList: [],
    memberList: [],
    nameList: [],
    groupList: [],
    groupId: null,
    list_1: [],
    showList: [],//展示列表
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    hasMore: true,
    page: 1,
    size: 20,
    movies: ["dasdas", "ascsacsc"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  click_on_1: function () {
    var that = this;
    that.setData({
      color_1_1: "#ffffff",
      color_1_2: "#f66a0c",
      color_1_3: "#f66a0c",
      color_2_1: "#f66a0c",
      color_2_2: "#f66a0c",
      color_2_3: "#ffffff",

      status: 1,
    })

  },
  click_on_2: function () {
    var that = this;
    that.setData({
      color_2_1: "#ffffff",
      color_2_2: "#f66a0c",
      color_2_3: "#f66a0c",
      color_1_1: "#f66a0c",
      color_1_2: "#f66a0c",
      color_1_3: "#ffffff",

      status: 2,
    })

  },
})