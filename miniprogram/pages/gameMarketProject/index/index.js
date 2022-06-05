// pages/gameMarketProject/index/index.js
var db = wx.cloud.database();
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Is_game_got : false,
    windowHeight: 0,
    windowWidth: 0,
    //搜索框
    search_text: "搜索框",
    //轮播图
    imgUrl: [
      'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Ffenwan.cdn.bcebos.com%2Fcms%2Fgamenow%2Flewan%2F2022-3%2F1646812039347%2Fe6d1f90b0992.jpg&app=2000&size=f0,0&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=3f17723bb549fd62fa24472631f87533',
      'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Ffenwan.cdn.bcebos.com%2Fcms%2Fgamenow%2Flewan%2F2021-11%2F1637903172608%2Fe5b2517f49c2.JPG&app=2000&size=f0,0&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=b05e87275f1cf74fa7b6f77510a1fc84',
      'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Ffenwan.cdn.bcebos.com%2Fcms%2Fgamenow%2Flewan%2F2021-11%2F1637291479527%2Fa6ec7f49e3ec.jpg&app=2000&size=f0,0&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=1ed168ddce7ec65fccbee9299d4d77b9',
      'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Ffenwan.cdn.bcebos.com%2Fcms%2Fgamenow%2Flewan%2F2022-1%2F1643014481622%2Fced90f06ca9c.JPG&app=2000&size=f0,0&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=49ab0aad3ae61005bc287275ffb242fd',
      'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Ffenwan.cdn.bcebos.com%2Fcms%2Fgamenow%2Flewan%2F2022-4%2F1649840368082%2Ff6c03d2548df.jpg&app=2000&size=f0,0&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=88cd3a4ff17872345f1a6592c71173df',
      'https://fenwan.cdn.bcebos.com/cms/gamenow/lewan/2022-2/1644565803292/e2df1c0a895e.jpg?x-bce-process=image/resize,m_lfit,w_242'
    ],

    //分类标签
    riderCommentList: [{
      value: '全部',
      selected: false,
      title: '全部'
    }, {
      value: '动作',
      selected: false,
      title: '动作'
    }, {
      value: '剧情',
      selected: false,
      title: '剧情'
    }, {
      value: 'FPS',
      selected: false,
      title: 'FPS'
    }, {
      value: '其他',
      selected: false,
      title: '其他'
    }],

    //游戏
    gameInfo: [],
  },

  checkboxChange(e) {
    console.log('checkboxChange e:', e);
    let string = "riderCommentList[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.riderCommentList[e.target.dataset.index].selected
    })
    let detailValue = this.data.riderCommentList.filter(it => it.selected).map(it => it.value)
    console.log('所有选中的值为：', detailValue)
  },
  //搜索框
  bindSearchContent: function (e) {
    this.setData({
      search_text: e.detail.value
    })
  },
  //搜索按钮
  search: function (e) {
    //console.log(this.data.search_text)
    //console.log(this.data.Is_game_got)
    app.globalData.search_text = this.data.search_text
    wx.navigateTo({
      url: "/pages/gameMarketProject/index/Search/Search",
    })
  },
  //游戏分类页面跳转
  goSort() {
    console.log("GoSort")
    wx.navigateTo({
      url: "/pages/gameMarketProject/index/gameSort/sort/sort",
    })
  },

  //游戏详情页面
  goDetail(e) {

    console.log("GoDetail")
    // console.log(e)
    var gameInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.gameInfo))
    //把点击的游戏对象参数传递给游戏详情页面
    wx.navigateTo({
      url: "/pages/gameMarketProject/index/gameDetail/detail/detail?gameInfoStr=" + gameInfoStr,
    })
  },
  async Onload(){
    let count = await db.collection("Games").count()
    count = count.total
    console.log(count)
    let all = []
    for(let i = 0; i < count; i += 20){
      let list = await db.collection("Games").skip(i).get()
      all = all.concat(list.data)
    }
    console.log(all)
    app.globalData.Game = all;
    //console.log(app.globalData.Game)
    this.setData({
      Is_game_got:true,
      gameInfo:all
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Onload()
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