// pages/gameMarketProject/index/index.js
var db = wx.cloud.database()
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    first:true,
    LunboList:'',
    HotChart: '',
    TuijianList: '',
    show: false,
    searchFirst: true,
    Is_game_got: false,
    winHeight: '', //窗口高度
    //搜索框
    search_text: '搜索框',
    //轮播图
    imgUrl: [{
        "src": "https://img1.baidu.com/it/u=582258535,2308803420&fm=253&fmt=auto&app=138&f=PNG?w=1267&h=495",
        "ID": "51"
      }, {
        "src": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp492567967.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659833485&t=09096021afd4d9ae97495bb207636a0e",
        "ID": "61"
      }, {
        "src": "https://img2.baidu.com/it/u=4051406532,1053820514&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        "ID": "102"
      }, {
        "src": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.taowopu.com%2Fpublic%2Fuploads%2F2020%2F08%2F28%2F5f48818ba0dbc.png&refer=http%3A%2F%2Fwww.taowopu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659834501&t=d6dde9353c543b8e5f0339e784303db4",
        "ID": "110"
      },

    ],
    //游戏
    gameInfo: []
  },
  showPopup() {
    this.setData({
      show: true,
      searchFirst: false
    })
  },
  onClose() {
    this.setData({
      show: false,
      searchFirst: true
    })
  },
  /*监听搜索输入框的值*/
  onChange(event) {
    console.log(event.detail)
    this.setData({
      search: event.detail
    })
  },
  checkboxChange(e) {
    console.log('checkboxChange e:', e)
    let string = 'riderCommentList[' + e.target.dataset.index + '].selected'
    this.setData({
      [string]: !this.data.riderCommentList[e.target.dataset.index].selected
    })
    let detailValue = this.data.riderCommentList.filter(it => it.selected).map(it => it.value)
    console.log('所有选中的值为：', detailValue)
  },
  //搜索框
  bindSearchContent: function (e) {
    console.log(e.detail)
    this.setData({
      search_text: e.detail
    })
  },
  //搜索按钮
  search: function (e) {
    console.log(this.data.search_text)
    //console.log(this.data.Is_game_got)

    app.globalData.search_text = this.data.search_text
    wx.navigateTo({
      url: '/pages/gameMarketProject/index/Search/Search'
    })
  },
  //游戏分类页面跳转
  goSort() {
    console.log('GoSort')
    wx.navigateTo({
      url: '/pages/gameMarketProject/index/gameSort/sort/sort'
    })
  },
  goUrlDetail(e){
    console.log("goUrlDetail")
    console.log(e.currentTarget.dataset.gameInfo.ID)
    var ID = e.currentTarget.dataset.gameInfo.ID
    let info = app.globalData.Game[ID-1]
    console.log(info)
    var gameInfoStr = encodeURIComponent(JSON.stringify(info))
    //把点击的游戏对象参数传递给游戏详情页面
    wx.navigateTo({
      url: '/pages/gameMarketProject/index/gameDetail/detail/detail?gameInfoStr=' + gameInfoStr
    })

  },

  //游戏详情页面
  goDetail(e) {
    console.log('GoDetail')
    // console.log(e)
    var gameInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.gameInfo))
    //把点击的游戏对象参数传递给游戏详情页面
    wx.navigateTo({
      url: '/pages/gameMarketProject/index/gameDetail/detail/detail?gameInfoStr=' + gameInfoStr
    })
  },

  async Onloading() {
    wx.showLoading({
      title: '加载中',
      mask: true //开启蒙版遮罩
    })
    console.log(app.globalData.User[0])
    console.log(app.globalData.User)
    let count = await db.collection('Games').count()
    count = count.total
    //console.log(count)
    let all = []
    for (let i = 0; i < count; i += 20) {
      let list = await db.collection('Games').skip(i).get()
      all = all.concat(list.data)
    }
    //console.log(all)
    app.globalData.Game = all
    //console.log(app.globalData.Game)
    this.setData({
      Is_game_got: true,
      gameInfo: all
    })
    wx.hideLoading()
  },

  async LoadTuijianList() {
    let TuijianList = []
    let Tuijian = []
    let count = await db.collection('Collect').where({
      User_ID: app.globalData.User[0].ID
    }).count()
    count = count.total
    console.log(count)
    if (count > 0) {
      let all = []
      for (let i = 0; i < count; i += 20) {
        let list = await db.collection('Collect').where({
          User_ID: app.globalData.User[0].ID
        }).skip(i).get()
        all = all.concat(list.data)
      }
      for (let i = 0; i < all.length; i++) {
        Tuijian[i] = app.globalData.Game[all[i].Game_ID - 1].Tag
      }
      count = 0
      for (var j = 0; j < Tuijian.length; j++) {
        for (let i = 0, n = 0; i < app.globalData.Game.length && n < 20; i++) {
          if (app.globalData.Game[i].Tag == Tuijian[j] && this.check(app.globalData.Game[i], TuijianList)) {
            TuijianList = TuijianList.concat(app.globalData.Game[i])
            n++
            count++
          }
        }
      }
      while (count < 60) {
        for (let i = 0; i < app.globalData.Game.length && count < 60; i++, count++) {
          if (this.check(app.globalData.Game[i], TuijianList)) {
            TuijianList = TuijianList.concat(app.globalData.Game[i])
          }
        }
      }
    } else {
      console.log("没有收藏")
      TuijianList = []
    }
    //console.log(TuijianList)
    //console.log(app.globalData.Game.length)
    this.setData({
      TuijianList: TuijianList
    })
  },

  check(item, list) {
    for (var i = 0; i < list.length; i++) {
      if (item == list[i]) {
        return false
      }
    }
    return true
  },

  async LoadHotChart() {
    let list = []
    let count = 0
    let game = new Array()
    for (var i = 0; i < app.globalData.Game.length; i++) {
      game[i] = app.globalData.Game[i]
    }
    for (var i = 0; i < game.length - 1; i++) {
      //确定轮数
      for (var j = 0; j < game.length - i - 1; j++) {
        //确定每次比较的次数
        if (game[j].Hits < game[j + 1].Hits) {
          var temgame = game[j]
          game[j] = game[j + 1]
          game[j + 1] = temgame
        }
      }
    }
    while (count < 60) {
      for (let i = 0; i < game.length && count < 60; i++, count++) {
        if (this.check(game[i], list)) {
          list = list.concat(game[i])
        }
      }
    }
    //console.log(list)
    this.setData({
      HotChart: list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 高度自适应
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth
        var calc = clientHeight * rpxR - 130
        that.setData({
          winHeight: calc
        })
      }
    })
    //是否需要填写个人信息
    if (options.FirstLogin) {
      wx.showModal({
        title: '注册成功',
        content: '请完善个人资料',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../person/personInfo/account/account'
            })
          } else if (res.cancel) {}
        }
      })
    }
    await this.Onloading()
    await this.LoadTuijianList()
    await this.LoadHotChart()
    this.setData({
      first: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    if (!this.data.first) {
      await this.LoadTuijianList()
      await this.LoadHotChart()
    }
  },

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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})