// pages/gameMarketProject/person/modules/order/order.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Show_list:'',
    Photo:"https://img.3dmgame.com/uploads/images/thumbkwdfirst/20190610/1560146839_941491.jpg",
  },

  async LoadInfo(){
    let count = await db.collection("Orders").where({User_ID:app.globalData.User[0].ID}).count()
    count = count.total
    let all = []
    for(let i = 0; i < count; i += 20){
      let list = await db.collection("Orders").where({User_ID:app.globalData.User[0].ID}).skip(i).get()
      all = all.concat(list.data)
    }
    this.setData({
      Show_list:all
    })
    console.log(this.data.Show_list) },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.LoadInfo()
    console.log(this.data.Show_list)
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