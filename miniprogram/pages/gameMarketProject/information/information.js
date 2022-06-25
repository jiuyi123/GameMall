// pages/gameMarketProject/information/information.js
const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ChatList:'',
    winHeight: "", //聊天列表窗口高度
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
      "numCommentInfo": 99
    }, {
      "userName": "wzl",
      "userPhoto": "https://s1.ax1x.com/2022/05/18/OTqKqf.jpg",
      "infoContent": "奶奶滴",
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
    numCommentInfo: 11, //评论数量
    numSystemInfo: 8, //系统通知数量
  },
  // 跳转聊天界面
  goChatPage: function (e) {
    console.log("goChatPage")
    console.log(e.currentTarget.dataset.userInfo)
    var userInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.userInfo)) 
    //跳转到聊天界面并传参
    wx.navigateTo({
      url: '../information/chatPage/chatPage?userInfoStr='+userInfoStr,
    })
  },
  //跳转评论消息页面
  goCommentInfo: function () {
    wx.navigateTo({
      url: '../information/modules/commentInfo/commentInfo',
    })
  },
  //跳转系统消息
  goSystemInfo: function () {
    wx.navigateTo({
      url: '../information/modules/systemInfo/systemInfo',
    })
  },

  check(list,Receiver_ID){
    for(var i = 0;i < list.length;i++){
      if(list.Receiver_ID==Receiver_ID){
        return true
      }
    }
    return false
  },

  async CreateChatList(){
    let count = await db.collection("ChatRecord").where({      
      Sender_ID:app.globalData.User[0].ID}).count()
    count = count.total
    let data = []
    for(let i = 0; i < count; i += 20){
      let list = await db.collection("ChatRecord").where({     
      Sender_ID:app.globalData.User[0].ID}).skip(i).get()
      data = data.concat(list.data)
    }
    let show_list = []
    console.log(data)
    for(var i = 0;i < data.length;i++){
      if(!this.check(show_list,data[i].Receiver_ID)){
        var res = await db.collection("Users")
        show_list
      }
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 高度自适应
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    this.CreateChatList()
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