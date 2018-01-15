// pages/pages_imageView/imageView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:"",
    imgid:"",
    currentPageNum:-1,
    dataList:[],//滑动查看下一张的集合
    currentIndex: -1,//当前页在dataList的下标
    animationData: {},
    tips:["感谢主人恩宠","啊...不要停","你顶的好用力...","好棒，继续","谢谢赏光","您👍的真棒！"],
    shareTips:['农药中吕布最爱说的是“我的雕缠在哪里？”','大波大图，今晚吃鸡','自古深情留不住，羞羞壁纸没套路','问君能有几多愁，恰似一波妙图在里头'],
    likeCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    that.setData({
      imgUrl: options.url,
      imgid: options.imgId,
      currentPageNum: options.pageNum
    });

    console.log(options.pageNum);
    
    wx.request({
      url: getApp().globalData.apiServer + "portal/list",
      data: { pageNum: that.data.currentPageNum != null ?that.data.currentPageNum : 1 },
      success: function (data) {
        var tempDataList=data.data.data;
        if (tempDataList.length > 0) {
          //找到当前页图片的下标，用于定位前一张或后一张
          for (var i = 0; i < tempDataList.length;i++){
            var data = tempDataList[i];
            if (data.id == options.imgId){
              that.setData({currentIndex: i});
              break;
            }
          }
          that.setData({
            dataList: tempDataList
          })
        } else {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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

  huaDong: function (index) {
    var that=this;
    var data = this.data.dataList[index];    
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    });
    that.animation = animation;
    
    that.setData({
      imgUrl: data.url,
      imgid: data.imgId,
      currentIndex:index
    });
  },

  

  loadMoreData:function(){
    var that = this;
    console.log("当前页码："+that.data.currentPageNum);
    
    wx.request({
      url: getApp().globalData.apiServer + "portal/list",
      data: { pageNum: that.data.currentPageNum != null ? that.data.currentPageNum : 1 },
      success: function (data) {
        var tempDataList = data.data.data;
        if (tempDataList.length > 0) {
          that.setData({
            dataList: tempDataList
          })
        } else {
          wx.showToast({
            title: '抱歉，已经没有更多啦！',
            icon: 'loading',
            duration: 2000
          });
        }
      }
    });
  },

  /**
   * 上一张
   */
  lastOne: function () {
    var that = this;
    console.log(that.data.currentIndex);
    wx.showNavigationBarLoading();

    
    var tempNum = that.data.currentPageNum;
    
    if (that.data.currentIndex - 1 <= 1) {
      if (parseInt(tempNum) - 1 <= 0) {
        wx.showToast({
          image: '../image/emoji_flash_fill.png',
          title: "已经是最新了",
        });
        return;
      }
      that.setData({
        currentPageNum: parseInt(tempNum) - 1,
        currentIndex:17
      })
      that.loadMoreData();
    }
    that.huaDong(that.data.currentIndex - 1);

    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh();
  },

  /**
   * 下一张
   */
  nextOne: function () {
    var that=this;
    wx.showNavigationBarLoading();
    
    if (that.data.currentIndex +1>=18){
      var tempNum = that.data.currentPageNum;
      that.setData({
        currentPageNum: parseInt(tempNum) + 1,
        currentIndex: 1
      })
      that.loadMoreData();
    }
    that.huaDong(that.data.currentIndex+ 1);

    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh();
  },

  download:function(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '您要把我放到相册里吗？',
      success:function(res){
      if(res.confirm){
        wx.downloadFile({
          url: that.data.imgUrl,
          header: {},
          success: function (res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function (res) {
                wx.showToast({
                  title: '已保存到相册',
                })
              },
              fail: function (res) {
                console.log(res)
              }
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
      }
    })
    
  },

  iLikeIt:function(){
    
    this.setData({
      likeCount: this.data.likeCount+ 1
    });
    var index = Math.floor((Math.random() * this.data.tips.length)); 
    if (this.data.likeCount > 5) {
      wx.showToast({
        image: '../image/emoji_flash_fill.png',
        title: "分享给大家吧",
      });
      this.setData({
        likeCount: 0
      });
    }else{
      wx.showToast({
        image: '../image/like.png',
        title: this.data.tips[index],
      });
    }
    
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that=this;
    var index = Math.floor((Math.random() * that.data.shareTips.length)); 

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: that.data.shareTips[index],
      path: '/pages/pages_imageView/imageView?imgId=' + that.data.imgid + "&url=" + that.data.imgUrl + "&pageNum=" + that.data.currentPageNum,
      imageUrl: that.data.imgUrl,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }


})