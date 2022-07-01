// pages/gameMarketProject/person/personInfo/settings/settings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedComment:true,
    checkedWarehouse:true,
    checkedLike:true
  },
/***** */
onChangeComment({ detail }) {
  // 需要手动对 checked 状态进行更新
  this.setData({ checkedComment: detail });
},
onChangeWarehouse({ detail }) {
  // 需要手动对 checked 状态进行更新
  this.setData({ checkedWarehouse: detail });
},
onChangeLiket({ detail }) {
  // 需要手动对 checked 状态进行更新
  this.setData({ checkedLike: detail });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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