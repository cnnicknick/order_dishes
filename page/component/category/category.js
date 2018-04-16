Page({
    data: {
        category: [
          { name: '水果', id: 'shuiguo', banner: '/image/c1.png', 
            cate: '水果', detail: [{ thumb: '/image/c2.png', name: '橘子' }, { thumb: '/image/c2.png', name: '苹果' }]
            },
          {
            name: '蔬菜', id: 'shucai', banner: '/image/c1.png',
            cate: '蔬菜', detail: [{ thumb: '/image/c2.png', name: '清炒菠菜' }, { thumb: '/image/c2.png', name: '蒜蓉油麦菜' }]
            },
          {
            name: '有辣', id: 'chaohuo', banner: '/image/c1.png',
            cate: '有辣', detail: [{ thumb: '/image/c2.png', name: '农家小炒肉' }, { thumb: '/image/c2.png', name: '野山椒牛肉' }]
            },
          {
            name: '不辣', id: 'dianxin', banner: '/image/c1.png',
            cate: '不辣', detail: [{ thumb: '/image/c2.png', name: '烧鹅饭' }, { thumb: '/image/c2.png', name: '白切鸡饭' }]
            },
          {
            name: '面食', id: 'cucha', banner: '/image/c1.png',
            cate: '面食', detail: [{ thumb: '/image/c2.png', name: '刀削面' }, { thumb: '/image/c2.png', name: '兰州拉面' }]
            },
          {
            name: '饮料', id: 'danfan', banner: '/image/c1.png',
            cate: '饮料', detail: [{ thumb: '/image/c2.png', name: '奶茶' }, { thumb: '/image/c2.png', name: '可乐' }]
            }
        ],
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: 'shuiguo'
    },
    onReady(){
        var self = this;
        wx.request({
            url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
            success(res){
                self.setData({
                    detail : res.data
                })
            }
        });
        
    },
    switchTab(e){
      const self = this;
      this.setData({
        isScroll: true
      })
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index
        })
      },0)
      setTimeout(function () {
        self.setData({
          isScroll: false
        })
      },1)
        
    }
    
})