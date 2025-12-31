<template>
  <div class="_layout">
    <ClientOnly>
      <slot />
    </ClientOnly>
  </div>
</template>

<style lang="less" scoped>
._layout {
  width: 100%;
  height: 100%;
}
</style>
