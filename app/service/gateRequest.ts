import axios from 'axios'

export interface httpResponse<T = any> {
  code: number
  msg: string
  data: T
  [key: string]: any
}

const axiosBaseURL = (window?.location?.protocol || 'http:') + '//docs.ieternal.top/gateway/api'

const axInstance = axios.create({
  baseURL: axiosBaseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

axInstance.interceptors.request.use(
  async (config) => {
    const xToken = ''
    /*
     * xToken存在才在请求头上加xToken
     */
    if (xToken) {
      config.headers['X-Token'] = xToken || '' // 请求头加上token
    }
    config.params && delete config.params.dontNeedToken
    return config
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error)
  }
)

// 返回拦截
axInstance.interceptors.response.use(
  (response) => {
    // 拦截响应，做统一处理
    return response || { code: -200 }
  },
  (error) => {
    // Do something with response error
    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          error.message = error.response?.data?.message || '请求错误(400)'
          break
        case 401:
          error.message = '未授权，请重新登录(401)'
          break
        case 403:
          error.message = '拒绝访问(403)'
          break
        case 404:
          error.message = '请求出错(404)'
          break
        case 408:
          error.message = '请求超时(408)'
          break
        case 500:
          error.message = '服务器错误(500)'
          break
        case 501:
          error.message = '服务未实现(501)'
          break
        case 502:
          error.message = '网络错误(502)'
          break
        case 503:
          error.message = '服务不可用(503)'
          break
        case 504:
          error.message = '网络超时(504)'
          break
        case 505:
          error.message = 'HTTP版本不受支持(505)'
          break
        default:
          error.message = `连接出错(${error.response.status})!`
      }
      // 返回接口返回的错误信息
      return Promise.resolve({
        data: {
          statusText: error.response?.statusText || '出错了',
          code: -200,
          data: null,
          msg: error.response?.data?.message,
          success: error.response.data.success || false
        }
      })
    }

    if (error.message.includes('timeout') || error.message.includes('Network Error')) {
      // 判断请求异常信息中是否含有超时timeout字符串
      let msg = error.message.includes('timeout')
        ? '请求超时，请稍后再试'
        : error.message.includes('Network Error')
        ? '网络错误，请稍后再试'
        : '请求异常，清稍后再试'

      // 返回接口返回的错误信息
      return Promise.resolve({
        data: {
          statusText: error.response?.statusText || '出错了',
          code: -200,
          data: null,
          msg: msg,
          success: error.response?.data?.success || false
        }
      })
    }
  }
)

export { axiosBaseURL, axInstance }
