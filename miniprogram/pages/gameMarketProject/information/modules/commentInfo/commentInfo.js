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
    //这里本应该是其他用户的消息
    gameInfoObj: [{
        userName: 'jy',
        userPhoto: 'https://s1.ax1x.com/2022/05/08/O1XIk4.jpg',
        infoContent: '今天有时间呀',
        infoTime: '13:15',
        numCommentInfo: 12
      },
      {
        userName: 'ctz',
        userPhoto: 'https://s1.ax1x.com/2022/05/18/OTqQZ8.jpg ',
        infoContent: '今天有时间呀',
        infoTime: '13:15',
        numCommentInfo: 5
      },
      {
        userName: 'wzl',
        userPhoto: 'https://s1.ax1x.com/2022/05/18/OTqKqf.jpg',
        infoContent: '今天有时间呀',
        infoTime: '13:15',
        numCommentInfo: 1
      },
      {
        userName: 'ycr',
        userPhoto: 'https://s1.ax1x.com/2022/05/18/OTqnMt.jpg',
        infoContent: '今天有时间呀',
        infoTime: '13:15',
        numCommentInfo: 999
      },
      {
        userName: 'hyl',
        userPhoto: 'https://s1.ax1x.com/2022/05/18/OTqusP.jpg',
        infoContent: '今天有时间呀',
        infoTime: '13:15',
        numCommentInfo: 0
      },
      {
        userName: '小久',
        userPhoto: 'https://s1.ax1x.com/2022/05/08/O1XIk4.jpg',
        infoContent: '今天有时间呀',
        infoTime: '13:15',
        numCommentInfo: 0
      },
      {
        userName: '小楠',
        userPhoto: 'https://s1.ax1x.com/2022/05/08/O1XIk4.jpg',
        infoContent: '今天有时间呀',
        infoTime: '13:15',
        numCommentInfo: 0
      },
      {
        userName: '康康',
        userPhoto: 'https://s1.ax1x.com/2022/05/08/O1XIk4.jpg',
        infoContent: '今天有时间呀',
        infoTime: '13:15',
        numCommentInfo: 0
      },
      {
        userName: '小云',
        userPhoto: 'https://s1.ax1x.com/2022/05/08/O1XIk4.jpg',
        infoContent: '今天有时间呀',
        infoTime: '13:15',
        numCommentInfo: 0
      }
    ]
  },

  // 跳转聊天界面
  goChatPage: function (e) {
    console.log('goChatPage')
    console.log(e.currentTarget.dataset.userInfo)
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
        console.log(calc)
        that.setData({
          winHeight: calc
        })
      }
    })
  },

  async LoadYidu() {
    let count = await db
      .collection('Comments')
      .where({
        User_ID: app.globalData.User[0].ID
      })
      .count()
    count = count.total
    let all = []
    for (let i = 0; i < count; i += 20) {
      let list = await db
        .collection('Comments')
        .where({
          User_ID: app.globalData.User[0].ID
        })
        .skip(i)
        .get()
      all = all.concat(list.data)
    }
    let list = []
    for (var i = 0; i < all.length; i++) {
      let data = []
      count = await db
        .collection('Likes')
        .where({
          Evaluation_ID: all[i].ID,
          State: '已读'
        })
        .count()
      count = count.total
      if (count > 0) {
        for (let j = 0; j < count; j += 20) {
          let list = await db
            .collection('Likes')
            .where({
              Evaluation_ID: all[i].ID,
              State: '已读'
            })
            .skip(j)
            .get()
          data = data.concat(list.data)
        }
        for (var m = 0; m < data.length; m++) {
          let res = await db
            .collection('Users')
            .where({
              ID: data[m].User_ID
            })
            .get()
          list[list.length] = {
            Liker: res.data[0],
            Comment: all[i],
            Time:data[m].Time
          }
        }
      }
    }
    for (var i = 0; i < list.length - 1; i++) {
      //确定轮数
      for (var j = 0; j < list.length - i - 1; j++) {
        //确定每次比较的次数
        if (list[j].Time < list[j + 1].Time) {
          var tem = list[j]
          list[j] = list[j + 1]
          list[j + 1] = tem
        }
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
      YiduList: list
    })
    console.log(list)
  },

  async LoadWeidu() {
    let count = await db
      .collection('Comments')
      .where({
        User_ID: app.globalData.User[0].ID
      })
      .count()
    count = count.total
    let all = []
    for (let i = 0; i < count; i += 20) {
      let list = await db
        .collection('Comments')
        .where({
          User_ID: app.globalData.User[0].ID
        })
        .skip(i)
        .get()
      all = all.concat(list.data)
    }
    //console.log(all)
    let list = []
    for (var i = 0; i < all.length; i++) {
      let data = []
      count = await db
        .collection('Likes')
        .where({
          Evaluation_ID: all[i].ID,
          State: '未读'
        })
        .count()
      count = count.total
      if (count > 0) {
        for (let j = 0; j < count; j += 20) {
          let list = await db
            .collection('Likes')
            .where({
              Evaluation_ID: all[i].ID,
              State: '未读'
            })
            .skip(j)
            .get()
          data = data.concat(list.data)
        }
        console.log(data)
        for (var m = 0; m < data.length; m++) {
          let res = await db
            .collection('Users')
            .where({
              ID: data[m].User_ID
            })
            .get()
          list[list.length] = {
            Liker: res.data[0],
            Comment: all[i],
            Time:data[m].Time
          }
          db.collection('Likes')
            .doc(data[m]._id)
            .update({
              data: {
                State: '已读'
              }
            })
        }
      }
    }
    for (var i = 0; i < list.length - 1; i++) {
      //确定轮数
      for (var j = 0; j < list.length - i - 1; j++) {
        //确定每次比较的次数
        if (list[j].Time < list[j + 1].Time) {
          var tem = list[j]
          list[j] = list[j + 1]
          list[j + 1] = tem
        }
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
      WeiduList: list
    })
    console.log(list)
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