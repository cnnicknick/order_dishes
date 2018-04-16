// page/component/new-pages/cart/cart.js
Page({
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:true,    // 全选状态，默认全选
    obj:{
        name:"hello"
    }
  },

  onShow: function(){
    var self = this;
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        console.log('这是从缓存中获取的购物车数据');
        console.log(res.data);
        if (res.data && res.data.length>0){
          self.setData({
            hasList: true,
            carts: res.data
          });
        }else{
          self.setData({
            hasList: false,
            carts: []
          });
        }
        self.getTotalPrice();
      },
      fail: function (err) {
        console.log('没有获取到数据');
      }
    });
  },

  onLoad: function (options) {},

  onPullDownRefresh: function (options) {
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },1200);
  },

  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index,1);
    this.setData({
      carts: carts
    });
    if(!carts.length){
      this.setData({
        hasList: false
      });
    }else{
      this.getTotalPrice();
    }
    this.cacheCate();
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
    this.cacheCate();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    this.cacheCate();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if(num <= 1){
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    this.cacheCate();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
      if(carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },

  clearCate() {
    this.setData({
      hasList: false,
      carts: []
    });
    wx.setStorage({
      key: 'orders',
      data: [],
      success() {
        console.log('更新购物车成功');
      }
    });
    //wx.clearStorage();
  },

  cacheCate(){
    let self = this;
    console.log('缓存前检查self.data.carts');
    console.log(self.data.carts);
    wx.setStorage({
      key: 'orders',
      data: self.data.carts,
      success() {
        console.log('更新购物车成功');
      }
    });
  }

})