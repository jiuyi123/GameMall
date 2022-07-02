// var util = require('../../utils/util.js');
// var api = require('../../config/api.js');
var app = getApp()

Page({
  data: {
    /**侧边栏* */
    activeKey: 0,
    Show_list:[],
    //游戏列表
    Game_list: '',
    celueyouxi:[],
    disanrenchensheji:[],
    diyirenchensheji:[],
    dongzuojuese:[],
    dongzuoyouxi:[],
    gedouyouxi:[],
    jishizhanlue:[],
    juesebanyan:[],
    maoxianyouxi:[],
    monijingying:[],
    moniqilei:[],
    qitayouxi:[],
    saicheyouxi :[],
    shejiyouxi:[],
    tiyuyundong:[],
    wangluoyouxi:[],
    xiuxianyizhi:[],
    yangchengyouxi:[],
    yinyueyouxi:[],
    zhuomianqipai:[]
  },

  //游戏详情页面
  goDetail(e){
      console.log("GoDetail")
      var gameInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.gameInfo)) 
      //把点击的游戏对象参数传递给游戏详情页面
      wx.navigateTo({
        url:"/pages/gameMarketProject/index/gameDetail/detail/detail?gameInfoStr="+gameInfoStr,
      })
   },

  SortGame: function(){
    this.setData({
      Game_list: app.globalData.Game
    })
    var game;//当前读取的游戏对象
    for (var i = 0; i < this.data.Game_list.length; i++) {
      game = this.data.Game_list[i];
      if(game.Score == "null") continue;//没有打分直接跳过
      switch (game.Tag) {
        case "策略游戏":
          this.InsertGameToArray(game,this.data.celueyouxi);
          break;
        case "第三人称射击":
          this.InsertGameToArray(game,this.data.disanrenchensheji);
          break;
        case "第一人称射击":
          this.InsertGameToArray(game,this.data.diyirenchensheji);
          break;  
        case "动作角色":
          this.InsertGameToArray(game,this.data.dongzuojuese);
          break;    
        case "动作游戏":
          this.InsertGameToArray(game,this.data.dongzuoyouxi);
          break;
        case "格斗游戏":
          this.InsertGameToArray(game,this.data.gedouyouxi);
          break;
        case "即时战略":
          this.InsertGameToArray(game,this.data.jishizhanlue);
          break;
        case "角色扮演":
          this.InsertGameToArray(game,this.data.juesebanyan);
          break;
        case "冒险游戏":
          this.InsertGameToArray(game,this.data.maoxianyouxi);
          break;
        case "模拟经营":
          this.InsertGameToArray(game,this.data.monijingying);
          break;
        case "模拟器类":
          this.InsertGameToArray(game,this.data.moniqilei);
          break;
        case "其他游戏":
          this.InsertGameToArray(game,this.data.qitayouxi);
          break;
        case "赛车游戏":
          this.InsertGameToArray(game,this.data.saicheyouxi);
          break;
        case "射击游戏":
          this.InsertGameToArray(game,this.data.shejiyouxi);
          break;
        case "体育运动":
          this.InsertGameToArray(game,this.data.tiyuyundong);
          break;
        case "网络游戏":
          this.InsertGameToArray(game,this.data.wangluoyouxi);
          break;
        case "休闲益智":
          this.InsertGameToArray(game,this.data.xiuxianyizhi);
          break;
        case "养成游戏":
          this.InsertGameToArray(game,this.data.yangchengyouxi);
          break;
        case "音乐游戏":
          this.InsertGameToArray(game,this.data.yinyueyouxi);
          break;
        case "桌面棋牌":
          this.InsertGameToArray(game,this.data.zhuomianqipai);
          break;
        default:
          break;
      }
    }
  },
  
  //把当前读取到的游戏对象 从大到小 的方式插入到对应的游戏列表中
  InsertGameToArray: function(game,gamelist){
    var ListLength = 10;//列表长度限制
    //表满的情况
    if(gamelist.length == ListLength || gamelist.length == ListLength + 1){
      if(game.Score > gamelist[ListLength - 1].Score){//游戏得分大于列表中最低得分
        for(var i = 0; i < ListLength; i++){//寻找插入位置
          if(game.Score < gamelist[i].Score) continue;//没找到
          else{//找到,从当前要插入的位置向后顺移 
            var j = ListLength - 1;
            while(j >= i){//依次后移
              gamelist[j+1] = gamelist[j];
              j--;
            } 
            gamelist[i]=game;//找到的当前位置存放该游戏对象
            break;
          }
        }
      }
      return ;
    }
    //表空的情况
    if(gamelist.length == 0){
      gamelist[0] = game;
      return ;
    }
    //表非空且未满的情况
    if(game.Score > gamelist[gamelist.length - 1].Score){//游戏得分大于列表中最低得分
      for(var i = 0; i < gamelist.length; i++){//寻找插入位置
        if(game.Score < gamelist[i].Score) continue;//没找到
        else{//找到,从当前要插入的位置向后顺移 
          var j = gamelist.length - 1;
          while(j >= i){//依次后移
            gamelist[j+1] = gamelist[j];
            j--;
          } 
          gamelist[i]=game;//找到的当前位置存放该游戏对象
          break;
        }
      }
    }else{
      gamelist[gamelist.length] = game;
    }
  },

  onLoad: function (options) {
    this.SortGame();
    this.setData({
      celueyouxi:this.data.celueyouxi,
      disanrenchensheji:this.data.disanrenchensheji,
      dongzuojuese:this.data.dongzuojuese,
      dongzuoyouxi:this.data.dongzuoyouxi,
      gedouyouxi:this.data.gedouyouxi,
      jishizhanlue:this.data.jishizhanlue,
      juesebanyan:this.data.juesebanyan,
      maoxianyouxi:this.data.maoxianyouxi,
      monijingying:this.data.monijingying,
      moniqilei:this.data.moniqilei,
      saicheyouxi:this.data.saicheyouxi,
      shejiyouxi:this.data.shejiyouxi,
      tiyuyundong:this.data.tiyuyundong,
      wangluoyouxi:this.data.wangluoyouxi,
      xiuxianyizhi:this.data.xiuxianyizhi,
      yangchengyouxi:this.data.yangchengyouxi,
      yinyueyouxi:this.data.yinyueyouxi,
      zhuomianqipai:this.data.zhuomianqipai,
      qitayouxi:this.data.qitayouxi,
    })
    console.log(this.data.Game_list)
  },
  getCatalog: function () {
    let that = this;
    var navlist = this.data.navlist
    var currentCategory = this.data.currentCategory
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.CatalogList).then(function (res) {
      navlist = res.data.categoryList,
        currentCategory = res.data.currentCategory
      that.setData({
        navlist: navlist,
        currentCategory: currentCategory
      });
      console.log(res.data)
      wx.hideLoading();
      util.request(api.GoodsCount).then(function (res) {
        that.setData({
          goodsCount: res.data.goodsCount
        });
      })
    })
    util.request(api.GoodsDetail, {
      id: that.data.id
    }).then(function (res) {
      if (res.errno === 0) {
        //
        var priceArry = new Array;
        //把sku名称收集
        res.data.info.skuList.forEach(function (item) {
          that.data.skuNames.push(item.title);
          priceArry.push(item.skuInfo.price);
        });
        var max = Math.max.apply(Math, priceArry);
        var min = Math.min.apply(Math, priceArry);

        that.setData({
          skuNames: that.data.skuNames,
          priceRange: min + "-" + max
        })

        if (res.data.userHasCollect == 1) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }
        WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);
        that.getGoodsRelated();
      }
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  // getList: function () {
  //   var that = this;
  //   util.request(api.ApiRootUrl + 'api/catalog/' + that.data.currentCategory.cat_id)
  //     .then(function (res) {
  //       that.setData({
  //         categoryList: res.data,
  //       });
  //     });
  // },
  // switchCate: function (event) {
  //   var that = this;
  //   var currentTarget = event.currentTarget;
  //   if (this.data.currentCategory.id == event.currentTarget.dataset.id) {
  //     return false;
  //   }

  //   this.getCurrentCategory(event.currentTarget.dataset.id);
  // }
})