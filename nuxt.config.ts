// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'ieternal', // default fallback title
      htmlAttrs: {
        lang: 'en'
      },
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      meta: [
        {
          name: 'description',
          content: 'ieternal | nuxt3-admin 后台管理系统模板'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        },
        {
          name: 'keywords',
          content: 'ieternal,nuxt,nuxt3,nuxt-admin,nuxt3-admin,后台管理系统.'
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
  postcss: {
    plugins: {
      'postcss-nested': {},
      'postcss-custom-media': {},
      'postcss-pxtorem': {
        rootValue: 16, // 基础字体大小，通常设置为16px
        propList: ['*'], // 可以针对所有属性进行转换，也可以指定如['font', 'font-size', 'width', 'height']等
        selectorBlackList: ['no-rem'], // 指定不转换的类名，例如['no-rem']
        replace: true, // 是否替换带有px的属性值
        mediaQuery: true, // 媒体查询中的px是否需要转换
        minPixelValue: 3 // 设置最小的转换数值，如果小于3px的将不被转换
      }
    }
  },
  runtimeConfig: {
    // 公共变量，前后端都可用
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || ''
    }
  },
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/seo',
    '@element-plus/nuxt',
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
  seo: {
    title: 'ieternal | nuxt-admin',
    description: 'ieternal | nuxt3-admin 后台管理系统模板',
    keywords: 'ieternal,nuxt,nuxt3,nuxt-admin,nuxt3-admin,后台管理系统.'
  },
  sitemap: {}
})
