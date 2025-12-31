<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useThemeHook } from '~/composables/useTheme'

const { initTheme } = useThemeHook()

initTheme()
</script>
