<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <cusMenu />
      </el-aside>
      <el-container>
        <el-header>
          <pageHeader />
        </el-header>
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
</script>

<style lang="less" scoped>
.common-layout {
  height: 100%;
  background: #000;

  .el-container {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    min-width: 0px;
    height: 100%;
    flex: 1 1 auto;

    &.is-vertical {
      flex-direction: column;
    }
  }

  .el-header {
    padding: 0;
  }

  .el-aside {
    width: auto;
    max-width: 200px;
    height: 100%;
    color: var(--el-text-color-primary);
    text-align: center;
    overflow-x: hidden;
  }

  .el-main {
    text-align: center;
    border-radius: 8px;
    background: #fff;
    margin: 8px;
  }
}
</style>
