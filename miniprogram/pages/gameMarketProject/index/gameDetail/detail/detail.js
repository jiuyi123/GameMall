// pages/gameMarketProject/index/gameDetail/detail/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game_id: {

    },
    /******信息页面数据*******/
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    /*************/

  },

  /******************************* */
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  // onLoad: function () {
  //   var that = this;

  // },
  footerTap: app.footerTap,

  /************************************* */


  /********************************************* */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var game_id = JSON.parse(decodeURIComponent(options.gameInfoStr))
    game_id.numComment = 999
    game_id.score = 4.8;
    game_id.comment = [
      {
        "userName":1,
        "cmtData":"2021.04.01 14:08",
        "cmtScore":[0,1,2,3],
        "cmtContent":"这个游戏太好玩了"
      },
      {
        "userName":2,
        "cmtData":"2021.06.01 14:08",
        "cmtScore":[0,2],
        "cmtContent":"还可以吧"
      },
      {
        "userName":3,
        "cmtData":"2021.04.12 14:08",
        "cmtScore":[0,1,2],
        "cmtContent":"画风我爱了"
      },     
      {
        "userName":5,
        "cmtData":"2021.04.13 14:08",
        "cmtScore":[0,1,2,4,5],
        "cmtContent":"强烈推荐"
      },
      {
        "userName":6,
        "cmtData":"2021.04.13 14:08",
        "cmtScore":[0,1,2,4,5],
        "cmtContent":"强烈推荐"
      },
      {
        "userName":7,
        "cmtData":"2021.04.13 14:08",
        "cmtScore":[0,1,2,4,5],
        "cmtContent":"强烈推荐"
      }
    ]
    this.setData({
      game_id,
    })
     console.log(this.data.game_id)
    // 高度自适应
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 380;
        that.setData({
          winHeight: calc
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("-----------onReady-----------")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("-----------onShow-----------")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("-----------onHide-----------")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("-----------onUnload-----------")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("-----------onPullDownRefresh-----------")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("-----------onReachBottom-----------")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("-----------onShareAppMessage-----------")
  }
})