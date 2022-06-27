// pages/gameMarketProject/information/information.js
const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ChatList: '',
    Userid: '',
    winHeight: '', //聊天列表窗口高度
    numCommentInfo: 11, //评论数量
    numSystemInfo: 8 //系统通知数量
  },
  // 跳转聊天界面
  goChatPage: function (e) {
    // console.log("goChatPage")
    // console.log(e.currentTarget.dataset.userInfo)
    var userInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.userInfo.SenderInfo))
    //跳转到聊天界面并传参
    wx.navigateTo({
      url: '../information/chatPage/chatPage?userInfoStr=' + userInfoStr
    })
  },
  //跳转评论消息页面
  goCommentInfo: function () {
    wx.navigateTo({
      url: '../information/modules/commentInfo/commentInfo'
    })
  },
  //跳转系统消息
  goSystemInfo: function () {
    wx.navigateTo({
      url: '../information/modules/systemInfo/systemInfo'
    })
  },

  check_1(time, id, list) {
    for (var i = 0; i < list.length; i++) {
      if (id == list[i].Chatid) {
        if (list[i].Time < time) {
          return i //替换i
        } else return -1 //不需要添加
      }
    }
    return -2 //添加
  },

  check(receivelist, sendlist) {
    let list = []
    let showlist = []
    var count = 0
    for (var i = 0; i < receivelist.length; i++) {
      list = list.concat(receivelist[i])
    }
    for (var i = 0; i < sendlist.length; i++) {
      list = list.concat(sendlist[i])
    }
    //console.log(list)
    for (var i = 0; i < list.length; i++) {
      if (list[i].Receiver_ID == app.globalData.User[0].ID) {
        if (this.check_1(list[i].Time, list[i].Sender_ID, showlist) == -2) {
          showlist = showlist.concat(list[i])
          showlist[count].Chatid = list[i].Sender_ID
          count++
        } else if (this.check_1(list[i].Time, list[i].Sender_ID, showlist) == -1) {
        } else {
          list[i].Chatid = list[i].Sender_ID
          showlist[this.check_1(list[i].Time, list[i].Sender_ID, showlist)] = list[i]
        }
      } else if (list[i].Sender_ID == app.globalData.User[0].ID) {
        if (this.check_1(list[i].Time, list[i].Receiver_ID, showlist) == -2) {
          showlist = showlist.concat(list[i])
          showlist[count].Chatid = list[i].Receiver_ID
          count++
        } else if (this.check_1(list[i].Time, list[i].Receiver_ID, showlist) == -1) {
        } else {
          list[i].Chatid = list[i].Receiver_ID
          showlist[this.check_1(list[i].Time, list[i].Receiver_ID, showlist)] = list[i]
        }
      }
    }
    return showlist
  },

  async CreateChatList() {
    let count = await db
      .collection('ChatRecord')
      .where({
        Sender_ID: app.globalData.User[0].ID
      })
      .count()
    count = count.total
    let sendlist = []
    for (let i = 0; i < count; i += 20) {
      let list = await db
        .collection('ChatRecord')
        .where({
          Sender_ID: app.globalData.User[0].ID
        })
        .skip(i)
        .get()
      sendlist = sendlist.concat(list.data)
    }
    count = await db
      .collection('ChatRecord')
      .where({
        Receiver_ID: app.globalData.User[0].ID
      })
      .count()
    count = count.total
    let receivelist = []
    for (let i = 0; i < count; i += 20) {
      let list = await db
        .collection('ChatRecord')
        .where({
          Receiver_ID: app.globalData.User[0].ID
        })
        .skip(i)
        .get()
      receivelist = receivelist.concat(list.data)
    }
    let show_list = this.check(receivelist, sendlist)
    this.setData({
      ChatList: show_list
    })
    // console.log(this.data.ChatList)
  },

  LoadPageData() {
    // 高度自适应
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth
        var calc = clientHeight * rpxR - 180
        // console.log(calc)
        that.setData({
          winHeight: calc,
          Userid: app.globalData.User[0].ID
        })
      }
    })
  },

  async LoadUserInfo() {
    let list = this.data.ChatList
    for (let i = 0; i < list.length; i++) {
      let count = await db
        .collection('ChatRecord')
        .where({
          Receiver_ID: this.data.Userid,
          Sender_ID: list[i].Chatid,
          State: '未读'
        })
        .count()
      list[i].Newnumber = count.total
      if (list[i].Receiver_ID == this.data.Userid) {
        let res = await db
          .collection('Users')
          .where({
            ID: list[i].Chatid
          })
          .get()
        list[i].SenderInfo = res.data[0]
      } else {
        let res = await db
          .collection('Users')
          .where({
            ID: list[i].Receiver_ID
          })
          .get()
        list[i].SenderInfo = res.data[0]
      }
    }
    for (var i = 0; i < list.length; i++) {
      let year = []
      let month = []
      let date = []
      let time = []
      for (let a = 0; a < 4; a++) {
        year.push(list[i].Time[a])
      }
      if (list[i].Time[5] != 0) {
        month.push(list[i].Time[5])
      }
      month.push(list[i].Time[6])
      month.push('月')
      if (list[i].Time[8] != 0) {
        date.push(list[i].Time[8])
      }
      date.push(list[i].Time[9])
      date.push('日')
      for (let j = 11; j < 16; j++) {
        time.push(list[i].Time[j])
      }
      list[i].year = year.join('')
      list[i].month = month.join('')
      list[i].date = date.join('')
      list[i].time = time.join('')
    }
    this.setData({
      ChatList: list
    })
    //console.log(this.data.ChatList)
  },

  async LoadDeletelist(chatid) {
    let count = await db
      .collection('ChatRecord')
      .where({
        Receiver_ID: chatid,
        Sender_ID: app.globalData.User[0].ID
      })
      .count()
    count = count.total
    let sendlist = []
    for (let i = 0; i < count; i += 20) {
      let list = await db
        .collection('ChatRecord')
        .where({
          Sender_ID: app.globalData.User[0].ID,
          Receiver_ID: chatid
        })
        .skip(i)
        .get()
      sendlist = sendlist.concat(list.data)
    }
    count = await db
      .collection('ChatRecord')
      .where({
        Sender_ID: chatid,
        Receiver_ID: app.globalData.User[0].ID
      })
      .count()
    count = count.total
    let receivelist = []
    for (let i = 0; i < count; i += 20) {
      let list = await db
        .collection('ChatRecord')
        .where({
          Sender_ID: chatid,
          Receiver_ID: app.globalData.User[0].ID
        })
        .skip(i)
        .get()
      receivelist = receivelist.concat(list.data)
    }
    let list = []
    list = this.T(sendlist, receivelist)
    return list
  },

  T(arr1, arr2) {
    let list = []
    while (arr1.length != 0 || arr2.length != 0) {
      if (arr1.length == 0) {
        list.push(arr2.splice(0, 1))
      } else if (arr2.length == 0) {
        list.push(arr1.splice(0, 1))
      } else {
        if (arr1[0].Time < arr2[0].Time) {
          list.push(arr1.splice(0, 1))
        } else {
          list.push(arr2.splice(0, 1))
        }
      }
    }
    for (let i = 0; i < list.length; i++) {
      list[i] = list[i][0]
    }
    return list
  },

  async DeleteRecord(chatid) {
    let count1 = await db
      .collection('ChatRecord')
      .where({
        Sender_ID: app.globalData.User[0].ID,
        Receiver_ID: chatid
      })
      .count()
    count1 = count1.total
    let count2 = await db
      .collection('ChatRecord')
      .where({
        Sender_ID: chatid,
        Receiver_ID: app.globalData.User[0].ID
      })
      .count()
    count2 = count2.total
    let list = await this.LoadDeletelist(chatid)
    // console.log(list)
    let sum = count1 + count2
    for (let i = 0; i < list.length && sum > 50; i++, sum--) {
      db.collection('ChatRecord').doc(list[i]._id).remove()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const that = this
    this.LoadPageData()
    await that.CreateChatList()
    await that.LoadUserInfo()
    for (var i = 0; i < this.data.ChatList.length; i++) {
      await this.DeleteRecord(this.data.ChatList[i].Chatid)
    }
    db.collection('ChatRecord').watch({
      onChange: async function (snapshot) {
        //监控数据发生变化时触发
        await that.CreateChatList()
        await that.LoadUserInfo()
      },
      onError: err => {
        console.error(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
