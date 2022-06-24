// pages/gameMarketProject/index/gameDetail/detail/detail.js
var app = getApp();
var db = wx.cloud.database();
var gameInfoObj
var game_id

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gameInfoObj: {

    },
    /******信息页面数据*******/
    activeNames: ['1'], //折叠面板
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    /*************/
    is_ShouCang: false,
    is_GouWuChe: false,
    is_GouMai: false
  },
  /************************* */
  //折叠面板
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  /******************************* */
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
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
  // onLoad: function () {
  //   var that = this;

  // },
  footerTap: app.footerTap,



  /************************************* */
  Load(gameInfoObj) {
    gameInfoObj.numComment = 999
    gameInfoObj.score = 4.8
    gameInfoObj.comment = [{
        "userName": 1,
        "cmtData": "2021.04.01 14:08",
        "cmtScore": [0, 1, 2, 3],
        "cmtContent": "这个游戏太好玩了"
      },
      {
        "userName": 2,
        "cmtData": "2021.06.01 14:08",
        "cmtScore": [0, 2],
        "cmtContent": "还可以吧"
      },
      {
        "userName": 3,
        "cmtData": "2021.04.12 14:08",
        "cmtScore": [0, 1, 2],
        "cmtContent": "画风我爱了"
      },
      {
        "userName": 5,
        "cmtData": "2021.04.13 14:08",
        "cmtScore": [0, 1, 2, 4, 5],
        "cmtContent": "强烈推荐"
      },
      {
        "userName": 6,
        "cmtData": "2021.04.13 14:08",
        "cmtScore": [0, 1, 2, 4, 5],
        "cmtContent": "强烈推荐"
      },
      {
        "userName": 7,
        "cmtData": "2021.04.13 14:08",
        "cmtScore": [0, 1, 2, 4, 5],
        "cmtContent": "强烈推荐"
      }
    ]
    this.setData({
      gameInfoObj,
    })
    console.log(this.data.gameInfoObj)
    // 高度自适应
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 380;
        that.setData({
          winHeight: calc
        });
      }
    });
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
    var blank = ""
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = (myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1);
    var date = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
    var hour = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
    var min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
    var sec = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
    var myTime = blank.concat(year, "-", month, "-", date, " ", hour, ":", min, ":", sec);
    return myTime
  },

  async Is_ShouCang(game_id) {
    const res = await db.collection("Collect")
      .where({
        Game_ID: game_id,
        User_ID: app.globalData.User[0].ID
      })
      .get()
    if (res.data.length > 0) {
      this.setData({
        is_ShouCang: true
      })
    }
  },

  async Is_GouWuCheGouMai(game_id) {
    const res = await db.collection("Orders")
      .where({
        Game_ID: game_id,
        User_ID: app.globalData.User[0].ID
      })
      .get()
    if (res.data.length > 0 && res.data[0].State == "未支付") {
      this.setData({
        is_GouWuChe: true
      })
    } else if (res.data.length > 0 && res.data[0].State == "已支付") {
      this.setData({
        is_GouMai: true
      })
    }
  },

  async UpdateData() {
    var res = await db.collection("Games").where({
      ID: game_id
    }).get()
    console.log(res.data)
    db.collection("Games").doc(res.data[0]._id).update({
      data: {
        Hits: res.data[0].Hits + 1
      }
    })
    db.collection("Click").add({
      data: {
        Game_ID: game_id,
        Time: this.GetTime(),
        User_ID: app.globalData.User[0].ID
      }
    })
  },

  async ShouCang() {
    if (this.data.is_ShouCang) {
      var res = await db.collection("Collect").where({
        Game_ID: game_id,
        User_ID: app.globalData.User[0].ID
      }).get()
      db.collection("Collect").doc(res.data[0]._id).remove()
      this.setData({
        is_ShouCang: false
      })
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        duration: 1000
      })
    } else {
      db.collection("Collect").add({
        data: {
          Game_ID: game_id,
          Time: this.GetTime(),
          User_ID: app.globalData.User[0].ID
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

  async Goumai() {
    const res = await db.collection("Orders").where({
      Game_ID: game_id,
      User_ID: app.globalData.User[0].ID
    }).get()
    const that = this
    const data = await this.GetAlldb("Orders")
    if (this.data.is_GouMai == false) {
      wx.showModal({
        title: '确认',
        content: '是否购买此产品',
        success(r) {
          //如果用户点击了确定按钮
          if (r.confirm) {
            if (res.data.length > 0) { //记录存在说明在购物车内
              db.collection("Orders").doc(res.data[0]._id).update({
                data: {
                  State: "已支付",
                  Time: that.GetTime()
                }
              })
            } else { //记录不在购物车内
              db.collection("Orders")
                .add({
                  data: {
                    Final_price: gameInfoObj.Price,
                    Game_ID: game_id,
                    ID: data[data.length - 1].ID + 1,
                    State: "已支付",
                    Time: that.GetTime(),
                    User_ID: app.globalData.User[0].ID
                  },
                })
            }
            that.setData({
              is_GouMai: true
            })
          }
        }
      })
    }
  },

  async Gouwuche() { //函数内不允许添加await待测试
    const res = await db.collection("Orders").where({
      Game_ID: game_id,
      User_ID: app.globalData.User[0].ID
    }).get()
    const that = this
    const data = await this.GetAlldb("Orders")
    if (this.data.is_GouWuChe) {
      wx.showModal({
        title: '警告',
        content: '是否要将产品移除购物车',
        success(r) {
          //如果用户点击了确定按钮
          if (r.confirm) {
            db.collection("Orders").doc(res.data[0]._id).remove()
            that.setData({
              is_GouWuChe: false
            })
          }
        }
      })
    } else {
      db.collection("Orders")
        .add({
          data: {
            Final_price: gameInfoObj.Price,
            Game_ID: game_id,
            ID: data[data.length - 1].ID + 1,
            State: "未支付",
            Time: this.GetTime(),
            User_ID: app.globalData.User[0].ID
          },
        })
      this.setData({
        is_GouWuChe: true
      })
    }
  },
  /********************************************* */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // db.collection("Orders")
    //         .add({
    //           data:{
    //             Final_price:1,
    //             Game_ID:4,
    //             ID:2,
    //             State:"未支付",
    //             Time:this.GetTime(),
    //             User_ID:app.globalData.User[0].ID
    //           },
    //         })
    gameInfoObj = JSON.parse(decodeURIComponent(options.gameInfoStr))
    game_id = gameInfoObj.ID
    this.UpdateData()
    this.Load(gameInfoObj)
    await this.Is_ShouCang(game_id)
    await this.Is_GouWuCheGouMai(game_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("-----------onReady-----------")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("-----------onShow-----------")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("-----------onHide-----------")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("-----------onUnload-----------")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("-----------onPullDownRefresh-----------")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("-----------onReachBottom-----------")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("-----------onShareAppMessage-----------")
  }
})