const device = {
  userAgent: (window as any)?.navigator.userAgent.toLowerCase(),
  isWeixinBrowser() {
    const ua = navigator.userAgent.toLowerCase()
    return /micromessenger\/([\d.]+)/i.test(ua) // 或使用 ua.indexOf('micromessenger') !== -1
  }
}

export default device
