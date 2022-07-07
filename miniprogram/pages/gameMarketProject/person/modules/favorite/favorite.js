// pages/gameMarketProject/person/modules/favorite/favorite.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
        //游戏
        Show_list:''
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
//获取游戏列表
  async LoadInfo(){
    let count = await db.collection("Collect").where({User_ID:app.globalData.User[0].ID}).count()
    count = count.total
    let all = []
    for(let i = 0; i < count; i += 20){
      let list = await db.collection("Collect").where({      User_ID:app.globalData.User[0].ID}).skip(i).get()
      all = all.concat(list.data)
    }
    var gamelist = new Array
    for(let i = 0; i < all.length; i++){
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