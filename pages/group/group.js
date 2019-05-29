// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: wx.getStorageSync('openid'),
    focus: false,
    inputValue: '',
    groupList: [],
    isPopping: false, //是否已经弹出
    animPlus: {}, //旋转动画
    animCollect: {}, //item位移,透明度
    animTranspond: {}, //item位移,透明度
    animInput: {}, //item位移,透明度
    ctColor: "#ffae49",
    pbgColor: "#fff",
    newGroup: {
      name: String,
      intro: String,
    },
    marqueePace: 1,//滚动速度
    marqueeDistance: [0],//初始滚动距离
    marqueeDistance2: [0],
    marquee2copy_status: false,
    marquee2_margin: [60],
    size: 14,
    orientation: 'left',//滚动方向
    interval: 20 // 时间间隔
  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  plus: function() {
    if (this.data.isPopping) {
      //缩回动画
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },

  //弹窗
  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },

  util: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function() {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  pDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.utill(currentStatu)
  },
  utill: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var that=this
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        that.setData({
          showModalStat: false
        });
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      that.setData({
        showModalStat: true
      });
    }
  },
  //加入小组
  //选择了是
  selectC: function() {
    var that = this;
    that.setData({
      ctColor: "#fff",
      cbgColor: "#ffae49",
      ptColor: "#ffae49",
      pbgColor: "#fff",
      distime: false,
      textColor: "#000",
      tborder: "2rpx dashed #ffae49",
      ibColor: "#e9833e",
      'newGroup.isPrivate': true,
    })
    console.log(that.data.newGroup.isPrivate)
  },
  //选择了否
  selectP: function() {
    var that = this;
    that.setData({
      ptColor: "#fff",
      pbgColor: "#ffae49",
      ctColor: "#ffae49",
      cbgColor: "#fff",
      distime: true,
      textColor: "#979797",
      tborder: "2rpx dashed #979797",
      input: "",
      ibColor: "#979797",
      'newGroup.isPrivate': false,
    })
    console.log(that.data.newGroup.isPrivate)
  },

  //获取小组名称
  getGroupName: function(e) {
    console.log(e.detail.value)
    var that = this
    that.setData({
      'newGroup.name': e.detail.value,
    })
  },

  //获取小组简介
  getGroupintro: function(e) {
    console.log(e.detail.value)
    var that = this
    that.setData({
      'newGroup.intro': e.detail.value,
    })
  },
  //弹出动画
  popp: function() {
    //plus顺时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(180).step();
    animationcollect.translate(-60, -15).rotateZ(360).opacity(1).step();
    animationTranspond.translate(-15, -60).rotateZ(360).opacity(1).step();
    animationInput.translate(-100, 100).rotateZ(180).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },
  //收回动画
  takeback: function() {
    //plus逆时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },


  addGroup: function(e) {
    var that = this
    that.powerDrawer(e)
    var isPrivate = 0
    if (that.data.newGroup.isPrivate = true) {
      isPrivate = 1
    } else {
      isPrivate = 0
    }
    wx.request({
      url: 'http://127.0.0.1:8080/cretegroup',
      method: 'POST',
      data: {
        captainId: wx.getStorageSync('openid'),
        groupName: that.data.newGroup.name,
        privateGroup: isPrivate,
        description: that.data.newGroup.intro,
      },
      success: function(res) {
        console.log(res.data)
        var toastText = "创建成功";
        wx.showToast({
          title: toastText,
          icon: 'success',
          duration: 1000
        });
        that.onShow();
      }
    })
  },

//加入小组
  joinGroup:function(e){
    var that=this
    console.log(e.currentTarget.dataset)
    wx.request({
      url: 'http://127.0.0.1:8080/joinGroup',
      method:'GET',
      data:{
        userid:wx.getStorageSync('openid'),
        groupid: e.currentTarget.dataset.groupid,
      },
      success(res){
        console.log(res.data)
        if(res.data.success==1){
          wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 1000
          })
          that.onShow();
        }else{
          wx.showToast({
            title: '您已在该小组',
            image:'../images/close.png',
            duration: 1000
          })
        }
      }
    })
  },
//点击加入小组时随机获取部分小组信息
  getShowGroup:function(e){
    var that = this
    console.log(e.currentTarget)
    that.pDrawer(e)
    wx.request({
      url: 'http://127.0.0.1:8080/displaygrouprandom/displaygrouprandom',
      method:'GET',
      success(res){
        console.log(res.data)
        var list=res.data.groupList
        for(let i=0;i<list.length;i++){
          var k1 = 'groupShowList[' + i + '].groupName';
          var k2 = 'groupShowList[' + i + '].groupId';
          var k3 = 'groupShowList[' + i + '].description';
          var textLength = 'textLength[' + i + ']';
          var marquee2_margin = 'marquee2_margin[' + i + ']';
          var despcription = list[i].description
          if (list[i].description.length>11){
            despcription = list[i].description.substr(0,11)+"..."
          }
          var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
          that.setData({
            [k1]: list[i].groupName,
            [k2]: list[i].groupId,
            [k3]: despcription,
            [textLength]: list[i].description.length,
            windowWidth: windowWidth,
            [marquee2_margin]: list[i].description.length < windowWidth ? windowWidth - list[i].description.length : that.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
          })
          //that.run1();// 水平一行字滚动完了再按照原来的方向滚动
          //that.run2();// 第一个字消失后立即从右边出现
        }
      }
    })
    
  },

  onLoad: function(options) {
    
    // 生命周期函数--监听页面加载
  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    wx.request({
      url: 'http://127.0.0.1:8080/displaygroupbyuserid/displaygroupbyuserid',
      method: "GET",
      data: {
        userid: wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log(res.data)
        var list = res.data.groupList;
        if(res.data.groupList==null){
          
        }
        for (var i = 0; i < res.data.groupList.length; ++i) {
          var k1 = 'groupList[' + i + '].groupName';
          var k2 = 'groupList[' + i + '].groupId';
          var k3 = 'groupList[' + i + '].memberNumber';
          that.setData({
            [k1]: list[i].groupName,
            [k2]: list[i].groupId,
            [k3]: list[i].memberNumber,
          })
        }
      }
    })
    // 生命周期函数--监听页面显示
  },
  onHide: function() {
    var that = this;
    that.setData({
      groupList: null
    })
  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  run1: function () {
    var vm = this;
    var interval = setInterval(function () {
      for (var i = 0; i < vm.data.textLength.length;i++){
        var marqueeDistance = 'marqueeDistance[' + i + ']'
        if (-vm.data.marqueeDistance < vm.data.textLength[i]) { 
          vm.setData({
            [marqueeDistance]: vm.data.marqueeDistance[i] - vm.data.marqueePace[i],
          });
        } else {
          clearInterval(interval);
          vm.setData({
            [marqueeDistance]: vm.data.windowWidth
          });
          vm.run1();
        }
      }
    }, vm.data.interval);
  },
  run2: function () {
    var vm = this;
    var interval = setInterval(function () {
      for (let i = 0; i < vm.data.textLength.length;i++){
        var marqueeDistance = 'marqueeDistance2[' + i + ']'
        var marquee2copy_status = 'marquee2copy_status[' + i + ']'
        if (-vm.data.marqueeDistance2[i] < vm.data.textLength[i]) {
          // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
          vm.setData({
          [marqueeDistance]: vm.data.marqueeDistance2[i] - vm.data.marqueePace[i],
          [marquee2copy_status]: vm.data.textLength[i] + vm.data.marqueeDistance2[i] <= vm.data.windowWidth + vm.data.marquee2_margin[i],
          });
        } else {
          if (-vm.data.marqueeDistance2[i] >= vm.data.marquee2_margin[i]) { // 当第二条文字滚动到最左边时
            vm.setData({
              [marqueeDistance]: vm.data.marquee2_margin[i] // 直接重新滚动
            });
            clearInterval(interval);
            vm.run2();
          } else {
            clearInterval(interval);
            vm.setData({
              [marqueeDistance]: -vm.data.windowWidth
            });
            vm.run2();
          }
        }
      }
    }, vm.data.interval);
  }
})