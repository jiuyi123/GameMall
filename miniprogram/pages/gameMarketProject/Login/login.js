// pages/gameMarketProject/Login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  Login(){
    /*
    查找数据库where name = Account，判断密码一致与否，
    出错则设置Account或Password_wrong为True
    *
    一致跳转页面到index,设置app.globalData.user为获取到的用户结果（数据库获取到的Json格式）
    *
    开始时设置Is_loading为True，结束时设为False
    */
  },
  Want_register(){
    Is_registering = true;
  },
  Account(e){
    var Account = e.detail.value
    this.setData({
      Account
    })
  },
  Password(e){
    var Password = e.detail.value
    this.setData({
      Password
    })
  },
  Weixin_login(){
    //查询数据库open_id，如果存在则登录到该账号，不存在设置weixin——loading——failed
    //开始和结束设置is——loading
  },
  Account_new(e){
    var Account_new = e.detail.value
    this.setData({
      Account_new
    })
  },
  Password_new(e){
    var Password_new = e.detail.value
    this.setData({
      Password_new
    })
  },
  Password_new_again(e){
    var Password_new_again = e.detail.value
    this.setData({
      Password_new_again
    })
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
  },

  data: {
    Account: '',
    Password:'',
    Account_new: '',
    Password_new:'',
    Password_new_again:'',
	  Account_wrong:False,
	  Password_wrong:False,
	  Is_loading:False,
	  Is_weixin_login_failed:False,
	  Is_registering:False,
	  Is_name_illegal:False,
	  Is_registered:False,
	  password_illegal:False,
	  Is_different:False
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