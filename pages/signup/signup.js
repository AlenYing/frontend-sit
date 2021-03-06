// pages/signup/signup.js
const app = getApp();
const url = app.globalData.commonUrl
Page({

  /**
   * 页面的初始数据1
   */
  data: {
    show: false,
    resInfo: null,
    upSuccess: false,
    canupLoad: false,
    uploadInfo: {
      realName: null,
      studentId: null
    }
  },
  bindName: function (e) {
    const that = this;
    this.setData({
      'uploadInfo.realName': e.detail.value
    })
    this.setData({
      canupLoad: Boolean(that.data.uploadInfo.realName &&
        that.data.uploadInfo.studentId &&
        (that.data.uploadInfo.oaSecret ||
          that.data.uploadInfo.identityNumber))
    })
  },
  bindId: function (e) {
    const that = this;
    this.setData({
      'uploadInfo.studentId': e.detail.value
    })
    this.setData({
      canupLoad: Boolean(that.data.uploadInfo.realName &&
        that.data.uploadInfo.studentId &&
        (that.data.uploadInfo.oaSecret ||
          that.data.uploadInfo.identityNumber))
    })
  },
  bindSecret: function (e) {
    const that = this;
    this.setData({
      'uploadInfo.oaSecret': e.detail.value
    })
    this.setData({
      canupLoad: Boolean(that.data.uploadInfo.realName &&
        that.data.uploadInfo.studentId &&
        (that.data.uploadInfo.oaSecret ||
          that.data.uploadInfo.identityNumber))
    })
    console.log(that.data.canupLoad)
    console.log(that.data.uploadInfo.oaSecret ||
      that.data.uploadInfo.identityNumber)
  },
  bindidentity: function (e) {
    const that = this;
    this.setData({
      'uploadInfo.identityNumber': e.detail.value
    })
    this.setData({
      canupLoad: Boolean(that.data.uploadInfo.realName &&
        that.data.uploadInfo.studentId &&
        (that.data.uploadInfo.oaSecret ||
          that.data.uploadInfo.identityNumber))
    })
  },
  onClose: function () {
    this.setData({
      show: false
    })
  },
  signup: function () {
    const that = this;
    for(let i in that.data.uploadInfo){
      if(that.data.uploadInfo[i]==="") delete(that.data.uploadInfo[i])
    }
    that.setData({
      uploadInfo:that.data.uploadInfo
    })
    wx.setStorage({
      data: this.data.uploadInfo,
      key: 'uploadInfo',
    })
    console.log(that.data.uploadInfo)
    wx.request({
      url: `${url}/user/${app.globalData.uid}/identity`,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${app.globalData.token}`
      },
      data: that.data.uploadInfo,
      success: function (res) {
        // wx.hideLoading({
        // success: (res1) => {
        if (res.data.code === 0) {
          that.setData({
            resInfo: "认证成功！",
            upSuccess: true
          })
          app.globalData.isStudent = true
          setTimeout(() => {
            that.setData({
              show: false
            })
          }, 500)
        } else {
          that.setData({
            resInfo: res.data.msg
          })
        }
        that.setData({
          show: true
        })
        // }
        // })
      }
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
    const that = this;
    wx.getStorage({
      key: 'uploadInfo',
      success (res) {
        console.log(res)
       that.setData({
         uploadInfo:res.data
       })
       that.setData({
        canupLoad: Boolean(that.data.uploadInfo.realName &&
          that.data.uploadInfo.studentId &&
          (that.data.uploadInfo.oaSecret ||
            that.data.uploadInfo.identityNumber))
      })
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
  onShareAppMessage: function () {

  }
})