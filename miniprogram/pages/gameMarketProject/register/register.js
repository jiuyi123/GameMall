// pages/gameMarketProject/register/register.js
const app = getApp();
const db = wx.cloud.database();
var userInfo
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Account_new: '',
    Password_new: '',
    Password_new_again: '',
    IDNext: 0,
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

  async GetUserInfo() {
    wx.getUserInfo({
      success: (res) => {
        userInfo = res.userInfo
        // 获取code值
        wx.login({
          success: (res) => {
            let code = res.code
            // 通过code换取openId
            wx.request({
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxa25a2ea091c9f809&secret=0060decbfc8c655a7157c02f8cfd386f&js_code=${code}&grant_type=authorization_code`,
              success: (res) => {
                userInfo.openid = res.data.openid
                console.log(userInfo)
                return userInfo
              }
            })
          }
        })
      }
    })
  },

  Register: async function (e) {
    var data = await this.GetAlldb("Users")
    var yingwen = new RegExp("[A-Za-z]+")
    var shuzi = new RegExp("[0-9]+");
    this.setData({
      Account_new: e.detail.value.Account_new,
      Password_new: e.detail.value.Password_new,
      Password_new_again: e.detail.value.Password_new_again
    })
    if (this.data.Password_new != this.data.Password_new_again) {
      wx.showToast({
        title: '输入密码不一致',
        icon: 'error',
        duration: 1500,
      })
    } else if (this.data.Account_new.length > 25 || this.data.Account_new.length < 2) {
      wx.showToast({
        title: '账号长度非法',
        icon: 'error',
        duration: 1500,
      })
    } else if (this.data.Password_new.length > 16 || this.data.Password_new.length < 6) {
      wx.showToast({
        title: '密码长度非法',
        icon: 'error',
        duration: 1500,
      })
    } else if (!(yingwen.test(this.data.Password_new) && shuzi.test(this.data.Password_new))) {
      wx.showToast({
        title: '输入密码非法',
        icon: 'error',
        duration: 1500,
      })
    } else {
      let res = await db.collection("Users")
        .where({
          Name: this.data.Account_new
        })
        .get()
      if (res.data.length > 0) {
        wx.showToast({
          title: '用户名已存在',
          icon: 'error',
          duration: 1500,
        })
      } else if (this.data.Account_new.length == 0) {
        wx.showToast({
          title: '用户名不能为空',
          icon: 'error',
          duration: 1500,
        })
      } else if (this.data.Password_new.length == 0) {
        wx.showToast({
          title: '密码不能为空',
          icon: 'error',
          duration: 1500,
        })
      } else {
        this.setData({
          IDNext: data[data.length - 1].ID + 1
        })
        wx.showLoading({
          title: '加载中',
          mask: true //开启蒙版遮罩
        })
        await db.collection("Users")
          .add({
            data: {
              ID: this.data.IDNext,
              Balance: 0,
              Name: this.data.Account_new,
              Nickname: this.data.Account_new,
              Password: this.data.Password_new,
              Photo_link: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
              Email: '',
              Country: userInfo.country,
              Kupublic: true,
              Likepublic: true,
              Commentpublic: true
            },
          })
        db.collection("Users")
          .where({
            Name: this.data.Account_new
          })
          .get({
            success: res => {
              console.log(res.data)
              app.globalData.User = res.data
            }
          })
        db.collection("SystemNotification").add({
          data: {
            Content: '欢迎加入VGame小程序。',
            Time: this.GetTime(),
            State: '未读',
            Sender: 'VGame管理员',
            Photo_link: 'https://s1.ax1x.com/2022/07/07/jdWnxJ.png'
          }
        })
        wx.hideLoading()
        wx.reLaunch({
          url: "../index/index?FirstLogin=" + true
        })
      }
    }
},

GetTime() {
  var blank = ''
  var myDate = new Date()
  var year = myDate.getFullYear()
  var month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
  var date = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
  var hour = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
  var min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
  var sec = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()
  var myTime = blank.concat(year, '-', month, '-', date, ' ', hour, ':', min, ':', sec)
  return myTime
},

/**
 * 生命周期函数--监听页面加载
 */
async onLoad(options) {
    this.GetUserInfo()
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