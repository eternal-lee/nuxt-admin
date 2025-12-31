// 全局验权操作，就无需每个路由里面添加
const visitorArr = ['/visitor', '/callback']

export default defineNuxtRouteMiddleware((to, _from) => {
  // 仅在客户端执行
  if (process.client) {
    if (visitorArr.includes(to.path)) return
    const token = localStorage.getItem('token')
    if (!token && to.path !== '/login') {
      return navigateTo('/login')
    }
    if (token && to.path == '/login') {
      return navigateTo('/')
    }
  }
  // 使用 cookie 在服务端和客户端都可用
  // const token = useCookie('token')?.value
})
