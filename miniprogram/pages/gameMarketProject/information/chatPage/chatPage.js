// pages/gameMarketProject/information/chatPage/chatPage.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var db = wx.cloud.database();
/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '欢迎来到英雄联盟，敌军还有30秒到达战场，请做好准备！'
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '我怕是走错片场了...'
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '我怕是走错片场了...'
    }
  ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cusHeadIcon:'',
    scrollHeight: '100vh',
    inputBottom: 0,
    userFriend:{},
    //新加的
    TempMessage:"",
	  MessageList:[],
	  FriendID:"5"
  },

  GetTime(){
    var blank=""
    var myDate = new Date();
    var year=myDate.getFullYear();
    var month=(myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1);
    var date=myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
    var hour=myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
    var min=myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
    var sec=myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
    var myTime=blank.concat(year,"-",month,"-",date," ",hour,":",min,":",sec);
    return myTime
  },

  WriteMessage(e){
    this.setData({
      TempMessage:e.detail.value
    })
  },

  SendMessage(){
    console.log(this.data.TempMessage)
    var sendmessage = this.data.TempMessage
    db.collection("ChatRecord").add({
      data:{
          Data:sendmessage,
          Receiver_ID:this.data.FriendID,
          Sender_ID:app.globalData.User[0].ID,
          Time:this.GetTime()
      }
    })
    this.setData({
      TempMessage:''
    })
  },

  async GetMessage(){
    let count = await db.collection("ChatRecord").where({      
      Receiver_ID:this.data.FriendID,
      Sender_ID:app.globalData.User[0].ID,}).count()
    count = count.total
    let data = []
    for(let i = 0; i < count; i += 20){
      let list = await db.collection("ChatRecord").where({     
         Receiver_ID:this.data.FriendID,
      Sender_ID:app.globalData.User[0].ID,}).skip(i).get()
      data = data.concat(list.data)
    }
    console.log(data)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function(options) {
    this.GetMessage()
    var userFriend = JSON.parse(decodeURIComponent(options.userInfoStr))
    initData(this);
    this.setData({
      //加载当前用户头像
      cusHeadIcon:getApp().userInfo.Photo_link,
      //加载聊天对象信息,从聊天列表处传参得来
      userFriend,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
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
  sendClick: function(e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });


  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})
