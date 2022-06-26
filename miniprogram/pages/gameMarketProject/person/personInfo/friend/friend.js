// pages/gameMarketProject/person/personInfo/friend/friend.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    searchFirst: true,
    Is_game_got: false,
    winHeight: "", //窗口高度
    Friend_List: '',
  },
  /*****跳转聊天页面*******/
  goChatPage: function (e) {
    console.log("goChatPage")
     var userInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.userInfo))
     //跳转到聊天界面并传参
     wx.navigateTo({
       url: '/pages/gameMarketProject/information/chatPage/chatPage?userInfoStr=' + userInfoStr,
     })
   },
/*******删除好友*********/
deleteFriend(e){
  console.log(e.currentTarget.dataset.friendInfo)
},
  /*******搜索框*******/
  showPopup() {
    this.setData({
      show: true,
      searchFirst: false
    });
  },
  cancel(){
    this.setData({
      show: false,
      searchFirst: true
    });
  },
/*******添加好友*********/
addFriend(){
  wx.navigateTo({
    url:  "/pages/gameMarketProject/friend/friendAdd/friendAdd",
  })
},
/*******好友列表***** */
  async loadInfo() {
    let count = await db.collection("Friends").where({
      User1_ID: app.globalData.User[0].ID
    }).count()
    count = count.total
    let data = []
    for (let i = 0; i < count; i += 20) {
      let list = await db.collection("Friends").where({
        User1_ID: app.globalData.User[0].ID
      }).skip(i).get()
      data = data.concat(list.data[i].User2_ID)
    }
    count = await db.collection("Friends").where({
      User2_ID: app.globalData.User[0].ID
    }).count()
    count = count.total
    for (let i = 0; i < count; i += 20) {
      let list = await db.collection("Friends").where({
        User2_ID: app.globalData.User[0].ID
      }).skip(i).get()
      data = data.concat(list.data[i].User1_ID)
    }
    //console.log(data)
    let list = []
    for (var i = 0; i < data.length; i++) {
      if (this.check(data[i], list)) {
        let res = await db.collection("Users").where({
          ID: data[i]
        }).get()
        list.push(res.data[0])
      }
    }
    this.setData({
      Friend_List: list
    })
    console.log(this.data.Friend_List)
  },

  check(data, list) {
    for (var i = 0; i < list.length; i++) {
      if (data == list[i].ID) {
        return false
      }
    }
    return true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.loadInfo()
        // 高度自适应
        var that = this;
        wx.getSystemInfo({
          success: function (res) {
            var clientHeight = res.windowHeight,
              clientWidth = res.windowWidth,
              rpxR = 750 / clientWidth;
            var calc = clientHeight * rpxR - 130;
            that.setData({
              winHeight: calc
            });
          }
        });
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