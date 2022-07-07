// pages/gameMarketProject/person/personInfo/account/account.js
const app = getApp()
var db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    newEmail: '',
    newNickname: '',
    newCountry: '',
    checkedComment: true,
    checkedWarehouse: true,
    checkedLike: true
  },
  onChangeComment({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checkedComment: detail })
    db.collection('Users')
      .doc(app.globalData.User[0]._id)
      .update({
        data: {
          Commentpublic: detail
        }
      })
    app.globalData.User[0].Commentpublic = detail
  },
  onChangeWarehouse({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checkedWarehouse: detail })
    db.collection('Users')
      .doc(app.globalData.User[0]._id)
      .update({
        data: {
          Kupublic: detail
        }
      })
    app.globalData.User[0].Kupublic = detail
  },
  onChangeLike({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checkedLike: detail })
    db.collection('Users')
      .doc(app.globalData.User[0]._id)
      .update({
        data: {
          Likepublic: detail
        }
      })
    app.globalData.User[0].Likepublic = detail
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
    db.collection('Users')
      .doc(this.data.user._id)
      .update({
        data: {
          Nickname: this.data.newNickname
        }
      })
    app.globalData.User[0].Nickname = this.data.newNickname
    wx.showToast({
      title: '昵称修改成功',
      icon: 'success',
      duration: 900 //持续的时间
    })
  },

  setEmail() {
    console.log(this.data.newEmail)
    db.collection('Users')
      .doc(this.data.user._id)
      .update({
        data: {
          Email: this.data.newEmail
        }
      })
    app.globalData.User[0].Email = this.data.newEmail
    wx.showToast({
      title: '邮箱修改成功',
      icon: 'success',
      duration: 900 //持续的时间
    })
  },

  setCountry() {
    console.log(this.data.newCountry)
    db.collection('Users')
      .doc(this.data.user._id)
      .update({
        data: {
          Country: this.data.newCountry
        }
      })
    app.globalData.User[0].Country = this.data.newCountry
    wx.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 900 //持续的时间
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      //加载用户信息
      user: app.globalData.User[0]
    })
    //console.log(this.data.user)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      checkedComment: app.globalData.User[0].Commentpublic,
      checkedWarehouse: app.globalData.User[0].Kupublic,
      checkedLike: app.globalData.User[0].Likepublic
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
