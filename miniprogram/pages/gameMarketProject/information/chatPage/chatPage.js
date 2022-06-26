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
    userID:3,
    cusHeadIcon:'',
    scrollHeight: '100vh',
    inputBottom: 0,
    userFriend:{},
    //新加的
    Show_list:'',
    TempMessage:"",
    SendMessageList:[],
    ReceiveMessageList:[],
	  FriendID:6
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
    //console.log(this.data.TempMessage)
    var sendmessage = this.data.TempMessage
    db.collection("ChatRecord").add({
      data:{
          Data:sendmessage,
          Receiver_ID:this.data.FriendID,
          Sender_ID:app.globalData.User[0].ID,
          Time:this.GetTime(),
          State:'未读'
      }
    })
    this.setData({
      TempMessage:''
    })
  },

  async GetSendMessage(){
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
    //console.log(data)
    this.setData({
      SendMessageList:data
    })
    console.log(this.data.SendMessageList)
  },

  async GetReceiveMessage(){
    let count = await db.collection("ChatRecord").where({      
      Receiver_ID:app.globalData.User[0].ID,
      Sender_ID:this.data.FriendID,}).count()
    count = count.total
    let data = []
    for(let i = 0; i < count; i += 20){
      let list = await db.collection("ChatRecord").where({     
         Receiver_ID:app.globalData.User[0].ID,
      Sender_ID:this.data.FriendID,}).skip(i).get()
      data = data.concat(list.data)
    }
    //console.log(data)
    for(let i = 0;i < data.length;i++){
      if(data[i].State='未读'){
        db.collection("ChatRecord").doc(data[i]._id).update({
          data:{
            State:'已读'
          }
        })
        data[i].State = '已读'
      }
    }
    this.setData({
      ReceiveMessageList:data
    })
    console.log(this.data.ReceiveMessageList)
  },

  Show(){//前端调用一次用于数据初始化
    let arr1 = this.data.ReceiveMessageList
    let arr2 = this.data.SendMessageList
    var list = []
    //console.log(arr1)
    //console.log(arr2)
      while(arr1.length!=0||arr2.length!=0){
        if(arr1.length==0){
          list.push(arr2.splice(0,1))
        }
        else if(arr2.length==0){
          list.push(arr1.splice(0,1))
        }
        else{
          if(arr1[0].Time<arr2[0].Time) {
            list.push(arr1.splice(0,1))
          }
          else{
            list.push(arr2.splice(0,1))
          }
        }
      }
      //console.log(list)
      if(list.length!=0){
        this.setData({
          Show_list:list
        })
      }
      console.log("Show_list")
      console.log(this.data.Show_list)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function(options) {
    const that = this
    var userFriend = JSON.parse(decodeURIComponent(options.userInfoStr))
    initData(this);
    this.setData({
      //加载当前用户头像
      cusHeadIcon:getApp().userInfo.Photo_link,
      //加载聊天对象信息,从聊天列表处传参得来
      userFriend,
    });
    db.collection('ChatRecord').where({
      Receiver_ID:this.data.FriendID,
      Sender_ID:app.globalData.User[0].ID
    }).watch({
      onChange: async function (snapshot) {
        //监控数据发生变化时触发
        await that.GetReceiveMessage()
        await that.GetSendMessage()
        let list = []
        list.concat(that.data.Show_list)
        list.push(that.data.SendMessageList[0])
        that.setData({
          Show_list:list
        })
        await that.Show()
        console.log(that.data.Show_list)
      },
      onError:(err) => {
        console.error(err)
      }
    })
    db.collection('ChatRecord').where({
      Receiver_ID:app.globalData.User[0].ID,
      Sender_ID:this.data.FriendID
    }).watch({
      onChange: async function (snapshot) {
        //监控数据发生变化时触发
        await that.GetReceiveMessage()
        await that.GetSendMessage()
        let list = []
        list.concat(that.data.Show_list)
        list.push(that.data.ReceiveMessageList[0])
        that.setData({
          Show_list:list
        })
        await that.Show()
        console.log(that.data.Show_list)
      },
      onError:(err) => {
        console.error(err)
      }
    })
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