// pages/gameMarketProject/friend/friendDetail/friendDetail.js
var db = wx.cloud.database()
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isFriend: false,
    //游戏
    gameInfoHad: [
      {
        Name: '小缇娜的奇幻之地',
        Pic_link: 'https://img.3dmgame.com/uploads/images/thumbkwdfirst/20210611/1623377152_289505.jpg'
      },
      {
        Name: '我的世界',
        Pic_link: 'https://img.3dmgame.com/uploads/images/thumbkwdfirst/20210611/1623377152_289505.jpg'
      }
    ],
    gameInfoLike: [
      {
        Name: '小缇娜的奇幻之地',
        Pic_link: 'https://img.3dmgame.com/uploads/images/thumbkwdfirst/20210611/1623377152_289505.jpg'
      }
    ],
    userID: '',
    userInfo: [],
    Ku_list: [],
    Like_list: []
  },
  /***跳转聊天页面** */
  goChatPage: function () {
    console.log('goChatPage')
    var userInfoStr = encodeURIComponent(JSON.stringify(this.data.userInfo))
    //跳转到聊天界面并传参
    wx.navigateTo({
      url: '/pages/gameMarketProject/information/chatPage/chatPage?userInfoStr=' + userInfoStr
    })
  },

  async GetKu_list() {
    let count = await db
      .collection('Orders')
      .where({
        User_ID: this.data.userInfo.ID,
        State: '已支付'
      })
      .count()
    count = count.total
    let data = []
    for (let i = 0; i < count; i += 20) {
      let list = await db
        .collection('Orders')
        .where({
          User_ID: this.data.userInfo.ID,
          State: '已支付'
        })
        .skip(i)
        .get()
      data = data.concat(list.data)
    }
    let list = []
    for (var i = 0; i < data.length; i++) {
      list = list.concat(app.globalData.Game[data[i].Game_ID - 1])
    }
    this.setData({
      Ku_list: list
    })
  },

  async GetLike_list() {
    let count = await db
      .collection('Collect')
      .where({
        User_ID: this.data.userInfo.ID
      })
      .count()
    count = count.total
    let data = []
    for (let i = 0; i < count; i += 20) {
      let list = await db
        .collection('Collect')
        .where({
          User_ID: this.data.userInfo.ID
        })
        .skip(i)
        .get()
      data = data.concat(list.data)
    }
    let list = []
    for (var i = 0; i < data.length; i++) {
      list = list.concat(app.globalData.Game[data[i].Game_ID - 1])
    }
    this.setData({
      Like_list: list
    })
  },

  IsFriend() {
    let list = app.globalData.Friend_list
    // console.log(list)
    // console.log(this.data.userInfo)
    for (var i = 0; i < list.length; i++) {
      if (this.data.userInfo.ID == list[i].ID) {
        this.setData({
          isFriend: true
        })
        return
      }
    }
    this.setData({
      isFriend: false
    })
  },

  async LoadInfo() {
    let res = await db
      .collection('Users')
      .where({
        ID: this.data.userInfo.ID
      })
      .get()
    // if(res.data[0])
    if (res.data[0].Likepublic) {
      await this.GetKu_list()
    } else {
      this.setData({
        Ku_list: 'Private'
      })
    }
    if (res.data[0].Kupublic) {
      await this.GetLike_list()
    } else {
      this.setData({
        Like_list: 'Private'
      })
    }
    await this.IsFriend()
    console.log(this.data.Ku_list)
    console.log(this.data.Like_list)
    console.log(this.data.isFriend)
  },
  /*****添加好友****** */
  addFriend() {
    // console.log(this.data.userInfo.ID)
    if (app.globalData.User[0].ID == this.data.userInfo.ID) {
      wx.showToast({
        title: '这是你自己',
        icon: 'error',
        duration: 900
      })
    } else {
      db.collection('Friends').add({
        data: {
          User1_ID: app.globalData.User[0].ID,
          User2_ID: this.data.userInfo.ID
        }
      })
      wx.showToast({
        title: '已添加好友',
        icon: 'success',
        duration: 900
      })
      this.setData({
        isFriend: true
      })
    }
  },
  /*******删除好友*********/
  async delete() {
    var count1 = await db
      .collection('Friends')
      .where({
        User1_ID: this.data.userInfo.ID,
        User2_ID: app.globalData.User[0].ID
      })
      .count()
    count1 = count1.total
    var count2 = await db
      .collection('Friends')
      .where({
        User1_ID: app.globalData.User[0].ID,
        User2_ID: this.data.userInfo.ID
      })
      .count()
    count2 = count2.total
    if (count1 != 0) {
      var res = await db
        .collection('Friends')
        .where({
          User1_ID: this.data.userInfo.ID,
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
          User2_ID: this.data.userInfo.ID
        })
        .get()
      await db.collection('Friends').doc(res.data[0]._id).remove()
      wx.showToast({
        title: '已删除好友',
        icon: 'success',
        duration: 900
      })
      this.setData({
        isFriend: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var userFriend = JSON.parse(decodeURIComponent(options.userInfoStr))
    this.setData({
      userInfo: userFriend
    })
    this.LoadInfo()
  },

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
