// var util = require('../../utils/util.js');
// var api = require('../../config/api.js');
var app = getApp()

Page({
  data: {
    navlist: [{
        "name": "所有",
        "id": 0,
        "subCategoryList": [{
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

      {
        "name": "动作",
        "id": 1,
        "subCategoryList": [{
            src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgp-dev.cdn.bcebos.com%2Fgp-dev%2Fupload%2Ffile%2Fsource%2F55df338c08e931ee7e6452881485e953.jpeg&app=2000&size=f260,344&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=20b1a2b46873566e45f35feaa0f497af',
            videoSrc: 'https://gp-dev.cdn.bcebos.com/gp-dev/upload/file/source/02175c1a3c029ad6c4120a87f3ab39dc.mp4',
            name: "原神"
          },
          {
            src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2Fec295c1d427e9bf483d30dcd82040067.jpeg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=4b309a9063a94e70b77e7638a3da833c"',
            videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/video/c2afa0dff0d46df50772017dbfe2310f/c2afa0dff0d46df50772017dbfe2310f.mp4',
            name: "艾尔登法环"
          },
        ],
      },

      {
        "name": "解密",
        "id": 2,
        "subCategoryList": [{
            src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2F49e1a313497eb2169788bc858bc24836%2F49e1a313497eb2169788bc858bc24836.png&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=a61e67af407acc3e8c12648673c19143',
            videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/source/faeffa9a2aa77a3254eab4af6f2d596e.mp4',
            name: "泰拉瑞亚"
          },
          {
            src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2F6e56014c71f3967e631d8d060ad9a685%2F6e56014c71f3967e631d8d060ad9a685.png&app=2000&size=f0,0&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=5dc6960710545e73f91256ff6bb47872',
            videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/video/8290d51e6d509b9c574adc4e7e7130d0/8290d51e6d509b9c574adc4e7e7130d0.mp4',
            name: "人类一败涂地"
          },
          {
            src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2Fec295c1d427e9bf483d30dcd82040067.jpeg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=4b309a9063a94e70b77e7638a3da833c"',
            videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/video/c2afa0dff0d46df50772017dbfe2310f/c2afa0dff0d46df50772017dbfe2310f.mp4',
            name: "艾尔登法环"
          },
        ],
      },

      {
        "name": "体育",
        "id": 3,
        "subCategoryList": [{
          src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2Fbcede38d0286bb5c5a9f2fbbd6c317d7%2Fbcede38d0286bb5c5a9f2fbbd6c317d7.jpg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=9da303772b3e095085630fccc60d04d8',
          videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/source/fd60a32221be624ab52734a2a9a14e93.mp4',
          name: "赛博朋克"
        }, ],
      },

      {
        "name": "策略",
        "id": 4,
        "subCategoryList": [{
            src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgp-dev.cdn.bcebos.com%2Fgp-dev%2Fupload%2Ffile%2Fsource%2F55df338c08e931ee7e6452881485e953.jpeg&app=2000&size=f260,344&n=0&g=0n&q=85&fmt=jpeg?sec=0&t=20b1a2b46873566e45f35feaa0f497af',
            videoSrc: 'https://gp-dev.cdn.bcebos.com/gp-dev/upload/file/source/02175c1a3c029ad6c4120a87f3ab39dc.mp4',
            name: "原神"
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
            src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2Fec295c1d427e9bf483d30dcd82040067.jpeg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=4b309a9063a94e70b77e7638a3da833c"',
            videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/video/c2afa0dff0d46df50772017dbfe2310f/c2afa0dff0d46df50772017dbfe2310f.mp4',
            name: "艾尔登法环"
          },
        ],
      },

      {
        "name": "休闲",
        "id": 5,
        "subCategoryList": [{
            src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fimg%2Fd6dbddb2884f5ed2b002efb057f408d1%2Fd6dbddb2884f5ed2b002efb057f408d1.png&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=d767ecbd84fb025a1b124083b23a9200',
            videoSrc: 'https://gameplus-platform.cdn.bcebos.com/gameplus-platform/upload/file/source/5bbe1e3144d45212dd678c7e34b5e00e.mp4',
            name: "我的世界"
          },
          {
            src: 'https://gimg0.baidu.com/gimg/src=https%3A%2F%2Fgameplus-platform.cdn.bcebos.com%2Fgameplus-platform%2Fupload%2Ffile%2Fsource%2F7df2c6aae86db3d24031fcdb8ac338bb.jpeg&app=2000&size=b272_153&n=0&g=4n&q=70&fmt=auto?sec=0&t=67fb378398fc0f561b6028aec4710cfd',
            videoSrc: 'http://vd3.bdstatic.com/mda-kc7u0m8ec2crdhjp/v1-cae/sc/mda-kc7u0m8ec2crdhjp.mp4',
            name: "植物大战僵尸"
          },
        ],
      },
    ],
    id: 0,
    str: 0,
    skuNames: [],
    disableList: [], // 标记规格中的不可选元素
    skuInfo: {},
    selected: [],
    catalog: true,
    categoryList: [],
    currentCategory: {},
    // scrollLeft: 0,
    list: 0,
    // scrollTop: 0,
    goodsCount: 0,
    strlist: [],
    pslist: {},
    scrolltop: 0,
    flavor: '',
    heightArray: '900'
  },

    //游戏详情页面
    goDetail(e){
      console.log("GoDetail")
      // console.log(e)
      // console.log("-----------------")
      // console.log(e.currentTarget.dataset)
      // console.log("-----------------")
      // console.log("----------e-------")
      // console.log(e)
      // console.log("----------e.currentTarget-------")
      // console.log(e.currentTarget)
      // console.log("----------e.currentTarget.dataset-------")
      // console.log(e.currentTarget.dataset)
      // console.log("----------e.currentTarget.dataset.gameInfo-------")
      // console.log(e.currentTarget.dataset.gameInfo)
      // console.log("----------e.currentTarget.dataset.gameInfo.value-------")
      // console.log(e.currentTarget.dataset.gameInfo.name)
      // console.log(e.currentTarget.dataset.gameInfo.src)

      var gameInfoStr = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.gameInfo)) 
      //把点击的游戏对象参数传递给游戏详情页面
      wx.navigateTo({
        url:"/pages/gameMarketProject/index/gameDetail/detail/detail?gameInfoStr="+gameInfoStr,
      })
    },


  onLoad: function (options) {
    // var id = this.data.id
    this.getCurrentCategory(0);
    // this.getCatalog();
    // id.forEach((item, index) => {
    //   console.log(item)
    // })
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
  checkedTap(e) {
    var disable = e.currentTarget.dataset.disable; // 是否可选
    if (disable != null && !disable) return;
    var that = this;

    var goods = that.data.goods;
    var titleIdx = e.currentTarget.dataset.titleidx; // 规格组名称下标
    var detialIdx = e.currentTarget.dataset.detailidx; // 规格明细下标
    goods.specList[titleIdx].chooseSku = detialIdx; // 设置选中的规格明细下标到字段chooseSku

    var detailName = e.currentTarget.dataset.detailname; // 选中的规格名称
    that.data.selected[titleIdx] = detailName;
    // 
    var spec0 = goods.specList[0];
    var spec1 = goods.specList[1];

    // 封装 sku的可选控制 数组
    var obj0 = [];
    var obj1 = [];
    that.data.disableList.length = 0; // 清空不可选元素disableList的集合

    // 判断是否是两个规格以上的
    if (that.data.goods.specList.length < 2) {
      spec0.detail.forEach(function (item) {
        var isInclude = that.data.skuNames.some(function (_item) {
          return item == _item;
        });
        obj1.push(isInclude);
        // 清空已选
        if (!isInclude) {
          if (that.data.selected[0] == item) {
            that.data.selected[0] = "";
            that.data.goods.specList[0].chooseSku = null;
          }
        }
      })
    } else {
      switch (titleIdx) {
        case 0: // 选中的是第一个规格
          // 计算规格元素的可选
          spec1.detail.forEach(function (item) {
            var titleStr = detailName + "_" + item;
            // 判断当前组合是否存在skuNames中
            var isInclude = that.data.skuNames.some(function (item) {
              return item == titleStr;
            });
            obj1.push(isInclude);
            // 清空已选
            if (!isInclude) {
              if (that.data.selected[1] == item) {
                that.data.selected[1] = "";
                that.data.goods.specList[1].chooseSku = null;
              }
            }
          });
          break;
        case 1:
          // 选中的是第二个规格
          spec0.detail.forEach(function (item) {
            var titleStr = item + "_" + detailName;
            // 判断当前组合是否存在skuNames中
            var isInclude = that.data.skuNames.some(function (item) {
              return item == titleStr;
            })
            // 清空已选
            if (!isInclude) {
              if (that.data.selected[0] == item) {
                that.data.selected[0] = "";
                that.data.goods.specList[0].chooseSku = null;
              }
            }
            obj0.push(isInclude);
          });
          break;
      }
    }
    that.data.disableList.push(obj0);
    that.data.disableList.push(obj1);

    that.setData({
      goods: goods,
      disableList: that.data.disableList,
      selected: that.data.selected
    });
    that.renderSkuInfo();
  },
  // 渲染页面上sku的价格信息
  renderSkuInfo: function () {
    var skuName = this.data.selected.join("_");
    var skuInfo = {};
    this.data.goods.skuList.forEach(function (item) {
      if (item.title == skuName) {
        skuInfo = item.skuInfo;
      }
    })
    this.setData({
      skuInfo: skuInfo
    });
  },
  getCurrentCategory: function (index) {
    let that = this;
    var currentCategory = this.data.navlist[index]
    var id = 0
    console.log("--------getCurrentCategory--------")
    console.log(index)

    this.setData({
      currentCategory: currentCategory
    });
    // wx.getStorage({
    //   key: 'dj',
    //   success: function(res) {
    //     id = res.data
    //     util.request(api.CatalogCurrent, {
    //         id: id
    //       })
    //       .then(function(res) {
    //         currentCategory = res.data.currentCategory
    //         that.setData({
    //           currentCategory: currentCategory
    //         });
    //       });
    //   },
    // })
  },
  cartTap(e) {
    var that = this;
    if (this.data.showModalStatus === false) {
      this.data.showModalStatus = true
    } else {
      this.data.showModalStatus = false
    }
    that.setData({
      showModalStatus: this.data.showModalStatus
    })
  },
  cartsTap() {
    var that = this;
    var price = this.data.skuInfo.price
    var skuName = this.data.selected.join("_");
    if (price !== undefined) {
      util.request(api.CartAdd, {
          goodsId: this.data.goods.id,
          number: this.data.number,
          skuName: skuName
        }, 'POST', 'application/json')
        .then((res) => {
          let _res = res
          if (_res.errno == 0) {
            wx.showToast({
              title: '添加成功',
            })
          }
          console.log(_res)
        })
      this.data.showModalStatus = false
      that.setData({
        showModalStatus: this.data.showModalStatus
      })
    } else {
      wx.showToast({
        title: '请选择好规格',
      })
    }
  },
  // lower(e) {
  //   var that = this;
  //   var id = this.data.id
  //   var str = this.data.str
  //   var scrolltop = this.data.scrolltop
  //   var navlist = this.data.navlist
  //   var currentCategory = this.data.currentCategory
  //   if (currentCategory.id = navlist[str].id) {
  //     id = navlist[str + 1].id
  //     util.request(api.CatalogCurrent, {
  //         id: id
  //       })
  //       .then(function (res) {
  //         currentCategory = res.data.currentCategory
  //         that.setData({
  //           currentCategory: currentCategory
  //         });
  //       });
  //   } else if (str > navlist.length) {
  //     id = navlist[0].id
  //     util.request(api.CatalogCurrent, {
  //         id: id
  //       })
  //       .then(function (res) {
  //         currentCategory = res.data.currentCategory
  //         that.setData({
  //           currentCategory: currentCategory
  //         });
  //       });
  //   }
  //   // wx.showLoading({
  //   //   title: '加载中....',
  //   // })
  //   scrolltop = 0
  //   that.setData({
  //     scrolltop: scrolltop,
  //     id: id + 1,
  //     str: str + 1
  //   })
  // },
  hideModal: function () {
    this.hideView();
  },
  hideView() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)

  },
  switchCate: function (e) {
    var that = this;
    var scrolltop = this.data.scrolltop
    var floorNum = e.currentTarget.dataset.floor;
    var index = e.currentTarget.dataset.index;
    // var currentTarget = e.currentTarget
    scrolltop = 2
    that.setData({
      floorNum: floorNum,
      str: index,
      scrolltop: scrolltop
    })
    console.log(index)
    wx.setStorage({
      key: 'dj',
      data: this.data.navlist[index].id,
    })
    this.getCurrentCategory(e.currentTarget.dataset.index);
    // console.log(index)
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