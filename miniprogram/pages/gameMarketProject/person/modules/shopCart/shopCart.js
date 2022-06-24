const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsNum:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Show_list:'',
    slideProductList: [
      {
        id:1,
        name: '原神',
        src: "https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgp-dev.cdn.bcebos.com%2Fgp-dev%2Fupload%2Ffile%2Fsource%2F55df338c08e931ee7e6452881485e953.jpeg&app=2000&size=f260,344&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=20b1a2b46873566e45f35feaa0f497af",
        videoSrc: 'https://gp-dev.cdn.bcebos.com/gp-dev/upload/file/source/02175c1a3c029ad6c4120a87f3ab39dc.mp4',
           
        style: "RGB 角色扮演 养成",
        Price: "149.5",
        select: "circle",
        num: "1",
        code: "0001",
        amount: 500
      },
      {
        id: 2,
        name: "艾尔登法环",
        src: "https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2Fec295c1d427e9bf483d30dcd82040067.jpeg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=4b309a9063a94e70b77e7638a3da833c",
        videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/video/c2afa0dff0d46df50772017dbfe2310f/c2afa0dff0d46df50772017dbfe2310f.mp4',
        style: "动作 冒险 剧情",
        Price: "488",
        select: "circle",
        code: "0002",
        num: "1",
        amount: 500
      },
      {
        id: 3,
        name: "我的世界",
        src: "https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2Fd6dbddb2884f5ed2b002efb057f408d1%2Fd6dbddb2884f5ed2b002efb057f408d1.png&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=d767ecbd84fb025a1b124083b23a9200",
        videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/source/5bbe1e3144d45212dd678c7e34b5e00e.mp4',
        style: "养成 建造 像素",
        Price: "88",
        select: "circle",
        code: "0003",
        num: "1",
        amount: 110
      },
      {
        id: 4,
        code: "0001",
        name: "植物大战僵尸",
        src: "https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2F7df2c6aae86db3d24031fcdb8ac338bb.jpeg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=67fb378398fc0f561b6028aec4710cfd",
        videoSrc: 'http://vd3.bdstatic.com/mda-kc7u0m8ec2crdhjp/v1-cae/sc/mda-kc7u0m8ec2crdhjp.mp4',
        style: "射击 策略",
        Price: "29",
        select: "circle",
        code: "0004",
        num: "1",
        amount: 200
      },
      {
        id: 5,
        code: "0001",
        name: "赛博朋克",
        src: "https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2Fbcede38d0286bb5c5a9f2fbbd6c317d7%2Fbcede38d0286bb5c5a9f2fbbd6c317d7.jpg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=9da303772b3e095085630fccc60d04d8",
        videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/source/fd60a32221be624ab52734a2a9a14e93.mp4',
        style: "都市 剧情 科幻",
        Price: "399",
        select: "circle",
        code: "0004",
        num: "1",
        amount: 200
      },
      {
        id: 6,
        code: "0001",
        name: "人类一败涂地",
        src: "https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2F6e56014c71f3967e631d8d060ad9a685%2F6e56014c71f3967e631d8d060ad9a685.png&app=2000&size=f0,0&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=5dc6960710545e73f91256ff6bb47872",
        videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/video/8290d51e6d509b9c574adc4e7e7130d0/8290d51e6d509b9c574adc4e7e7130d0.mp4',
        style: "多人 配合 冒险",
        Price: "188",
        select: "circle",
        code: "0004",
        num: "1",
        amount: 200
      },
    ],
    allSelect: "circle",
    num: 0,
    count: 0,
    lastX: 0,
    lastY: 0,
    text: "没有滑动",
  },
 //游戏详情页面
 goDetail(e){
  console.log("GoDetail")
  console.log(e)
  var gameInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.gameInfo)) 
  //把点击的游戏对象参数传递给游戏详情页面
  wx.navigateTo({
    url:"/pages/gameMarketProject/index/gameDetail/detail/detail?gameInfoStr="+gameInfoStr,
  })
},

  change: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var select = e.currentTarget.dataset.select

    if (select == "circle") {
      var stype = "success"
    } else {
      var stype = "circle"
    }
    var newList = that.data.Show_list
    newList[index].select = stype
    that.setData({
      Show_list: newList
    })
    that.countNum()
    that.count()
  },
  addtion: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var num = e.currentTarget.dataset.num
    //默认99件
    if (num < 99) {
      num++
    }
    var newList = that.data.Show_list
    newList[index].num = num
    that.setData({
      goodsNum:num,
      Show_list: newList
    })
    that.countNum()
    that.count()
  },
  inputNum:function(e){
    var num = e.detail.value;
    this.setData({
      goodsNum:num
    })
  },
  numIputBlur:function(e){
    var that = this
    var num = that.data.goodsNum
    var index = e.currentTarget.dataset.index
    var newList = that.data.Show_list
    if (num == "") { //盘空
      newList[index].num = 1;
      that.setData({
        Show_list: newList
      })
    }else if (num < 1) {
      that.setData({
        goodsNum: newList[index].num,
        Show_list: newList
      })
      wx.showToast({
        title: '亲，该宝贝不能减少了哦~',
        icon: 'none'
      })
    }else if(num>99){
      
      that.setData({
        goodsNum: newList[index].num,
        Show_list: newList
      })
      wx.showToast({
        title: '亲，该宝贝最多购买99件哦~',
        icon: 'none'
      })
    }else{
      newList[index].num = num;
      that.setData({
        Show_list: newList
      })
    }
    that.countNum()
    that.count()
  },
  //减法
  subtraction: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var num = e.currentTarget.dataset.num
    var newList = that.data.Show_list
    
    if (num == 1) {//当数量为1件时，再次点击移除该商品
      newList.splice(index, 1)
    } else {
      num--
      newList[index].num = num
    }
    that.setData({
      goodsNum: num,
      Show_list: newList
    })
    that.countNum()
    that.count()
  },
  //全选
  allSelect: function (e) {
    var that = this
    var allSelect = e.currentTarget.dataset.select //先判断是否选中
    var newList = that.data.Show_list
    console.log(newList)
    if (allSelect == "circle") {
      for (var i = 0; i < newList.length; i++) {
        newList[i].select = "success"
      }
      var select = "success"
    } else {
      for (var i = 0; i < newList.length; i++) {
        newList[i].select = "circle"
      }
      var select = "circle"
    }
    that.setData({
      Show_list: newList,
      allSelect: select
    })
    that.countNum()
    that.count()
  },
 
  countNum: function () { //计算数量
    var that = this
    var newList = that.data.Show_list
    var allNum = 0
    for (var i = 0; i < newList.length; i++) {
      if (newList[i].select == "success") {
        allNum += parseInt(newList[i].num)
      }
    }
    parseInt
    that.setData({
      num: allNum
    })
  },
  
  count: function () {//计算金额方法
    var that = this
    var newList = that.data.Show_list
    var newCount = 0
    for (var i = 0; i < newList.length; i++) {
      if (newList[i].select == "success") {
        newCount += newList[i].num * newList[i].Price
      }
    }
    that.setData({
      count: newCount
    })
  },

  async LoadInfo(){
    let count = await db.collection("Orders").where({      User_ID:app.globalData.User[0].ID,
      State:"未支付"}).count()
    count = count.total
    let all = []
    for(let i = 0; i < count; i += 20){
      let list = await db.collection("Orders").where({      User_ID:app.globalData.User[0].ID,
        State:"未支付"}).skip(i).get()
      all = all.concat(list.data)
    }
    var gamelist = new Array
    for(let i = 0; i < all.length; i++){
      app.globalData.Game[all[i].Game_ID-1].select = "circle",
      app.globalData.Game[all[i].Game_ID-1].num = 1,
      gamelist = gamelist.concat(app.globalData.Game[all[i].Game_ID-1])
    }
    this.setData({
      Show_list:gamelist
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var width=wx.getSystemInfoSync().windowWidth
    var height=wx.getSystemInfoSync().windowHeight
    height=height-55-53;
    this.setData({
      height:height
    })
    await this.LoadInfo()
    console.log(this.data.Show_list)
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
