import wx from 'weixin-js-sdk-ts'
import axiosHttp from '~/service/axiosHttp'
import device from '~/utils'

interface IShareConfig {
  /** 分享标题 */
  title?: string
  /** 分享简介 */
  desc?: string
  /** 分享地址 */
  link?: string
  /** 分享图标地址 */
  imgUrl?: string
  /** JSSDK 隐藏分享功能 */
  hideAll?: boolean
  /** 公众号appid */
  WX_APPID?: string
  /** 接口请求地址前缀 */
  baseURL?: string
}

export function _initWX(opt: IShareConfig) {
  const _pathname = `${encodeURIComponent(window?.location.pathname || '/frontend/nuxt/')}`
  const _addressUrl = (window?.location.origin || '') + _pathname

  const url = '/wxAuth/config?redirect_url=' + _addressUrl

  return axiosHttp.get(url).then((res) => {
    if (!device.isWeixinBrowser()) return
    if (res.code == 200 && res.data) {
      const _ret = res.data
      let jsApiList: wx.jsApiList = [
        'showAllNonBaseMenuItem',
        'hideAllNonBaseMenuItem',
        'showMenuItems',
        'hideMenuItems',
        'onMenuShareTimeline',
        'updateAppMessageShareData',
        'updateTimelineShareData'
      ]
      console.warn(_ret, '_ret_ret')

      let openTagList: wx.openTagList = ['wx-open-launch-app', 'wx-open-launch-weapp']
      var data = {
        appId: '',
        timestamp: 0,
        nonceStr: '',
        signature: '',
        debug: false,
        jsApiList,
        openTagList
      }
      data.appId = _ret.appId
      data.timestamp = +_ret.timestamp
      data.nonceStr = _ret.nonceStr
      data.signature = _ret.signature
      wx.config(data)
      _initWxCallBack(opt)
    }
  })
}

/** 微信分享 */
function _initWxCallBack(opt: IShareConfig) {
  wx.ready(function () {
    const _opt = {
      title: String(opt.title), // 分享标题
      desc: String(opt.desc), // 分享描述
      link: String(opt.link),
      imgUrl: String(opt.imgUrl), // 分享图标
      success: () => {},
      cancel: () => {}
    }
    if (opt.hideAll) {
      // 隐藏所有非基础按钮接口
      wx.hideAllNonBaseMenuItem()
      return
    }
    // 显示所有功能按钮接口
    wx.showAllNonBaseMenuItem()
    // 分享到朋友圈(即将废弃)
    wx.onMenuShareTimeline(_opt)
    // 自定义“分享给朋友”及“分享到QQ”
    wx.updateAppMessageShareData(_opt)
    // 自定义“分享到朋友圈”及“分享到QQ空间”
    wx.updateTimelineShareData(_opt)

    wx.hideMenuItems({
      menuList: ['menuItem:openWithQQBrowser']
    })
  })
}

/** 分享函数 */
export async function setShareInfo(opt?: IShareConfig) {
  if (!process.client) return
  const isWX = device.isWeixinBrowser()
  const _opt = {
    title: opt?.title || '我的ieternal后台管理系统', // 分享标题
    desc:
      opt?.desc ||
      '90后台管理系统，ieternal后台管理系统，是以nuxt-admin、nuxt3-admin为基础开发的一款后台管理系统.', // 分享描述
    link: opt?.link || 'http://www.ieternal.top/frontend/nuxt/',
    imgUrl: opt?.imgUrl || 'http://www.ieternal.top/images/logo.png', // 分享图标
    hideAll: opt?.hideAll || false,
    success: () => {},
    cancel: () => {}
  }

  isWX && _initWX(_opt)
}

export default setShareInfo
