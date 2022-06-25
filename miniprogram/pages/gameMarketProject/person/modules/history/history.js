// pages/gameMarketProject/person/personInfo/history/history.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Show_list:[]
  },

  check(gameid,show_list,time){
    for(var i = 0;i < show_list.length;i++){
      if(show_list[i].ID == gameid) {
        show_list[i].Time = time
        return true
      }
      else continue
    }
    return false
  },

  async LoadInfo(){
    let count = await db.collection("Click").where({      User_ID:app.globalData.User[0].ID}).count()
    count = count.total
    let all = []
    for(let i = 0; i < count; i += 20){
      let list = await db.collection("Click").where({      User_ID:app.globalData.User[0].ID}).skip(i).get()
      all = all.concat(list.data)
    }
    let show_list = []
    count = 0
    for(var i = 0;i < all.length;i++){
      if(!this.check(all[i].Game_ID,show_list,all[i].Time)&&all[i].length!=4){
        show_list = show_list.concat(app.globalData.Game[all[i].Game_ID-1])
        show_list[count++].Time = all[i].Time
      }
    }
    this.setData({
      Show_list:show_list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.LoadInfo()
    console.log(this.data.Show_list)
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