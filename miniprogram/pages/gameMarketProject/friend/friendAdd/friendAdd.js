// pages/gameMarketProject/friend/friendAdd/friendAdd.js
const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Add_text: '',
    Search_List: ''
  },

  bindAddContent: function (e) {
    console.log(e.detail)
    this.setData({
      Add_text: e.detail
    })
  },

  Search: async function () {
    let list = []
    var res = await db
      .collection('Users')
      .where({
        Nickname: this.data.Add_text
      })
      .get()
    for (let i = 0; i < res.data.length; i++) {
      list = list.concat(res.data[i])
    }
    this.setData({
      Search_List: list
    })
    console.log(this.data.Search_List)
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
