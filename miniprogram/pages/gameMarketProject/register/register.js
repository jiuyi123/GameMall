// pages/gameMarketProject/register/register.js
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
        Account_new:'',
        Password_new:'',
        Password_new_again:'',
        IDNext:0,
  },
  Register :function(e) {
     /*
        判断密码长度是够合法，两次密码是否一致，设置相关布尔值
        判断Account——new是否合法，比较数据库账户是否已存在
        有任何错误则结束
        *
        都成功则依据数据库中的ID序号生成下一序号,
        设置app.globalData.user为新建的用户Json格式数据,
        并在user添加该用户,最后跳转至index  
        *
        */
    //console.log(e.detail.value)
    this.setData({
      Account_new :e.detail.value.Account_new,
      Password_new :e.detail.value.Password_new,
      Password_new_again :e.detail.value.Password_new_again
    })
    if(this.data.Password_new!=this.data.Password_new_again) {
      wx.showToast({
        title: '输入密码不一致',
        icon:'error',
        duration: 1500,
      })
    }
    else {
      console.log(this.data.Account_new)
      console.log(this.data.Password_new)
      db.collection("Users")
      .where({
        Name:this.data.Account_new
      })
      .get({
        success :res=>{
        console.log(res.data)
        if(res.data.length>0){
          wx.showToast({
            title: '用户名已存在',
            icon:'error',
            duration: 1500,
          })
        }
        else {
          db.collection("Users")
          .get({
            success:res=>{
            console.log(res)
            this.setData({
              IDNext: res.data[res.data.length-1].ID + 1
            }) 
            console.log(this.data.IDNext)
            db.collection("Users")
            .add({
              data:{
              ID:this.data.IDNext,
              Balance:0,
              Name:this.data.Account_new,
              Password:this.data.Password_new,
              Photo_link:'' //默认头像路径
              },
              success(res){
                wx.reLaunch({
                  url: "../index/index"
                }),
                wx.showToast({
                  title: '注册成功',
                  icon: 'success',
                  duration: 1500,//持续的时间
                })
              },
            })
          }})
        }
      }})
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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