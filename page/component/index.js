Page({
  data: {
    imgUrls: [
      '/image/b1.jpg',              'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      '/image/b3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    goods: [
      { id: 1, title: '农家小炒肉', image: '/image/s4.png', num: 1,    price: 12 },
      { id: 2, title: '芹菜香干', image: '/image/s5.png', num: 1, price: 12 },
      { id: 3, title: '土豆排骨', image: '/image/s6.png', num: 1, price: 12 },
      { id: 4, title: '野山椒牛肉', image: '/image/s4.png', num: 1, price: 12 },
      { id: 5, title: '清炒菠菜', image: '/image/s5.png', num: 1, price: 12 },
      { id: 6, title: '蒜蓉油麦菜', image: '/image/s6.png', num: 1, price: 12 } 
    ]
  },

  onPullDownRefresh: function (options) {
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1200);
  }

})