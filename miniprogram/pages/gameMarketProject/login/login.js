// pages/gameMarketProject/login/login.js
/*Author 花园路 */
const app = getApp();
const db = wx.cloud.database();
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
        Account: '',
        Password:'',
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
      //Password : this.data.Password
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

  Weixin_login :function() {
    //查询数据库open_id，如果存在则登录到该账号
    console.log("Weixin_login")
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://example.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
   {
      // wx.login({
      //   success:function(res) {
      //     var code = res.code
      //     wx.getsetting({
      //       success:function(res) {
      //         // 判断用户是否授权 如果用户授权了 返回的数据res中 是有userinfo的
      //         if (res.authSetting['scope.userInfo']){
      //           console.log(res)
      //         }
      //       }
      //     })
      //   }
      // })
    }
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
