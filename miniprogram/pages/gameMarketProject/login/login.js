// pages/gameMarketProject/login/login.js
/*Author 花园路 */
var app = getApp();
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
        Is_loading:false,
        Is_weixin_login_failed:false,
        Is_registering:false,
        Is_name_illegal:false,
        Is_registered:false,
        password_illegal:false,
        Is_different:false
    },
    
  Login :function(e) {
    console.log("Login")
    console.log(e.detail.value)
    //检查Password是否对应Account
    this.setData({
      Account:e.detail.value.username,
      Password:e.detail.value.password
    })
    wx.cloud.database().collection("Users")
    .where({
      Name : this.data.Account,
      Password : this.data.Password
    })
    .get({
      success :res=>{
        console.log(res.data)
      //getApp().globalData.user = JSON.parse(res.data)  需要在app.js中设置globalData user https://www.csdn.net/tags/MtjakgxsMzYyMDYtYmxvZwO0O0OO0O0O.html
        if(res.data.length>0){
          console.log("登录成功")
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

  Register :function() {
    console.log("Register")
    
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
      Account(e){
          var Account = e.detail.value
          this.setData({
            Account
          })
        },
        Password(e){
          var Password = e.detail.value
          this.setData({
            Password
          })
        },
        Account_new(e){
            var Account_new = e.detail.value
            this.setData({
              Account_new
            })
          },
          Password_new(e){
            var Password_new = e.detail.value
            this.setData({
              Password_new
            })
          },
          Password_new_again(e){
            var Password_new_again = e.detail.value
            this.setData({
              Password_new_again
            })
          },

  login(){
    /*
    查找数据库where name = Account，判断密码一致与否，
    出错则设置Account或Password_wrong为true
    *
    一致跳转页面到index,设置app.globalData.user为获取到的用户结果（数据库获取到的Json格式）
    *
    开始时设置Is_loading为true，结束时设为False
    */
    
  },

  Want_register(){
    Is_registering = true;
  },

  Weixin_login(){
    //查询数据库open_id，如果存在则登录到该账号，不存在设置weixin——loading——failed
    //开始和结束设置is——loading
  },

  Try_register(){
    /*
    判断密码长度是够合法，两次密码是否一致，设置相关布尔值
    判断Account——new是否合法，比较数据库账户是否已存在，设置相关布尔值  
    有任何错误则结束
    *
    都成功则依据数据库中的ID序号生成下一序号,
    设置app.globalData.user为新建的用户Json格式数据,
    并在user添加该用户,最后跳转至index  
    *
    开始和结束设置is——loading
    */
    Is_loading = true;

  },
});
