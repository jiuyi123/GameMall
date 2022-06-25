// pages/gameMarketProject/person/person.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      UserInfo:[]
    }
  },
  //购物车
  goShopCart(e) {
    console.log("goShopCart")
    // console.log(e)
    // var gameInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.gameInfo)) 
    //把点击的游戏对象参数传递给游戏详情页面
    wx.navigateTo({
      url: "/pages/gameMarketProject/person/modules/shopCart/shopCart",
    })
  },
  //收藏
  goFavorite(e) {
    console.log("goFavorite")
    wx.navigateTo({
      url: "/pages/gameMarketProject/person/modules/favorite/favorite",
    })
  },
  //订单
  goOrder(e) {
    console.log("goOrder")
    wx.navigateTo({
      url: "/pages/gameMarketProject/person/modules/order/order",
    })
  },
  //仓库
  goWarehouse(e) {
    console.log("goWarehouse")
    wx.navigateTo({
      url: "/pages/gameMarketProject/person/modules/warehouse/warehouse",
    })
  },
  //账户
  goAccount() {
    console.log("goAccount")
    wx.navigateTo({
      url: "/pages/gameMarketProject/person/personInfo/account/account",
    })
  },
  //登出
  Logout() {
    wx.showModal({
      title: '提示',
      content: '确定退出登录嘛',
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          wx.reLaunch({
            url: "../login/login",
          })
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      UserInfo:app.globalData.User[0]
    })
    //console.log(this.data.UserInfo)
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