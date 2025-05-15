<template>
  <div class="custom">
    <slot name="header"></slot>
    <p>自定义布局格式</p>
    <slot />
  </div>
</template>

<style lang="less" scoped>
p {
  font-size: 14px;
}
</style>
