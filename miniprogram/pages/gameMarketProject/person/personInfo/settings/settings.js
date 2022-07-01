// pages/gameMarketProject/person/personInfo/settings/settings.js
const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkedComment: true,
    checkedWarehouse: true,
    checkedLike: true
  },
  /***** */
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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
