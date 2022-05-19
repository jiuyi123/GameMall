// pages/gameMarketProject/information/modules/systemInfo/systemInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "", //聊天列表窗口高度

    //这里本应该是其他用户的消息
    gameInfoObj: [{
      "userName": "jy",
      "userPhoto": "https://s1.ax1x.com/2022/05/08/O1XIk4.jpg",
      "infoContent": "今天有时间呀",
      "infoTime": "13:15",
      "numCommentInfo": 12
    }, {
      "userName": "ctz",
      "userPhoto": "https://s1.ax1x.com/2022/05/18/OTqQZ8.jpg ",
      "infoContent": "今天有时间呀",
      "infoTime": "13:15",
      "numCommentInfo": 5
    }, {
      "userName": "wzl",
      "userPhoto": "https://s1.ax1x.com/2022/05/18/OTqKqf.jpg",
      "infoContent": "今天有时间呀",
      "infoTime": "13:15",
      "numCommentInfo": 1
    }, {
      "userName": "ycr",
      "userPhoto": "https://s1.ax1x.com/2022/05/18/OTqnMt.jpg",
      "infoContent": "今天有时间呀",
      "infoTime": "13:15",
      "numCommentInfo": 999
    }, {
      "userName": "hyl",
      "userPhoto": "https://s1.ax1x.com/2022/05/18/OTqusP.jpg",
      "infoContent": "今天有时间呀",
      "infoTime": "13:15",
      "numCommentInfo": 0
    }, {
      "userName": "小久",
      "userPhoto": "https://s1.ax1x.com/2022/05/08/O1XIk4.jpg",
      "infoContent": "今天有时间呀",
      "infoTime": "13:15",
      "numCommentInfo": 0
    }, {
      "userName": "小楠",
      "userPhoto": "https://s1.ax1x.com/2022/05/08/O1XIk4.jpg",
      "infoContent": "今天有时间呀",
      "infoTime": "13:15",
      "numCommentInfo": 0
    }, {
      "userName": "康康",
      "userPhoto": "https://s1.ax1x.com/2022/05/08/O1XIk4.jpg",
      "infoContent": "今天有时间呀",
      "infoTime": "13:15",
      "numCommentInfo": 0
    }, {
      "userName": "小云",
      "userPhoto": "https://s1.ax1x.com/2022/05/08/O1XIk4.jpg",
      "infoContent": "今天有时间呀",
      "infoTime": "13:15",
      "numCommentInfo": 0
    }],
  },
  
  // 跳转聊天界面
  goChatPage: function (e) {
    console.log("goChatPage")
    console.log(e.currentTarget.dataset.userInfo)
    var userInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.userInfo)) 
    //跳转到聊天界面并传参
    wx.navigateTo({
      url: '../../chatPage/chatPage?userInfoStr='+userInfoStr,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
        // 高度自适应
        var that = this;
        wx.getSystemInfo({
          success: function (res) {
            var clientHeight = res.windowHeight,
              clientWidth = res.windowWidth,
              rpxR = 750 / clientWidth;
            var calc = clientHeight * rpxR - 0;
            console.log(calc)
            that.setData({
              winHeight: calc
            });
          }
        });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})