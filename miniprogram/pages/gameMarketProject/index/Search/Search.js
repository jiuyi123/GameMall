// pages/gameMarketProject/index/Search/Search.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Game_list: '',
    search_text: '',
    Show_list: new Array(),
    NoRes: false
  },
  bindSearchContent: function (e) {

    this.setData({
      search_text: e.detail.value
    })
  },
  search:function() {
    app.globalData.search_text= this.data.search_text,
    this.Dafen_AllGame()
  },
  Dafen_AllGame: function () {
    let temp = new Array()
    this.setData({
      Game_list: app.globalData.Game
    })
    let game = new Array()
    for (var i = 0; i < this.data.Game_list.length; i++) {
      game[i] = this.data.Game_list[i];
    }
    for (var i = 0; i < game.length; i++) {
      temp[i] = this.Dafen(game[i])
    }
    temp = this.Sort(temp, game)
    if (temp[0] == 0) {
      this.setData({
        NoRes: true,
        Show_list: null
      })
    } else {
      for (var i = 0; i < temp.length; i++) {
        if (temp[i] < temp[0] / 2) {
          var tem = temp.length
          temp.splice(i, tem - i)
          game.splice(i, tem - i)
          break
        }
      }
      this.setData({
        NoRes: false,
        Show_list: game
      })
    }
    //console.log(this.data.Show_list)
  },

  Dafen: function (Game) { //比较用户搜索的字符串和游戏属性进行打分
    var fenshu = 0 //总分
    var game = Game //游戏对象
    var str = app.globalData.search_text //用户搜索的字串
    fenshu += this.Dafen_cishu(game.Name)
    fenshu += this.Dafen_cishu(game.Intro)
    fenshu += this.Dafen_shunxu(game.Name)
    fenshu += this.Dafen_shunxu(game.Intro)
    fenshu += this.Dafen_tag(game.Tag)
    return fenshu;
  },

  //根据用户输入字串和游戏相关字串的字符匹配次数打分
  Dafen_cishu: function (str) {
    var equal_char = 0
    for (var i = 0; i < str.length; i++) {
      for (var j = 0; j < app.globalData.search_text.length; j++) {
        if (str[i] == app.globalData.search_text[j])
          equal_char++
      }
    }
    return 2 * equal_char
  },

  //根据用户输入字串和游戏相关字串的字符顺序匹配程度进行打分
  Dafen_shunxu: function (str) {
    var max_sub_str = this.finMaxSubStr(str, app.globalData.search_text) //算法本质是获取两个字符串的最大相同子字符串的长度
    //console.log("子串长度:" + max_sub_str.length)
    var mark = 2
    if (max_sub_str.length == 0)
      return 0
    else {
      for (var i = 0; i < max_sub_str.length; i++) {
        mark = 2 * mark
      }
      return mark
    }
  },

  //获取两个字符串的最大字串
  finMaxSubStr: function (str1, str2) {
    //创建一个二维数组
    let temp = new Array()
    let max = 0
    let index = null
    for (let i = 0; i < str1.length; i++) {
      //初始化为二维数组
      temp[i] = new Array()
      for (let j = 0; j < str2.length; j++) {
        //比较两个位置是否相等，相等就将让temp[i][j]相对于temp[i-1][j-1]加一（前提是temp[i-1][j-1]存在）
        if (str1.charAt(i) === str2.charAt(j)) {
          if (i > 0 && j > 0 && temp[i - 1][j - 1] > 0) {
            temp[i][j] = 1 + temp[i - 1][j - 1]
          } else {
            temp[i][j] = 1
          }
          //保存当前temp中最大的数字，并
          if (max < temp[i][j]) {
            max = temp[i][j]
            index = i
          }
        } else {
          temp[i][j] = 0
        }
      }
    }
    return str1.substr(index - max + 1, max)
  },

  //根据用户输入字串和游戏相关字串的字符匹配次数打分
  Dafen_tag: function (tag_str) {
    var tag_str_array = tag_str.trim().split(" ") //以空格分隔Tag字符串
    for (var i = 0; i < tag_str_array.length; i++) {
      if (tag_str_array[i] == app.globalData.search_text) return 10
    }
    return 0
  },

  Sort: function (arr, game) {
    for (var i = 0; i < arr.length - 1; i++) { //确定轮数
      for (var j = 0; j < arr.length - i - 1; j++) { //确定每次比较的次数
        if (arr[j] < arr[j + 1]) {
          var tem = arr[j]
          var temgame = game[j]
          arr[j] = arr[j + 1]
          game[j] = game[j + 1]
          arr[j + 1] = tem
          game[j + 1] = temgame
        }
      }
    }
    return arr
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Dafen_AllGame()
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