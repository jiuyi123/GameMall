// pages/gameMarketProject/person/personInfo/account/account.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    newEmail: "",
    newNickname: "",
    newCountry:""
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
  CountryChage(e) {
    this.setData({
      newCountry: e.detail.value
    })
  },
  setNickname() {
    console.log(this.data.newNickname)
  },
  setEmail() {
    console.log(this.data.newEmail)
  },
  setCountry() {
    console.log(this.data.newCountry)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      //加载用户信息
      user: app.globalData.User[0]
    });
    console.log(this.data.user)
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