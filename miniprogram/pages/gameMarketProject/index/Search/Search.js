// pages/gameMarketProject/index/Search/Search.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_text:'',
    Game:''
  },
  Dafen :function() { //王子龙在这写你的打分函数 你要用的参数自己在上面data里加 赋值和调用见下面例子都给你写好了
    //示例
    //console.log(app.globalData.Game)
    //console.log(app.globalData.search_text)
    this.setData({
      search_text:app.globalData.search_text,
      Game:app.globalData.Game
    })
    console.log('输入数据:' + this.data.search_text)
    console.log(this.data.Game) //game json数组
    console.log('Game数据获取：' + this.data.Game[0].Name)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Dafen()
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