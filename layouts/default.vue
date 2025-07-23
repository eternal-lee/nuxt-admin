<template>
  <div class="common-layout layoutLoading" v-if="layoutLoading">
    <NuxtPage>
      <div class="loader">
        <span><span></span><span></span><span></span><span></span></span>
        <div class="base">
          <span></span>
          <div class="face"></div>
        </div>
      </div>
      <div class="longfazers"><span></span><span></span><span></span><span></span></div>
    </NuxtPage>
  </div>
  <div class="common-layout" v-if="!layoutLoading">
    <el-container>
      <el-aside>
        <cusMenu />
      </el-aside>
      <el-container>
        <el-header>
          <pageHeader />
        </el-header>
        <tabsBox />
        <el-main>
          <slot />
        </el-main>
        <el-footer>
          <pageFooter />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import pageHeader from '~/components/header/index.vue'
import pageFooter from '~/components/footer/index.vue'
import cusMenu from '~/components/cusMenu/index.vue'
import tabsBox from '~/components/tabsBox/index.vue'

const layoutLoading = ref(true)

onBeforeMount(() => {
  layoutLoading.value = true
})

onMounted(() => {
  layoutLoading.value = false
})
</script>

<style lang="less" scoped>
@import url('~/assets/less/layoutLoading.less');

.common-layout {
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
    }
  }

  .el-header,
  .el-footer {
    padding: 0;
    background-color: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color-light);
  }

  .el-aside {
    width: auto;
    max-width: 200px;
    height: 100%;
    overflow-x: hidden;
    color: var(--el-text-color-primary);
    text-align: center;
    background-color: var(--el-menu-bg-color);
    border-right: 1px solid var(--el-border-color-light);
  }

  .el-main {
    box-sizing: border-box;
    padding: 10px 12px;
    background-color: var(--el-bg-color-page);
  }
}
</style>
