<template>
  <div class="layoutLoading">
    <div class="loader">
      <span><span></span><span></span><span></span><span></span></span>
      <div class="base">
        <span></span>
        <div class="face"></div>
      </div>
    </div>
    <div class="longfazers"><span></span><span></span><span></span><span></span></div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'FullLoading'
})
</script>

<style lang="less" scoped>
@import url('~/assets/less/layoutLoading.less');
</style>
