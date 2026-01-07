<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useThemeHook } from '~/composables/useTheme'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const { initTheme } = useThemeHook()
const nuxtApp = useNuxtApp()

initTheme()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  nuxtApp.vueApp.component(key, component)
}
</script>
