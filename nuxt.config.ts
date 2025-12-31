// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-30',
  app: {
    baseURL: process.env.NUXT_BASE_URL,
    head: {
      title: 'ieternal后台管理系统', // default fallback title
      titleTemplate: '%s', // 或者 '%s | MySite'
      htmlAttrs: {
        lang: 'zh'
      },
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      meta: [
        { name: 'author', content: 'ieternal' },
        {
          name: 'description',
          content:
            '后台管理系统，ieternal后台管理系统，是以nuxt-admin、nuxt3-admin为基础开发的一款后台管理系统.'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        },
        {
          name: 'Keywords',
          content:
            'ieternal，nuxt，nuxt3，nuxt-admin，nuxt3-admin，后台管理系统，ieternal后台管理系统'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          innerHTML: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?5f670af4dd60d230a3220aa3322172d3";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `
        }
      ]
    }
  },
  css: ['~/assets/less/index.less'],
  devtools: { enabled: false },
  devServer: {
    port: 3000
  },
  sourcemap: false,
  runtimeConfig: {
    public: {
      ...process.env
    }
  },
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/seo',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore(), storeToRefs()`
          'defineStore',
          'storeToRefs'
        ]
      }
    ],
    'pinia-plugin-persistedstate/nuxt'
  ],
  robots: {
    robotsTxt: false
  },
  site: { url: 'www.ieternal.top' }
})
