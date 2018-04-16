// page/component/orders/orders.js
Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,
    orders:[]
  },

  onReady() {
  },

  onPullDownRefresh: function (options) {
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1200);
  },
  
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    });
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        self.setData({
          orders: res.data
        });
        console.log('获取到数据');
        console.log(self.data.orders);
        self.getTotalPrice();
      },
      fail: function (err) {
        console.log('没有获取到数据');
      }
    });
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    wx.showModal({
      title: '提示',
      content: '本系统只做演示，支付系统已屏蔽',
      text:'center',
      complete() {
        wx.switchTab({
          url: '/page/component/user/user'
        })
      }
    })
  }
})