// pages/gameMarketProject/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    imgUrl: [
      'http://p1.music.126.net/RHDhAOnxZqGtjxjK2s49vg==/109951165466303909.jpg',
      'http://p1.music.126.net/nZtHrj-Wj76vGFn-0kBqaw==/109951165466309360.jpg',
      'http://p1.music.126.net/H1HiJsIq3cLPsfaDLtxRjw==/109951165466767053.jpg',
      'http://p1.music.126.net/oR_IMlwHAu1j0EwfoIVDYw==/109951165466745785.jpg',
      'http://p1.music.126.net/0jPrUkboZ-rFbzCArv-8aQ==/109951165466351711.jpg',
      'http://p1.music.126.net/Xs1sJ_Q3Top3Psv3qGVzmw==/109951165466227994.jpg'
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
        //轮播图
  imgGames: [
    {src:  'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgp-dev.cdn.bcebos.com%2Fgp-dev%2Fupload%2Ffile%2Fsource%2F55df338c08e931ee7e6452881485e953.jpeg&app=2000&size=f260,344&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=20b1a2b46873566e45f35feaa0f497af',
    name:"原神" },
    {src:   'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2Fec295c1d427e9bf483d30dcd82040067.jpeg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=4b309a9063a94e70b77e7638a3da833c"',
    name:"艾尔登法环" 
   },
    {src:   'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2Fd6dbddb2884f5ed2b002efb057f408d1%2Fd6dbddb2884f5ed2b002efb057f408d1.png&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=d767ecbd84fb025a1b124083b23a9200',
    name:"我的世界" },
    {src:   'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2F7df2c6aae86db3d24031fcdb8ac338bb.jpeg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=67fb378398fc0f561b6028aec4710cfd',
    name:"植物大战僵尸"},
    {src:   'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2F49e1a313497eb2169788bc858bc24836%2F49e1a313497eb2169788bc858bc24836.png&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=a61e67af407acc3e8c12648673c19143',
    name:"泰拉瑞亚"},
    {src:   'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2Fbcede38d0286bb5c5a9f2fbbd6c317d7%2Fbcede38d0286bb5c5a9f2fbbd6c317d7.jpg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=9da303772b3e095085630fccc60d04d8',
    name:"赛博朋克"},
    {src:   'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2F7fdafdec912bd8bfbbdc417118b0152b.jpeg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=c1b30cd7365c1c4c7f294423efb5981b',
    name:"方舟"},
    {src:   'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2Fba176ee5ea05babb2f6d8b23c5c191d4%2Fba176ee5ea05babb2f6d8b23c5c191d4.png&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=5bcfc85eda3d0c8a983f4da2ec0300c9',
    name:"使命召唤"}
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