<template>
  <header class="header">
    <div class="left flexCenter">
      <el-icon class="collapse-icon" size="24" @click.stop="handleToggle">
        <Fold v-if="!isCollapse" />
        <Expand v-else />
      </el-icon>
      <div class="brendCrumb" v-if="!!breadcrumbList.length">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item
            v-for="item in breadcrumbList"
            :key="item.path"
            :to="{ path: item.path }"
          >
            <el-icon class="bread_icon"> <component :is="item.icon"></component> </el-icon
            >{{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="center flexCenter"></div>
    <div class="right">
      <div class="header-icon">
        <div class="theme" @click="switchHandle">
          <el-icon v-if="themeConfig.isDark"><Moon /></el-icon>
          <el-icon v-if="!themeConfig.isDark"><Sunny /></el-icon>
        </div>
      </div>
      <div class="userInfo">
        <div class="username">admin</div>
        <el-dropdown class="flexCenter" :hide-on-click="false">
          <div class="portrait"></div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="menuIItem" @click.stop="loginOut">退出</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
              <el-dropdown-item>Action 6</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/store/index'
import { useTabsStore } from '~/store/modules/tabs'
import { useThemeHook } from '~/composables/useTheme'
import { ArrowRight } from '@element-plus/icons-vue'
import { routes } from '~/router/index'

const useGlobal = useGlobalStore()
const useTabs = useTabsStore()
const { themeConfig } = storeToRefs(useGlobal)
const useTheme = useThemeHook()

const router = useRouter()
const isCollapse = computed(() => themeConfig.value.isCollapse)
const breadcrumbList = computed(() => {
  const _fullpath = router.currentRoute.value.fullPath
  const _item = routes.filter((item) => item.path == '/')
  if (_fullpath == '/') return _item
  const _curTab = useTabs.tabsMenuList.filter((item) => item.path == _fullpath)
  return [..._item, ..._curTab]
})

function handleToggle() {
  useGlobal.handleToggle({ isCollapse: !isCollapse.value })
}

function switchHandle() {
  themeConfig.value.isDark = !themeConfig.value.isDark
  useTheme.switchDark()
}

function loginOut() {
  localStorage.removeItem('token')
  router.replace('/login')
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 100%;
  color: var(--el-menu-text-color);
  user-select: none;

  .left {
    position: relative;
    z-index: 1;
    padding: 0 20px;

    .collapse-icon {
      cursor: pointer;
    }

    .brendCrumb {
      margin-left: 20px;
      font-size: 14px;

      :deep(.el-icon.bread_icon) {
        margin-right: 2px;
      }
    }
  }

  .center {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .right {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-right: 20px;
    min-width: 100px;
    max-width: 180px;
    margin-left: auto;

    .header-icon {
      .theme {
        cursor: pointer;
      }
    }

    .userInfo {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-left: 20px;
      height: 100%;

      .username {
        margin: 0 20px;
      }

      .portrait {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #dedede;
        /* 可选：防止收缩 */
        flex-shrink: 0;
        cursor: pointer;
      }

      :deep(.el-dropdown) {
        height: 100%;
      }
    }
  }
}
</style>
