// pages/gameMarketProject/friend/friendAdd/friendAdd.js
const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Friend_List: '',
    Add_text: '',
    Search_List: '',
    Add_ID: ''
  },

  bindAddContent: function (e) {
    console.log(e.detail)
    this.setData({
      Add_text: e.detail
    })
  },

  check(id,Friendlist){
    for(var i=0;i<Friendlist.length;i++){
      if(id==Friendlist[i]){
        return true
      }
    }
    return false
  },

  GetFriend: async function () {
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
    return data
  },

  Search: async function () {
    let list = []
    var res = await db
      .collection('Users')
      .where({
        Nickname: this.data.Add_text
      })
      .get()
    for (let i = 0; i < res.data.length; i++) {
      list = list.concat(res.data[i])
      list[i].IsFriend = this.check(list[i].ID,this.data.Friend_List)
    }
    this.setData({
      Search_List: list
    })
    console.log(this.data.Search_List)
  },

  Add_Friend: function (e) {
    // console.log(e.currentTarget.dataset.userInfo.ID)
    db.collection('Friends').add({
      data: {
        User1_ID: app.globalData.User[0].ID,
        User2_ID: e.currentTarget.dataset.userInfo.ID
      }
    })
    wx.showToast({
      title: '已添加好友',
      icon: 'success',
      duration: 900
    })
  },

  async LaodInfo() {
    let data = await this.GetFriend()
    for (let i = 0; i < data.length; i++) {
      if (data[i].User1_ID == app.globalData.User[0].ID) {
        data[i] = data[i].User2_ID
      } else {
        data[i] = data[i].User1_ID
      }
    }
    this.setData({
      Friend_List: data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.LaodInfo()
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
