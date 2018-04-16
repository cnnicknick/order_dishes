// page/component/details/details.js
Page({
  data:{
    goods: {
      id: 1,
      image: '/image/goods1.png',
      title: '',
      price: 12,
      stock: '有货',
      detail: '图片仅作参考，请以实物为准。',
      parameter: '1人份',
      service: '不支持退货'
    },
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    orders: []
  },

  onLoad: function (options) {
    var self = this;
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        /*self.setData({
          address: res.data
        })*/
        self.data.orders = res.data;
        console.log('这是从缓存中获取的购物车数据');
        if (!self.data.orders){
          self.data.orders = [];
        }
        console.log(self.data.orders);
      },
      fail:function(err){
        self.data.orders = [];
        console.log(self.data.orders);
      }
    });
    this.setData({
      goods: {
        id: 1,
        image: options.image,
        title: options.title,
        price: options.price,
        stock: '有货',
        detail: '图片仅作参考，请以实物为准。',
        parameter: '125g/个',
        service: '不支持退货'
      }
    });
  },    

  onPullDownRefresh: function (options) {
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1200);
  },

  reduceCount() {
    let num = this.data.num;
    if( num>0 ){
      num--;
    };
    this.setData({
      num: num
    })
  },

  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    if (num <= 0) {
      return ;
    };
    let total = this.data.totalNum;

    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

    this.cacheOrder();
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },

  cacheOrder() {
    let goods = this.data.goods;
    let totalNum = this.data.totalNum;
    let order = {
      id: goods.id, title: goods.title, image: goods.image, num: this.data.num, price: goods.price, selected: true };

    console.log('this.data.orders组装前后对比你');
    console.log(this.data.orders);
    this.data.orders.push(order);
    console.log(this.data.orders);
    wx.setStorage({
      key: 'orders',
      data: this.data.orders,
      success() {
        console.log('加入购物车成功');
      }
    })
  }
 
})