<template>
  <!-- 首屏加载动画 -->
  <FullLoading v-if="isFullLoading" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useThemeHook } from '~/composables/useTheme'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { setShareInfo } from './tools'

// 是否首次加載
const isFullLoading = ref(true)
const { initTheme } = useThemeHook()
const nuxtApp = useNuxtApp()

onMounted(() => {
  initFunc()
})

/**
 * 数据初始化
 */
function initFunc() {
  try {
    setShareInfo()
  } catch (error) {
    console.error(error)
  }
  pageLoadingFunc()
  initTheme()
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    nuxtApp.vueApp.component(key, component)
  }
}

/**
 * 页面加载动画
 */
function pageLoadingFunc() {
  nuxtApp.hook('page:start', () => {
    isFullLoading.value = true
  })

  nuxtApp.hook('page:finish', () => {
    isFullLoading.value = false
  })
}
</script>
