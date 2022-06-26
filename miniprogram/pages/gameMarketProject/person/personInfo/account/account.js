// pages/gameMarketProject/person/personInfo/account/account.js
const app = getApp();
var db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    newEmail: "",
    newNickname: "",
    newCountry: ""
  },

  CountryChage(e) {
    this.setData({
      newCountry: e.detail.value
    })
  },

  EmailChage(e) {
    this.setData({
      newEmail: e.detail.value
    })
  },

  NicknameChage(e) {
    this.setData({
      newNickname: e.detail.value
    })
  },

  async setNickname() {
    console.log(this.data.newNickname)
    db.collection("Users").doc(this.data.user._id).update({
      data: {
        Nickname: this.data.newNickname
      }
    })
    wx.showToast({
      title: '昵称修改成功',
      icon: 'success',
      duration: 900, //持续的时间
    })
  },

  setEmail() {
    console.log(this.data.newEmail)
    db.collection("Users").doc(this.data.user._id).update({
      data: {
        Email: this.data.newEmail
      }
    })
    wx.showToast({
      title: '邮箱修改成功',
      icon: 'success',
      duration: 900, //持续的时间
    })
  },

  setCountry() {
    console.log(this.data.newCountry)
    db.collection("Users").doc(this.data.user._id).update({
      data: {
        Country: this.data.newCountry
      }
    })
    wx.showToast({
      title: '地区信息修改成功',
      icon: 'success',
      duration: 900, //持续的时间
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      //加载用户信息
      user: app.globalData.User[0]
    });
    //console.log(this.data.user)
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