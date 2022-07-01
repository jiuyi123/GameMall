// pages/gameMarketProject/person/modules/order/order.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "", //窗口高度
    Game_list: '',
    Order_list: '',
    Show_list: '',

    option1: [{
        text: '全部订单',
        value: 0
      },
      {
        text: '已支付订单',
        value: 1
      },
      {
        text: '未支付订单',
        value: 2
      },
    ],
    option2: [{
        text: '默认排序',
        value: 'a'
      },
      {
        text: '价格升序',
        value: 'b'
      },
      {
        text: '价格降序',
        value: 'c'
      },
    ],
    value1: 0,
    value2: 'a',
  },

  /*********下拉框********* */

  /**************************/
  async LoadInfo() {
    let count = await db.collection("Orders").where({
      User_ID: app.globalData.User[0].ID
    }).count()
    count = count.total
    let all = []
    for (let i = 0; i < count; i += 20) {
      let list = await db.collection("Orders").where({
        User_ID: app.globalData.User[0].ID
      }).skip(i).get()
      all = all.concat(list.data)
    }
    var gamelist = new Array
    for (let i = 0; i < all.length; i++) {
      gamelist = gamelist.concat(app.globalData.Game[all[i].Game_ID - 1])
    }


    // console.log(this.data.Game_list) 
    // console.log(this.data.Order_list)

    let show_list = [];
    for (let i = 0; i < all.length; i++) {
      show_list = show_list.concat(all[i])
      show_list[i].gameName = gamelist[i].Name
      show_list[i].gameDeveloper = gamelist[i].Developer
      show_list[i].Pic_link = gamelist[i].Pic_link
    }

    this.setData({
      Order_list: all,
      Game_list: gamelist,
      Show_list: show_list
    })
    // console.log(this.data.Game_list) 
    console.log(this.data.Show_list)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.LoadInfo()
    // 高度自适应
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc
        });
      }
    });
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