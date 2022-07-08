// pages/gameMarketProject/information/modules/commentInfo/commentInfo.js
var app = getApp()
var db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    winHeight: '', //聊天列表窗口高度
    WeiduList: '',
    YiduList: '',
  },

  // 跳转聊天界面
  goChatPage: function (e) {
    // console.log('goChatPage')
    // console.log(e.currentTarget.dataset.userInfo)
    var userInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.userInfo))
    //跳转到聊天界面并传参
    wx.navigateTo({
      url: '../../chatPage/chatPage?userInfoStr=' + userInfoStr
    })
  },

  LoadPageData() {
    // 高度自适应
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth
        var calc = clientHeight * rpxR - 0
        //console.log(calc)
        that.setData({
          winHeight: calc
        })
      }
    })
  },

  async LoadWeidu() {
    let res = await db
      .collection('SystemNotification')
      .where({
        State:'未读'
      })
      .get()
    if(res.data.length>0){
      for(var i=0;i<res.data.length;i++){
        db.collection('SystemNotification').doc(res.data[i]._id).update({
          data:{
            State:'已读'
          }
        })
      }
      for (var i = 0; i < res.data.length - 1; i++) {
        //确定轮数
        for (var j = 0; j < res.data.length - i - 1; j++) {
          //确定每次比较的次数
          if (res.data[j].Time < res.data[j + 1].Time) {
            var tem = res.data[j]
            res.data[j] = res.data[j + 1]
            res.data[j + 1] = tem
          }
        }
      }
    }
    this.setData({
      WeiduList: res.data
    })
  },

  async LoadYidu() {
    let res = await db
    .collection('SystemNotification')
    .where({
      State:'已读'
    })
    .get()
  if(res.data.length>0){
    for (var i = 0; i < res.data.length - 1; i++) {
      //确定轮数
      for (var j = 0; j < res.data.length - i - 1; j++) {
        //确定每次比较的次数
        if (res.data[j].Time < res.data[j + 1].Time) {
          var tem = res.data[j]
          res.data[j] = res.data[j + 1]
          res.data[j + 1] = tem
        }
      }
    }
  }
  this.setData({
    YiduList: res.data
  })
  },

  async LoadInfo() {
    wx.showLoading({
      title: '加载中',
      mask: true //开启蒙版遮罩
    })
    await this.LoadYidu()
    await this.LoadWeidu()
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.LoadPageData()
    this.LoadInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onWeidu() {},

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