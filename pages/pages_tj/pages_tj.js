// pages/pages_tj/pages_tj.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs:[
      {
        img:"../image/欢乐球吃球.jpg",
        name:"欢乐球吃球"
      },
  {
      img:"../image/王者荣耀.png",
      name:"王者荣耀"
  },
  {
  img:"../image/火影忍者.jpg",
  name:"火影忍者"
  },
  {img:"../image/狼人杀世界.jpg",
  name:"狼人杀世界"
  },
  {img:"../image/球球大作战.png",
  name:"球球大作战"
  },
  {img:"../image/天天狼人杀.png",
  name:"天天狼人杀"
  },
  {img:"../image/新游中心.jpg",
  name:"新游中心"
  },
  {img:"../image/阴阳师.jpg",
      name:"阴阳师"
  }],
    slider: [{
        picUrl:"../image/1.jpg",
        id:"1"
    },{
        picUrl:"../image/2.jpg",
        id:"2"
    },{
        picUrl:"../image/3.jpg",
        id:"3"
    }],


    image:[
    {
      img:"../image/排行榜.png",
      title:"美女车模",
      id:"美女车模"
    },
    {
      img:"../image/消息.png",
        title:"风景旅游",
        id:"风景旅游"
    },{
      img:"../image/活动.png",
        title:"表情图片",
        id:"表情图片"
    },{
      img:"../image/直播.png",
        title:"我喜欢的",
        id:"我喜欢的"
    }],
    image_sp:[{
      img:"../image/4.jpg",
      title:""
    },{
      img:"../image/5.jpg",
      title:""
    },{
      img:"../image/6.jpg",
      title:""
    },{
      img:"../image/7.jpg",
      title:""
    },{
      img:"../image/8.jpg",
      title:""
    },{
      img:"../image/9.jpg",
      title:""
    }],
    swiperCurrent:0,
    navbar: ['精选', '最新'],
    currentTab: 0
  },
recommend_tr_tap: function (){
  wx.navigateTo({
    url:'/pages/pages_qw/pages_qw'
  })
},

  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
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
  onShareAppMessage: function () {

  }
})
