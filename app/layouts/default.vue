<template>
  <div class="_layout">
    <ClientOnly>
      <div class="el-container">
        <cusMenu />
        <div class="el-container is-vertical">
          <div class="el-header">
            <pageHeader />
          </div>
          <tabsBox />
          <div class="el-main">
            <slot />
          </div>

          <div class="el-footer">
            <pageFooter />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const pageHeader = defineAsyncComponent(() => import('~/components/header/index.vue'))
const pageFooter = defineAsyncComponent(() => import('~/components/footer/index.vue'))
const cusMenu = defineAsyncComponent(() => import('~/components/cusMenu/index.vue'))
const tabsBox = defineAsyncComponent(() => import('~/components/tabsBox/index.vue'))
</script>

<style lang="less" scoped>
._layout {
  position: relative;
  height: 100%;
  overflow: hidden;

  .el-container {
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    min-width: 0;
    height: 100%;

    &.is-vertical {
      flex-direction: column;
      min-width: 800px;
    }
  }

  .el-header,
  .el-footer {
    height: 60px;
    padding: 0;
    background-color: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color-light);
  }

  .el-main {
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    box-sizing: border-box;
    padding: 10px 12px;
    background-color: var(--el-bg-color-page);
  }
}
</style>
