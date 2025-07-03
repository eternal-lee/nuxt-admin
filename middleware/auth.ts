export default defineNuxtRouteMiddleware((to, _from) => {
  // 仅在客户端执行
  if (process.client) {
    const token = localStorage.getItem('token')
    if (!token && to.path !== '/login') {
      return navigateTo('/login')
    }
    if (token && to.path == '/login') {
      return navigateTo('/')
    }
  }
})
