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
    gameInfo: [{
        src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgp-dev.cdn.bcebos.com%2Fgp-dev%2Fupload%2Ffile%2Fsource%2F55df338c08e931ee7e6452881485e953.jpeg&app=2000&size=f260,344&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=20b1a2b46873566e45f35feaa0f497af',
        videoSrc: 'https://gp-dev.cdn.bcebos.com/gp-dev/upload/file/source/02175c1a3c029ad6c4120a87f3ab39dc.mp4',
        name: "原神"
      },
      {
        src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2Fec295c1d427e9bf483d30dcd82040067.jpeg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=4b309a9063a94e70b77e7638a3da833c"',
        videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/video/c2afa0dff0d46df50772017dbfe2310f/c2afa0dff0d46df50772017dbfe2310f.mp4',
        name: "艾尔登法环"
      },
      {
        src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2Fd6dbddb2884f5ed2b002efb057f408d1%2Fd6dbddb2884f5ed2b002efb057f408d1.png&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=d767ecbd84fb025a1b124083b23a9200',
        videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/source/5bbe1e3144d45212dd678c7e34b5e00e.mp4',
        name: "我的世界"
      },
      {
        src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2F7df2c6aae86db3d24031fcdb8ac338bb.jpeg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=67fb378398fc0f561b6028aec4710cfd',
        videoSrc: 'http://vd3.bdstatic.com/mda-kc7u0m8ec2crdhjp/v1-cae/sc/mda-kc7u0m8ec2crdhjp.mp4',
        name: "植物大战僵尸"
      },
      {
        src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2F49e1a313497eb2169788bc858bc24836%2F49e1a313497eb2169788bc858bc24836.png&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=a61e67af407acc3e8c12648673c19143',
        videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/source/faeffa9a2aa77a3254eab4af6f2d596e.mp4',
        name: "泰拉瑞亚"
      },
      {
        src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2Fbcede38d0286bb5c5a9f2fbbd6c317d7%2Fbcede38d0286bb5c5a9f2fbbd6c317d7.jpg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=9da303772b3e095085630fccc60d04d8',
        videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/source/fd60a32221be624ab52734a2a9a14e93.mp4',
        name: "赛博朋克"
      },
      {
        src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2F7fdafdec912bd8bfbbdc417118b0152b.jpeg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=c1b30cd7365c1c4c7f294423efb5981b',
        videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/source/5513c43b159f4834aeb0055e9db2402c.mp4',
        name: "方舟"
      },
      {
        src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2F6e56014c71f3967e631d8d060ad9a685%2F6e56014c71f3967e631d8d060ad9a685.png&app=2000&size=f0,0&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=5dc6960710545e73f91256ff6bb47872',
        videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/video/8290d51e6d509b9c574adc4e7e7130d0/8290d51e6d509b9c574adc4e7e7130d0.mp4',
        name: "人类一败涂地"
      }
    ],
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
    let all = []
    for(let i = 0; i < count; i += 20){
      let list = await db.collection("Games").skip(i).get()
      all = all.concat(list.data)
    }
    app.globalData.Game = all;
    //console.log(app.globalData.Game)
    this.setData({
      Is_game_got:true
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