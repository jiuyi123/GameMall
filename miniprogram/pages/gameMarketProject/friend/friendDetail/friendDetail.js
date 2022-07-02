// pages/gameMarketProject/friend/friendDetail/friendDetail.js
var db = wx.cloud.database()
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFriend: false,
    //游戏
    gameInfoHad: [{
        "Name": "小缇娜的奇幻之地",
        "Pic_link": "https://img.3dmgame.com/uploads/images/thumbkwdfirst/20210611/1623377152_289505.jpg"
      },
      {
        "Name": "我的世界",
        "Pic_link": "https://img.3dmgame.com/uploads/images/thumbkwdfirst/20210611/1623377152_289505.jpg"
      }
    ],
    gameInfoLike: [{
      "Name": "小缇娜的奇幻之地",
      "Pic_link": "https://img.3dmgame.com/uploads/images/thumbkwdfirst/20210611/1623377152_289505.jpg"
    }],
    userID: '',
    userInfo: [],
  },
  /***跳转聊天页面** */
  goChatPage: function () {
    console.log('goChatPage')
    var userInfoStr = encodeURIComponent(JSON.stringify(this.data.userInfo))
    //跳转到聊天界面并传参
    wx.navigateTo({
      url: '/pages/gameMarketProject/information/chatPage/chatPage?userInfoStr=' + userInfoStr
    })
  },
  /*****添加好友****** */
  addFriend(){

  },
  /*******删除好友*********/
  async delete() {


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var userFriend = JSON.parse(decodeURIComponent(options.userInfoStr))
    console.log(userFriend)
    this.setData({
      userInfo: userFriend
    })
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