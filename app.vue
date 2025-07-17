<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import * as ElementPlusIconVue from '@element-plus/icons-vue'

const nuxtapp = useNuxtApp()

for (const [key, component] of Object.entries(ElementPlusIconVue)) {
  nuxtapp.vueApp.component(key, component)
}
</script>
