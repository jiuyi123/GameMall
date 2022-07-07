const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsNum:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Show_list:'',
    allSelect: "circle",
    num: 0,
    count: 0,
    lastX: 0,
    lastY: 0,
    text: "没有滑动",
  },
 //游戏详情页面
 goDetail(e){
  console.log("GoDetail")
  console.log(e)
  var gameInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.gameInfo)) 
  //把点击的游戏对象参数传递给游戏详情页面
  wx.navigateTo({
    url:"/pages/gameMarketProject/index/gameDetail/detail/detail?gameInfoStr="+gameInfoStr,
  })
},

  GetTime() {
    var blank = ""
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = (myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1);
    var date = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
    var hour = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
    var min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
    var sec = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
    var myTime = blank.concat(year, "-", month, "-", date, " ", hour, ":", min, ":", sec);
    return myTime
  },

  change: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var select = e.currentTarget.dataset.select

    if (select == "circle") {
      var stype = "success"
    } else {
      var stype = "circle"
    }
    var newList = that.data.Show_list
    newList[index].select = stype
    that.setData({
      Show_list: newList
    })
    that.count()
  },
  //全选
  allSelect: function (e) {
    var that = this
    var allSelect = e.currentTarget.dataset.select //先判断是否选中
    var newList = that.data.Show_list
    console.log(newList)
    if (allSelect == "circle") {
      for (var i = 0; i < newList.length; i++) {
        newList[i].select = "success"
      }
      var select = "success"
    } else {
      for (var i = 0; i < newList.length; i++) {
        newList[i].select = "circle"
      }
      var select = "circle"
    }
    that.setData({
      Show_list: newList,
      allSelect: select
    })
    that.count()
  },
 
  count: function () {//计算金额方法
    var that = this
    var newList = that.data.Show_list
    var newCount = 0
    for (var i = 0; i < newList.length; i++) {
      if (newList[i].select == "success") {
        newCount += newList[i].num * newList[i].Price
      }
    }
    that.setData({
      count: newCount
    })
  },

  buy: async function (){ //弹窗显示购买
    var UserID = app.globalData.User[0].ID
      if(app.globalData.User[0].Balance>this.data.count){
        //修改数据库User
        var res = await db.collection("Users").where({
          ID:UserID
        }).get()
        await db.collection("Users").doc(res.data[0]._id).update({
          data:{
            Balance:app.globalData.User[0].Balance-this.data.count
          }
        })
        res = await db.collection("Users").where({
          ID:UserID
        }).get()
        app.globalData.User = res.data
        //修改订单信息
        for(var i = 0;i < this.data.Show_list.length;i++){
          if (this.data.Show_list[i].select == "success") {
          res = await db.collection("Orders").where({
            Game_ID:this.data.Show_list[i].ID,
            User_ID:UserID
          }).get()
          await db.collection("Orders").doc(res.data[0]._id).update({
            data:{
              State:'已支付',
              Time:this.GetTime(),
              Final_price:this.data.Show_list[i].Price
            }
          })
        }
        wx.reLaunch({
          url:"../shopCart/shopCart",
        })
      }
    }
    else{
      wx.showToast({
        title: '余额不足',
      })
    }
  },

  async LoadInfo(){
    let count = await db.collection("Orders").where({      User_ID:app.globalData.User[0].ID,
      State:"未支付"}).count()
    count = count.total
    let all = []
    for(let i = 0; i < count; i += 20){
      let list = await db.collection("Orders").where({      User_ID:app.globalData.User[0].ID,
        State:"未支付"}).skip(i).get()
      all = all.concat(list.data)
    }
    var gamelist = new Array
    for(let i = 0; i < all.length; i++){
      app.globalData.Game[all[i].Game_ID-1].select = "circle",
      app.globalData.Game[all[i].Game_ID-1].num = 1,
      gamelist = gamelist.concat(app.globalData.Game[all[i].Game_ID-1])
    }
    this.setData({
      Show_list:gamelist
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var width=wx.getSystemInfoSync().windowWidth
    var height=wx.getSystemInfoSync().windowHeight
    height=height-55-53;
    this.setData({
      height:height
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    await this.LoadInfo()
    console.log(this.data.Show_list)
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
