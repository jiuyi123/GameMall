// pages/gameMarketProject/login/login.js
/*Author 花园路 */
const app = getApp()
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Account: '',
    Password: '',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false
  },

  async GetAlldb(DBName) {
    let count = await db.collection(DBName).count()
    count = count.total
    let all = []
    for (let i = 0; i < count; i += 20) {
      let list = await db.collection(DBName).skip(i).get()
      all = all.concat(list.data)
    }
    return all
  },

  Login: function (e) {
    console.log('Login')
    console.log(e.detail.value)
    //检查Password是否对应Account
    this.setData({
      Account: e.detail.value.username,
      Password: e.detail.value.password
    })
    db.collection('Users')
      .where({
        Name: this.data.Account,
        Password: this.data.Password
      })
      .get({
        success: res => {
          //console.log(res.data)
          if (res.data.length > 0) {
            app.globalData.User = res.data
            wx.reLaunch({
              url: '../index/index'
            })
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1500 //持续的时间
            })
          } else {
            wx.showToast({
              title: '账号或密码错误',
              icon: 'error',
              duration: 1500 //持续的时间
            })
          }
        }
      })
  },

  Register: function (e) {
    console.log('Register')
    wx.navigateTo({
      url: '../register/register'
    })
  },

  async getUserProfile(e) {
    var userInfo
    const that = this
    wx.login({
      success(res) {
        //获取code
        console.log(res)
      }
    })
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        //获取用户信息
        userInfo = res.userInfo
        // 获取code值
        wx.login({
          success: res => {
            let code = res.code
            // 通过code换取openId
            wx.request({
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxa25a2ea091c9f809&secret=0060decbfc8c655a7157c02f8cfd386f&js_code=${code}&grant_type=authorization_code`,
              success: res => {
                userInfo.openid = res.data.openid
                that.setData({
                  userInfo: userInfo
                })
                that.Weixin_login()
              }
            })
          }
        })
      }
    })
  },

  Weixin_login: async function () {
    //查询数据库open_id，如果存在则登录到该账号
    const that = this
    var res
    var userInfo = this.data.userInfo
    // console.log(userInfo)
    // console.log(userInfo.openid)
    res = await db
      .collection('Users')
      .where({
        _openid: userInfo.openid
      })
      .get()
    if (res.data.length > 0) {
      //存在记录
      db.collection('Users')
        .doc(res.data[0]._id)
        .update({
          data: {
            Name: userInfo.nickName,
            Nickname: userInfo.nickName,
            Photo_link: userInfo.avatarUrl
          }
        })
      res.data[0].Name = userInfo.nickName
      res.data[0].Nickname = userInfo.nickName
      res.data[0].Photo_link = userInfo.avatarUrl
      app.globalData.User = res.data //默认0号元素为登录账户
      wx.reLaunch({
        url: '../index/index'
      })
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500 //持续的时间
      })
    } else {
      var data = await this.GetAlldb('Users')
      db.collection('Users').add({
        data: {
          ID: data[data.length - 1].ID + 1,
          Balance: 0,
          Name: userInfo.nickName,
          Photo_link: userInfo.avatarUrl //默认头像路径
        }
      })
      var res = await db
        .collection('Users')
        .where({
          _openid: userInfo.openid
        })
        .get()
      app.globalData.User = res.data //默认0号元素为登录账户
      wx.reLaunch({
        url: '../index/index'
      })
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500 //持续的时间
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //await this.GetUserInfo()
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
