// pages/gameMarketProject/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //预设当前项的值
    gameInfoObj:{},
  },

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
//跳转评论消息页面
  goCommentInfo:function () {
    wx.navigateTo({
      url: '../information/modules/commentInfo/commentInfo',
    })
  },
//跳转系统消息
  goSystemInfo:function () {
    wx.navigateTo({
      url: '../information/modules/systemInfo/systemInfo',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gameInfoObj = JSON.parse(decodeURIComponent(options.gameInfoStr))
    gameInfoObj.numComment = 999
    gameInfoObj.score = 4.8;
    gameInfoObj.comment = [
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
      gameInfoObj,
    })
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

  }
})