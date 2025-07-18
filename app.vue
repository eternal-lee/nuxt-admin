<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import * as ElementPlusIconVue from '@element-plus/icons-vue'
import { useThemeHook } from '~/composables/useTheme'

const nuxtapp = useNuxtApp()

for (const [key, component] of Object.entries(ElementPlusIconVue)) {
  nuxtapp.vueApp.component(key, component)
}

if (process.client) {
  const { initTheme } = useThemeHook()
  initTheme()
}
</script>
