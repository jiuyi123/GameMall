// pages/gameMarketProject/information/chatPage/chatPage.js
const app = getApp()
var inputVal = ''
var msgList = []
var windowWidth = wx.getSystemInfoSync().windowWidth
var windowHeight = wx.getSystemInfoSync().windowHeight
var keyHeight = 0
var db = wx.cloud.database()
/**
 * 初始化数据
 */
function initData(that) {
  inputVal = ''
  that.setData({
    inputVal
  })
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    friend: '',
    user: '',
    inputBottom: 0,
    //新加的
    Show_list: '',
    TempMessage: '',
    SendMessageList: [],
    ReceiveMessageList: [],
    //页面样式数据
    scrollHeight: '100vh',
    scrollLast: null //聊天记录置底
  },
  /********聊天记录置底****/
  getScollBottom() {
    this.setData({
      scrollLast: 'item' + this.data.Show_list.length
    })
  },

  GetTime() {
    var blank = ''
    var myDate = new Date()
    var year = myDate.getFullYear()
    var month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
    var date = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
    var hour = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
    var min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
    var sec = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()
    var myTime = blank.concat(year, '-', month, '-', date, ' ', hour, ':', min, ':', sec)
    return myTime
  },

  WriteMessage(e) {
    this.setData({
      TempMessage: e.detail.value
    })
  },

  SendMessage() {
    //console.log(this.data.TempMessage)
    var sendmessage = this.data.TempMessage
    if (sendmessage.length != 0) {
      for (var i = 0; i < sendmessage.length; i++) {
        if (sendmessage[i] != ' ') {
          db.collection('ChatRecord').add({
            data: {
              Data: sendmessage,
              Receiver_ID: this.data.friend.ID,
              Sender_ID: app.globalData.User[0].ID,
              Time: this.GetTime(),
              State: '未读'
            }
          })
          break
        }
      }
    }
    this.setData({
      TempMessage: ''
    })
  },

  async GetSendMessage() {
    let count = await db
      .collection('ChatRecord')
      .where({
        Receiver_ID: this.data.friend.ID,
        Sender_ID: app.globalData.User[0].ID
      })
      .count()
    count = count.total
    let data = []
    for (let i = 0; i < count; i += 20) {
      let list = await db
        .collection('ChatRecord')
        .where({
          Receiver_ID: this.data.friend.ID,
          Sender_ID: app.globalData.User[0].ID
        })
        .skip(i)
        .get()
      data = data.concat(list.data)
    }
    //console.log(data)
    this.setData({
      SendMessageList: data
    })
    //console.log(this.data.SendMessageList)
  },

  async GetReceiveMessage() {
    let count = await db
      .collection('ChatRecord')
      .where({
        Receiver_ID: app.globalData.User[0].ID,
        Sender_ID: this.data.friend.ID
      })
      .count()
    count = count.total
    let data = []
    for (let i = 0; i < count; i += 20) {
      let list = await db
        .collection('ChatRecord')
        .where({
          Receiver_ID: app.globalData.User[0].ID,
          Sender_ID: this.data.friend.ID
        })
        .skip(i)
        .get()
      data = data.concat(list.data)
    }
    //console.log(data)
    for (let i = 0; i < data.length; i++) {
      if ((data[i].State = '未读')) {
        db.collection('ChatRecord')
          .doc(data[i]._id)
          .update({
            data: {
              State: '已读'
            }
          })
        data[i].State = '已读'
      }
    }
    this.setData({
      ReceiveMessageList: data
    })
    //console.log(this.data.ReceiveMessageList)
  },

  Show() {
    //前端调用一次用于数据初始化
    let arr1 = []
    for (let i = 0; i < this.data.ReceiveMessageList.length; i++) {
      arr1[i] = this.data.ReceiveMessageList[i]
    }
    let arr2 = []
    for (let i = 0; i < this.data.SendMessageList.length; i++) {
      arr2[i] = this.data.SendMessageList[i]
    }
    var list = []
    //console.log(arr1)
    //console.log(arr2)
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
    //console.log(list)
    if (list.length != 0) {
      this.setData({
        Show_list: list
      })
    }
    //console.log('Show_list')
    //console.log(this.data.Show_list)
    this.getScollBottom()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getScollBottom()
    const that = this
    var userFriend = JSON.parse(decodeURIComponent(options.userInfoStr))
    //console.log(userFriend)
    initData(this)
    this.setData({
      //加载朋友信息
      friend: userFriend,
      //加载用户信息
      user: app.globalData.User[0]
    })
    // console.log('朋友')
    // console.log(this.data.friend)
    // console.log('用户')
    // console.log(this.data.user)
    db.collection('ChatRecord')
      .where({
        Receiver_ID: this.data.friend.ID,
        Sender_ID: app.globalData.User[0].ID
      })
      .watch({
        onChange: async function (snapshot) {
          //监控数据发生变化时触发
          await that.GetReceiveMessage()
          await that.GetSendMessage()
          that.Show()
          //console.log('监听发送')
          //console.log(that.data.Show_list)
        },
        onError: err => {
          console.error(err)
        }
      })
    db.collection('ChatRecord')
      .where({
        Receiver_ID: app.globalData.User[0].ID,
        Sender_ID: this.data.friend.ID
      })
      .watch({
        onChange: async function (snapshot) {
          //监控数据发生变化时触发
          await that.GetReceiveMessage()
          await that.GetSendMessage()
          that.Show()
          //console.log('监听接收')
          //console.log(that.data.Show_list)
        },
        onError: err => {
          console.error(err)
        }
      })
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height
    this.setData({
      scrollHeight: windowHeight - keyHeight + 'px'
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);
  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })
  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = ''
    this.setData({
      msgList,
      inputVal
    })
  },

  /**
   * 退回上一页
   */
  toBackClick: function () {
    wx.navigateBack({})
  }
})