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
        Account_new: '',
        Password_new:'',
        Password_new_again:'',
        IDNext:0,
    },
    
  Login :function(e) {
    //console.log("Login")
    //console.log(e.detail.value)
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
          //console.log(app.globalData.User)
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

  Register :function(e) { //添加到前端Register页面的相关按钮接口
//      /*
//     判断密码长度是够合法，两次密码是否一致，设置相关布尔值
//     判断Account——new是否合法，比较数据库账户是否已存在
//     有任何错误则结束
//     *
//     都成功则依据数据库中的ID序号生成下一序号,
//     设置app.globalData.user为新建的用户Json格式数据,
//     并在user添加该用户,最后跳转至index  
//     *
//     */
//     console.log("Register")
//     this.setData({
//       Account_new:e.detail.value.Account_new,
//       Password_new:e.detail.value.Password_new,
//       Password_new_again:e.detail.value.Password_new_again
//     })
//     if(this.data.Password_new!=this.data.Password_new_again) {
//       wx.showToast({
//         title: '两次输入密码不同请重新输入',
//         icon:'error',
//         duration: 1500,
//       })
//     }
//     else {
//       db.collection("Users")
//       .where({
//         Name:this.data.Account_new
//       })
//       .get(res=>{
//         if(res.data.length>0){
//           wx.showToast({
//             title: '用户名已存在',
//             icon:'error',
//             duration: 1500,
//           })
//         }
//         else {
//           db.collection("Users")
//           .limit(1).get(res=>{
//             this.setData({
//               IDNext: res.data[0].ID + 1
//             }) 
//             db.collection("Users")
//             .add({
//               data:{
//               ID:this.data.IDNext,
//               Balance:0,
//               Name:this.data.Account_new,
//               Password:this.data.Password_new,
//               Photo_link:'' //默认头像路径
//               }
//             })
//             .get(res=>{
//               app.globalData.User = res.data
//             })
//             wx.reLaunch({
//               url:"../index/index",
//             })
//             wx.showToast({
//               title: '注册成功',
//               icon: 'success',
//               duration: 1500,//持续的时间
//             })
//           })
//         }
//       })
//     }
  },

  Weixin_login :function() {
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

  Want_register(){
    Is_registering = true;
  },

  Weixin_login(){
    //查询数据库open_id，如果存在则登录到该账号，不存在设置weixin——loading——failed
    //开始和结束设置is——loading
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
})

