<template>
  <div class="tabs-box">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane name="first">
        <template #label>
          <el-icon class="tabs-icon"><HomeFilled /></el-icon>首页
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

function handleClick(tab: TabsPaneContext, event: Event) {
  console.log(tab, event)
}
</script>

<style lang="less" scoped>
.tabs-box {
  background-color: var(--el-bg-color);

  :deep(.el-tabs) {
    .el-tabs__header {
      box-sizing: border-box;
      height: 40px;
      padding: 0 12px;
      margin: 0;

      .el-tabs__nav {
        .el-tabs__active-bar {
          width: 100% !important;
          transform: translateX(0%) !important;
        }

        .el-tabs__item {
          padding: 0 20px;

          .tabs-icon {
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>
