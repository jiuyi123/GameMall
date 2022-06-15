// pages/gameMarketProject/login/login.js
/*Author 花园路 */
const app = getApp();
const db = wx.cloud.database();
var userInfo
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
        Account: '',
        Password:'',
    },
  
    async GetAlldb(DBName){
      let count = await db.collection(DBName).count()
      count = count.total
      let all = []
      for(let i = 0; i < count; i += 20){
        let list = await db.collection(DBName).skip(i).get()
        all = all.concat(list.data)
      }
      return all
    },

  Login :function(e) {
    console.log("Login")
    console.log(e.detail.value)
    //检查Password是否对应Account
    this.setData({
      Account:e.detail.value.username,
      Password:e.detail.value.password
    })
    db.collection("Users")
    .where({
      Name : this.data.Account,
      Password : this.data.Password
    })
    .get({
      success :res=>{
        //console.log(res.data)
        if(res.data.length>0){
          app.globalData.User = res.data
          wx.reLaunch({
            url:"../index/index",
          })
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1500,//持续的时间
          })
        }
        else {
          wx.showToast({
            title: '账号或密码错误',
            icon:'error',
            duration: 1500,//持续的时间
          })
        }
      }
    })
  },

  Register :function(e) { 
    console.log("Register")
    wx.navigateTo({
      url: "../register/register"
    })
  },
  
  async GetUserInfo(){
    wx.getUserInfo({
      success:(res)=>{
        userInfo= res.userInfo
        // 获取code值
        wx.login({
          success:(res)=>{
            let code=res.code
            // 通过code换取openId
            wx.request({
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxa25a2ea091c9f809&secret=0060decbfc8c655a7157c02f8cfd386f&js_code=${code}&grant_type=authorization_code`,
              success:(res)=>{
                userInfo.openid=res.data.openid
                console.log(userInfo)
                return userInfo
              }
            })
          }
        })
      }
    })
  },

  Weixin_login :async function() {
    //查询数据库open_id，如果存在则登录到该账号
    const that = this
    var res
    //console.log("Weixin_login")
    while(userInfo.openid!=undefined){
      res = await db.collection("Users").where({
        _openid:userInfo.openid
      }).get()
      //console.log(res.data)
      if(res.data.length>0){  //存在记录
        app.globalData.User = res.data  //默认0号元素为登录账户
        wx.reLaunch({
          url:"../index/index",
        })
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500,//持续的时间
        })
      }
      else{
        var data = await this.GetAlldb("Users")
        await db.collection("Users").add({
          data:{
              ID:data[data.length-1].ID + 1,
              Balance:0,
              Name:userInfo.nickName,
              Photo_link:userInfo.avatarUrl //默认头像路径
          }
        })
        var res = await db.collection("Users")
        .where({
          _openid:userInfo.openid
        }).get()
        app.globalData.User = res.data  //默认0号元素为登录账户
        wx.reLaunch({
          url:"../index/index",
        })
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500,//持续的时间
        })
      }
      break
    }  
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.GetUserInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
});
