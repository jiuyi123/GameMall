// pages/gameMarketProject/index/gameDetail/detail/detail.js
var app = getApp()
var db = wx.cloud.database()
var gameInfoObj
var game_id

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Video_linklist: [
      "https://vd2.bdstatic.com/mda-kg7n1zwrxjfr3x7i/v1-cae/sc/mda-kg7n1zwrxjfr3x7i.mp4",
      "https://vd2.bdstatic.com/mda-kh3ntpac8va2r6ue/sc/mda-kh3ntpac8va2r6ue.mp4",
      "https://vd3.bdstatic.com/mda-ma6g1x52ms3y33nx/v1-cae/sc/mda-ma6g1x52ms3y33nx.mp4"
    ],

    gameInfoObj: {},
    /******评论弹窗****/
    scoreShow: 0, //打分弹窗
    commentScore: '',
    commentContent: '',
    /*******购买弹窗*******/
    radio: '1', //单选框
    checked: false, //复选框
    Buying: false,
    PayWay: 0, //购买方式 0:余额购买 1-n：其他方式
    commentList: [], //评论列表
    /******信息页面数据*******/
    activeNames: ['1'], //折叠面板
    winHeight: '', //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    /*************/
    is_ShouCang: false,
    is_GouWuChe: false,
    is_GouMai: false,
    UserInfo: ''
  },
  /***视频出错处理*** */
  playError() {
    let list = this.data.gameInfoObj
    list.Video_link = this.data.Video_linklist[Math.ceil(Math.random()*3-1)]
      this.setData({
        gameInfoObj: list
      })
    // wx.showToast({
    //   title: '暂时无法播放',
    //   icon: "error",
    //   duration: 1000
    // })
  },
  /********评论弹窗********** */
  comment() {
    this.setData({
      scoreShow: !this.data.scoreShow
    })
  },
  onCommentClose() {
    this.setData({
      scoreShow: false
    })
  },
  onCommentChange(event) {
    this.setData({
      commentScore: event.detail
    })
  },
  //评论框
  bindSearchContent: function (e) {
    this.setData({
      commentContent: e.detail
    })
  },
  /****************购买弹窗****************/
  onChangeCheckbox(event) {
    this.setData({
      checked: event.detail
    })
  },
  onChangeRadio(event) {
    this.setData({
      PayWay: event.detail
    })
  },
  buyPop() {
    this.setData({
      Buying: true
    })
  },
  onClose() {
    this.setData({
      Buying: false
    })
  },
  onGetUserInfo(e) {
    console.log(e.detail)
  },
  /**************游戏简介等折叠面板************/
  onChange(event) {
    this.setData({
      activeNames: event.detail
    })
  },
  /**************中部标签设计***************** */
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    })
    this.checkCor()
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current
    if (this.data.currentTaB == cur) {
      return false
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  footerTap: app.footerTap,
  /************************************* */
  Load(gameInfoObj) {
    this.setData({
      gameInfoObj
    })
    console.log(this.data.gameInfoObj)
    // 高度自适应
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth
        var calc = clientHeight * rpxR - 380
        that.setData({
          winHeight: calc
        })
      }
    })
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

  async Is_ShouCang(game_id) {
    const res = await db
      .collection('Collect')
      .where({
        Game_ID: game_id,
        User_ID: this.data.User.ID
      })
      .get()
    if (res.data.length > 0) {
      this.setData({
        is_ShouCang: true
      })
    }
  },

  async Is_GouWuCheGouMai(game_id) {
    const res = await db
      .collection('Orders')
      .where({
        Game_ID: game_id,
        User_ID: this.data.User.ID
      })
      .get()
    if (res.data.length > 0 && res.data[0].State == '未支付') {
      this.setData({
        is_GouWuChe: true
      })
    } else if (res.data.length > 0 && res.data[0].State == '已支付') {
      this.setData({
        is_GouMai: true
      })
    }
  },

  async UpdateData() {
    var res = await db
      .collection('Games')
      .where({
        ID: game_id
      })
      .get()
    console.log(res.data)
    db.collection('Games')
      .doc(res.data[0]._id)
      .update({
        data: {
          Hits: res.data[0].Hits + 1
        }
      })
    db.collection('Click').add({
      data: {
        Game_ID: game_id,
        Time: this.GetTime(),
        User_ID: this.data.User.ID
      }
    })
  },

  async ShouCang() {
    if (this.data.is_ShouCang) {
      var res = await db
        .collection('Collect')
        .where({
          Game_ID: game_id,
          User_ID: this.data.User.ID
        })
        .get()
      db.collection('Collect').doc(res.data[0]._id).remove()
      this.setData({
        is_ShouCang: false
      })
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        duration: 1000
      })
    } else {
      db.collection('Collect').add({
        data: {
          Game_ID: game_id,
          Time: this.GetTime(),
          User_ID: this.data.User.ID
        }
      })
      this.setData({
        is_ShouCang: true
      })
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        duration: 1000
      })
    }
  },

  async Gouwuche() {
    //函数内不允许添加await待测试
    const res = await db
      .collection('Orders')
      .where({
        Game_ID: game_id,
        User_ID: this.data.User.ID
      })
      .get()
    const that = this
    const data = await this.GetAlldb('Orders')
    if (this.data.is_GouWuChe) {
      wx.showModal({
        title: '警告',
        content: '是否要将产品移除购物车',
        success(r) {
          //如果用户点击了确定按钮
          if (r.confirm) {
            db.collection('Orders').doc(res.data[0]._id).remove()
            that.setData({
              is_GouWuChe: false
            })
          }
        }
      })
    } else {
      db.collection('Orders').add({
        data: {
          Final_price: gameInfoObj.Price,
          Game_ID: game_id,
          ID: data[data.length - 1].ID + 1,
          State: '未支付',
          Time: this.GetTime(),
          User_ID: this.data.User.ID
        }
      })
      this.setData({
        is_GouWuChe: true
      })
    }
  },

  async Goumai() {
    const res = await db
      .collection('Orders')
      .where({
        Game_ID: game_id,
        User_ID: this.data.User.ID
      })
      .get()
    const that = this
    const data = await this.GetAlldb('Orders')
    if (this.data.is_GouMai == false) {
      wx.showModal({
        title: '确认',
        content: '是否购买此产品',
        success(r) {
          //如果用户点击了确定按钮
          if (r.confirm) {
            if (res.data.length > 0) {
              //记录存在说明在购物车内
              db.collection('Orders')
                .doc(res.data[0]._id)
                .update({
                  data: {
                    State: '已支付',
                    Time: that.GetTime()
                  }
                })
            } else {
              //记录不在购物车内
              db.collection('Orders').add({
                data: {
                  Final_price: gameInfoObj.Price,
                  Game_ID: game_id,
                  ID: data[data.length - 1].ID + 1,
                  State: '已支付',
                  Time: that.GetTime(),
                  User_ID: this.data.User.ID
                }
              })
            }
            that.setData({
              is_GouMai: true
            })
            //  this.onClose()
            //  wx.showToast({
            //    title: '购买成功',
            //    duration:1000
            //  })
          }
        }
      })
    }
  },

  async WantBuy() {
    this.setData({
      WantBuy: true
    })
    console.log(this.data.PayWay)
    if (this.data.PayWay == 0) {
      //余额支付
      wx.showLoading({
        title: '加载中',
        mask: true //开启蒙版遮罩
      })
      if (this.data.User.Balance > this.data.gameInfoObj.Price) {
        //修改数据库User
        var res = await db
          .collection('Users')
          .where({
            ID: this.data.User.ID
          })
          .get()
        await db
          .collection('Users')
          .doc(res.data[0]._id)
          .update({
            data: {
              Balance: this.data.User.Balance - this.data.gameInfoObj.Price
            }
          })
        res = await db
          .collection('Users')
          .where({
            ID: this.data.User.ID
          })
          .get()
        app.globalData.User = res.data
        console.log(res.data)

        let res1 = await db.collection("Orders").where({
          Game_ID: game_id,
          User_ID: this.data.User.ID,
          State: '未支付'
        }).get()
        if (res1.data.length > 0) {
          await db.collection("Orders").doc(res1.data[0]._id).remove()
        }
        //增加一条订单
        const data = await this.GetAlldb('Orders')
        db.collection('Orders').add({
          data: {
            Final_price: gameInfoObj.Price,
            Game_ID: game_id,
            ID: data[data.length - 1].ID + 1,
            State: '已支付',
            Time: this.GetTime(),
            User_ID: this.data.User.ID
          }
        })
        this.setData({
          is_GouMai: true
        })
        wx.showToast({
          title: '购买成功'
        })
      } else {
        //余额不足
        wx.showToast({
          title: '余额不足',
          icon: 'error'
        })
      }
    } else {
      wx.showLoading({
        title: '加载中',
        mask: true //开启蒙版遮罩
      })
      let res1 = await db.collection("Orders").where({
        Game_ID: game_id,
        User_ID: this.data.User.ID,
        State: '未支付'
      }).get()
      if (res1.data.length > 0) {
        await db.collection("Orders").doc(res1.data[0]._id).remove()
      }
      //增加一条订单
      const data = await this.GetAlldb('Orders')
      db.collection('Orders').add({
        data: {
          Final_price: gameInfoObj.Price,
          Game_ID: game_id,
          ID: data[data.length - 1].ID + 1,
          State: '已支付',
          Time: this.GetTime(),
          User_ID: this.data.User.ID
        }
      })
      this.setData({
        is_GouMai: true
      })
      wx.showToast({
        title: '购买成功'
      })
    }
    console.log(this.data.PayWay )
    wx.hideLoading()
    if(this.data.PayWay == 2)
    {
      wx.showToast({
        title: '微信支付成功',
        image:"../../../../../images/pay/微信支付.jpg",
        duration:2000
      })
    }
    else if(this.data.PayWay == 3){
      wx.showToast({
        title: '支付宝支付成功',
        image:"../../../../../images/pay/支付宝.jpg",
        duration:2000
      })
    }

    this.BuyClose()
  },

  BuyClose: function () {
    this.setData({
      Buying: false
    })
  },
  //向数据库中写入评价
  WriteEvaluation: async function () {
    let content = this.data.commentContent.value
    let score = this.data.commentScore * 2
    let list = this.data.commentList
    console.log(content)
    console.log(score)
    const cmt = await this.GetAlldb('Comments')
    db.collection('Comments').add({
      data: {
        Content: content,
        Game_ID: game_id,
        ID: cmt[cmt.length - 1].ID + 1,
        Score: score,
        Time: this.GetTime(),
        User_ID: this.data.User.ID
      }
    })
    list[list.length] = {
      Comment: {
        Content: content,
        Game_ID: game_id,
        ID: cmt[cmt.length - 1].ID + 1,
        Score: score,
        Time: this.GetTime(),
        User_ID: this.data.User.ID
      },
      User: app.globalData.User[0],
      is_Like: false,
      LikeNum: 0
    }
    this.CommentSortByTime(list)
    this.setData({
      commentList: list
    })
    wx.showToast({
      title: '发表成功',
      icon: 'success'
    })
    this.onCommentClose()
  },
  //读取数据库中游戏的评论
  GetComment: async function (game_id) {
    var list = new Array()
    const cmt = await this.GetAlldb('Comments')
    const usr = await this.GetAlldb('Users')
    var j
    for (var i = 0; i < cmt.length; i++) {
      if (cmt[i].Game_ID == game_id) {
        for (j = 0; j < usr.length; j++) {
          if (usr[j].ID == cmt[i].User_ID) break
        }
        list[list.length] = {
          Comment: cmt[i],
          User: usr[j]
        }
      }
    }
    list = this.CommentSortByTime(list) //时间顺序排序
    this.setData({
      commentList: list
    })
  },

  CommentSortByTime: function (arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      //确定轮数
      for (var j = 0; j < arr.length - i - 1; j++) {
        //确定每次比较的次数
        if (arr[j].Comment.Time < arr[j + 1].Comment.Time) {
          var tem = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = tem
        }
      }
    }
    return arr
  },

  /********************************************* */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true //开启蒙版遮罩
    })
    gameInfoObj = JSON.parse(decodeURIComponent(options.gameInfoStr))
    game_id = gameInfoObj.ID
    this.UpdateData()
    this.Load(gameInfoObj)
  },

  async GetLike() {
    let list = this.data.commentList
    for (let i = 0; i < list.length; i++) {
      let res = await db
        .collection('Likes')
        .where({
          User_ID: this.data.User.ID,
          Evaluation_ID: list[i].Comment.ID
        })
        .get()
      if (res.data.length > 0) {
        list[i].is_Like = true
      } else {
        list[i].is_Like = false
      }
      let count = await db
        .collection('Likes')
        .where({
          Evaluation_ID: list[i].Comment.ID
        })
        .count()
      count = count.total
      list[i].LikeNum = count
    }
    this.setData({
      commentList: list
    })
    console.log(list)
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

  async Like(e) {
    //console.log(e.currentTarget.dataset.commentInfo.Comment.ID)
    let Commentid = e.currentTarget.dataset.commentInfo.Comment.ID
    let list = this.data.commentList
    let i
    for (i = 0; i < list.length; i++) {
      if (list[i].Comment.ID == Commentid) {
        break
      }
    }
    if (list[i].is_Like) {
      list[i].is_Like = false
      list[i].LikeNum--
      let res = await db
        .collection('Likes')
        .where({
          User_ID: this.data.User.ID,
          Evaluation_ID: list[i].Comment.ID
        })
        .get()
      db.collection('Likes').doc(res.data[0]._id).remove()
    } else {
      list[i].is_Like = true
      list[i].LikeNum++
      db.collection('Likes').add({
        data: {
          User_ID: this.data.User.ID,
          Evaluation_ID: list[i].Comment.ID,
          Time: this.GetTime(),
          State: '未读'
        }
      })
    }
    this.setData({
      commentList: list
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function (options) {
    console.log('-----------onReady-----------')
    this.setData({
      User: app.globalData.User[0]
    })
    console.log(app.globalData.User[0])
    await this.Is_ShouCang(game_id)
    await this.Is_GouWuCheGouMai(game_id)
    //await this.WantBuy()
    //await this.WriteEvaluation("戏风格独特",8.8,4)
    await this.GetComment(gameInfoObj.ID)
    await this.GetLike()
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('-----------onShow-----------')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('-----------onHide-----------')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('-----------onUnload-----------')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('-----------onPullDownRefresh-----------')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('-----------onReachBottom-----------')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('-----------onShareAppMessage-----------')
  }
})