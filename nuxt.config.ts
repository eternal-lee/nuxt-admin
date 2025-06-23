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
          content: 'ieternal 基于 create-vant-cli-app 封装的通用组件库'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        },
        {
          name: 'keywords',
          content:
            'ieternal.top,ieternal,组件库,自定义vue组件,vue,eternal,ieternal自定义vue组件,文本省略,视频封装,vant-cli-app'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  css: ['~/assets/less/index.less'],
  devtools: { enabled: false },
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
  modules: ['@nuxtjs/sitemap', '@nuxtjs/seo'],
  sitemap: {}
})
