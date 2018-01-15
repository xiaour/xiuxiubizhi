var app = getApp()
Page({
  data: {
    currentPageNum: 1,
    //专辑图片
    image_album: [],
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
      data: { pageNum: that.data.currentPageNum != null ? that.data.currentPageNum : 1 },
      success: function (data) {
        if (data.data.data.length > 0) {
          var dataArray = that.data.image_index;
          dataArray = dataArray.concat(data.data.data);
          that.setData({
            image_album: dataArray
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
  }




})