<template>
  <div class="tabs-box">
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
      @tab-remove="removeTab"
    >
      <el-tab-pane name="/">
        <template #label>
          <el-icon class="tabs-icon"><HomeFilled /></el-icon>首页
        </template>
      </el-tab-pane>
      <template v-for="item in menuTabs" :key="item.path">
        <el-tab-pane :name="item.path" :label="item.title" closable>
          <template #label>
            <el-icon class="tabs-icon"><component :is="item.icon"></component></el-icon
            >{{ item.name }}
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { TabPaneName, TabsPaneContext } from 'element-plus'
import { useTabsStore } from '~/store/modules/tabs'

const useTabs = useTabsStore()
const route = useRoute()
const router = useRouter()
const activeName = ref(route.fullPath)

const menuTabs = computed(() => useTabs.tabsMenuList.filter((item) => item.path != '/'))
// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) return
    activeName.value = route.fullPath
  },
  {
    immediate: true
  }
)

function handleClick(tab: TabsPaneContext) {
  const fullPath = tab.props.name as string
  router.push(fullPath)
}

function removeTab(path: TabPaneName) {
  useTabs.removeTabs(path as string, path == route.fullPath)
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
        border: none;

        .el-tabs__item {
          position: relative;
          padding: 0 20px;
          border: none;

          .tabs-icon {
            margin-right: 4px;
          }

          &.is-active {
            &::before {
              position: absolute;
              bottom: 0;
              width: 100%;
              height: 0;
              content: '';
              border-bottom: 2px solid var(--el-color-primary) !important;
            }
          }
        }
      }
    }
  }
}
</style>
