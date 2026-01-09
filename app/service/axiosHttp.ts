// import qs from 'qs'
import { axiosBaseURL, axInstance, type httpResponse } from './gateRequest'

/*
 * 基础地址 + 前缀 + url
 * axiosBaseURL(http://10.80.121.18:9090) + /api/[v1/] + app/client
 */
const baseURL = axiosBaseURL

/**
 * [get,post      [封装请求]]
 * @param  {[string]} url    [请求地址]
 * @param  {[object]} par    [请求数据]
 */
export default {
  get(url: string, data: Record<string, unknown>): Promise<httpResponse> {
    let pathUrl = baseURL + url
    return new Promise((resolve, reject) => {
      axInstance({
        url: pathUrl,
        params: data,
        method: 'get'
      })
        .then((res) => {
          return resolve(res.data as httpResponse)
        })
        .catch((error) => {
          return reject(error)
        })
    })
  },
  post(url: string, data: Record<string, unknown>): Promise<httpResponse> {
    let pathUrl = baseURL + url
    return new Promise((resolve, reject) => {
      axInstance({
        url: pathUrl,
        data: data,
        method: 'post'
      })
        .then((res) => {
          return resolve(res.data as httpResponse)
        })
        .catch((error) => {
          return reject(error)
        })
    })
  }
}
