// pages/gameMarketProject/person/personInfo/friend/friend.js
const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isSearching: false, //搜索中
    show: false,
    searchFirst: true,
    Is_game_got: false,
    winHeight: '', //窗口高度
    Show_List: '',
    Friend_List: '',
    Search_text: '',
    Search_List: ''
  },
  /***跳转好友详情界面** */
goUserInfo: function (e) {
  console.log('goChatPage')
  var userInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.userInfo))
  //跳转好友详情界面并传参
  wx.navigateTo({
    url: '/pages/gameMarketProject/friend/friendDetail/friendDetail?userInfoStr=' + userInfoStr
  })
},
  /*****跳转聊天页面*******/
  goChatPage: function (e) {
    console.log('goChatPage')
    var userInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.userInfo))
    //跳转到聊天界面并传参
    wx.navigateTo({
      url: '/pages/gameMarketProject/information/chatPage/chatPage?userInfoStr=' + userInfoStr
    })
  },
  /*******搜索好友*********/
  bindSearchContent: function (e) {
    //console.log(e.detail)
    this.setData({
      Search_text: e.detail
    })
  },
  Search: function () {
    let list = []
    for (let i = 0; i < this.data.Friend_List.length; i++) {
      if (
        this.data.Search_text == this.data.Friend_List[i].Nickname ||
        this.data.Search_text == this.data.Friend_List[i].ID
      ) {
        list = list.concat(this.data.Friend_List[i])
      }
    }
    this.setData({
      Search_List: list,
      Show_List: list,
      show: false,
      isSearching: true
    })
    console.log(this.data.Show_List)
  },
  /*******删除好友*********/
  async deleteFriend(e) {
    console.log(e.currentTarget.dataset.friendInfo)
    var count1 = await db
      .collection('Friends')
      .where({
        User1_ID: e.currentTarget.dataset.friendInfo.ID,
        User2_ID: app.globalData.User[0].ID
      })
      .count()
    count1 = count1.total
    var count2 = await db
      .collection('Friends')
      .where({
        User1_ID: app.globalData.User[0].ID,
        User2_ID: e.currentTarget.dataset.friendInfo.ID
      })
      .count()
    count2 = count2.total
    console.log(count1)
    console.log(count2)
    if (count1 != 0) {
      var res = await db
        .collection('Friends')
        .where({
          User1_ID: e.currentTarget.dataset.friendInfo.ID,
          User2_ID: app.globalData.User[0].ID
        })
        .get()
      await db.collection('Friends').doc(res.data[0]._id).remove()
    }
    if (count2 != 0) {
      var res = await db
        .collection('Friends')
        .where({
          User1_ID: app.globalData.User[0].ID,
          User2_ID: e.currentTarget.dataset.friendInfo.ID
        })
        .get()
      await db.collection('Friends').doc(res.data[0]._id).remove()
      await this.loadInfo()
      wx.showToast({
        title: '已删除好友',
        icon: 'success',
        duration: 900
      })
    }
  },
  /*******搜索框*******/
  showPopup() {
    this.setData({
      show: true,
      searchFirst: false
    })
  },
  cancel() {
    this.setData({
      show: false,
      searchFirst: true,
      Search_text: '',
      isSearching: false,
      Show_List: this.data.Friend_List
    })
  },
  /*******添加好友*********/
  addFriend() {
    wx.navigateTo({
      url: '/pages/gameMarketProject/friend/friendAdd/friendAdd'
    })
  },
  /*******好友列表***** */
  async loadInfo() {
    wx.showLoading({
      title: '加载中',
      mask: true //开启蒙版遮罩
    })
    let count = await db
      .collection('Friends')
      .where({
        User1_ID: app.globalData.User[0].ID
      })
      .count()
    count = count.total
    let data = []
    for (let i = 0; i < count; i += 20) {
      let list = await db
        .collection('Friends')
        .where({
          User1_ID: app.globalData.User[0].ID
        })
        .skip(i)
        .get()
      data = data.concat(list.data)
    }
    count = await db
      .collection('Friends')
      .where({
        User2_ID: app.globalData.User[0].ID
      })
      .count()
    count = count.total
    for (let i = 0; i < count; i += 20) {
      let list = await db
        .collection('Friends')
        .where({
          User2_ID: app.globalData.User[0].ID
        })
        .skip(i)
        .get()
      data = data.concat(list.data)
    }
    //console.log(data)
    for (var i = 0; i < data.length; i++) {
      if (data[i].User1_ID == app.globalData.User[0].ID) {
        data[i] = data[i].User2_ID
      } else {
        data[i] = data[i].User1_ID
      }
    }
    let list = []
    for (var i = 0; i < data.length; i++) {
      if (this.check(data[i], list)) {
        let res = await db
          .collection('Users')
          .where({
            ID: data[i]
          })
          .get()
        list.push(res.data[0])
      }
    }
    this.setData({
      Friend_List: list,
      Show_List: list
    })
    app.globalData.Friend_list = list
    console.log(this.data.Show_List)
    wx.hideLoading()
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
    // 高度自适应
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth
        var calc = clientHeight * rpxR - 130
        that.setData({
          winHeight: calc
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    await this.loadInfo()
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
