export default defineNuxtPlugin(() => {
  // 强制在运行时设置 Open Graph site_name，覆盖可能由模块或 package.json 注入的值
  useHead({
    meta: [
      { property: 'og:site_name', content: 'ieternal后台管理系统' }
    ]
  })
})
