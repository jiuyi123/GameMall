// pages/gameMarketProject/person/personInfo/feedback/feedback.js
const app = getApp();
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    UserInfo: "",
    Balance: "",
    show: false,
    inputNumber: 0,
  },
  /**** */
  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  bindInputChange(e) {
    this.setData({
      inputNumber: e.detail.value
    })
  },

  /******/
  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.setData({
      UserInfo: app.globalData.User[0],
      Balance: app.globalData.User[0].Balance
    })
    console.log("Wallet")
    console.log(this.data.UserInfo)
  },

  async Charge(e) {
    var Amount = this.data.inputNumber
    console.log(Amount)
    let res = await db
      .collection('Users')
      .where({
        ID: app.globalData.User[0].ID
      })
      .get()
    db.collection('Users')
      .doc(res.data[0]._id)
      .update({
        data: {
          Balance: Number(app.globalData.User[0].Balance) + Number(Amount)
        }

      })
    this.setData({
      Balance: Number(app.globalData.User[0].Balance) + Number(Amount)
    })
    app.globalData.User[0].Balance = Number(app.globalData.User[0].Balance) + Number(Amount)
    this.onClose();
    wx.showToast({
      title: '充值成功',
      icon: 'success'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},
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