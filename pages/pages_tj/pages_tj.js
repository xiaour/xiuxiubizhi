// pages/pages_tj/pages_tj.js
var app = getApp()
Page({

  
  data: {
    userInfo:"",
    currentPageNum: 1,
    //顶部轮播图
    slider: [],
    //首页精选图片
    image_index: [],


    image: [{ img: "../image/美女车模.png", title: "看美女", id: "美女车模" },
            { img: "../image/风景旅游.png", title: "赏风景", id: "风景旅游" },
            { img: "../image/表情图片.png", title: "斗表情", id: "表情图片" },
            { img: "../image/我喜欢的.png", title: "我喜欢", id: "我喜欢的" }],
    image_hot:[{url:"http://ofad883tk.bkt.clouddn.com/xiaomao.jpg"},{url:"http://ofad883tk.bkt.clouddn.com/xiaogou.jpg"}],
        
    image_new: [],
    swiperCurrent:0,
    navbar: ['精选', '最新'],
    currentTab: 0
  },
recommend_tr_tap: function (){
  wx.navigateTo({
    url:'/pages/pages_qw/pages_qw'
  })
},

//上推加载更多
  loadMore: function () {
    var that = this
    that.setData({
      currentPageNum: that.data.currentPageNum + 1
    });

    //首页精选
    wx.request({
      url: getApp().globalData.apiServer + "portal/list",
      data: { pageNum: that.data.currentPageNum != null ? that.data.currentPageNum:1},
      success: function (data) {
        if (data.data.data.length>0){
          var dataArray = that.data.image_index;
          dataArray=dataArray.concat(data.data.data);
          that.setData({
            image_index: dataArray
          })
        }else{
        wx.showToast({
          title: '抱歉，已经没有更多啦！',
          icon: 'loading',
          duration: 2000
        }),
          that.setData({
            currentPageNum: that.data.currentPageNum - 1
          })
        } 
      }
    });
  },
//下拉刷新
  refesh:function(){
   
  },
  getMyProfile:function(){
    wx.navigateTo({
      url: '/pages/profile/profile' 
    });
  },

  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
},
//查看图片
  imageView:function(e){
    wx.navigateTo({
      url: '/pages/pages_imageView/imageView?imgId=' + e.currentTarget.dataset.id + "&url=" + e.currentTarget.dataset.url + "&pageNum="+ e.currentTarget.dataset.num
    });
    wx.request({url: getApp().globalData.apiServer + "portal/click",
      data: { id: e.currentTarget.dataset.id}, success: function (data) {}});
  },

swiperChange:function(e){
  this.setData({
      swiperCurrent: e.detail.current
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this//不要漏了这句，很重要
    //首页热门图集
    wx.request({
      url: getApp().globalData.apiServer + "portal/indexTopSlider",
      success: function (data) {
        //赋值
        that.setData({
          slider: data.data
        });
      }
    });

    //首页精选
    wx.request({
      url: getApp().globalData.apiServer + "portal/list",
      data: { pageNum: 1 },
      success: function (data) {

        that.setData({
          currentPageNum: 1
        });     //赋值
        that.setData({
          image_index: data.data.data
        })
      }
    });
    
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
    var that=this;
    var nickName = "";
    wx.getUserInfo({
      success: function (resdata) {
        var userInfo = resdata.userInfo;
       that.setData({
         userInfo: userInfo
        });
       wx.setStorageSync('USER_INFO', userInfo)
      }
    })
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
  onShareAppMessage: function (res) {
    var nickName = "";
    wx.getUserInfo({
      success: function (resdata) {
        var userInfo = resdata.userInfo;
       
        nickName = userInfo.nickName;
      }
    })
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '这是今日热图，请收好！',
      path: '/pages/pages_tj/pages_tj',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
