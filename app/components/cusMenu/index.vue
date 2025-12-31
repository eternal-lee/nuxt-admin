<template>
  <div class="el-aside">
    <div class="logo">
      <img
        src="~/assets/images/logo_jpg.png"
        class="icon"
        :class="{ isCollapse: isCollapse }"
        alt="ieternal后台管理系统-LOGO"
      />
      <div class="desc" :class="{ hidW: isCollapse }">工作台</div>
    </div>
    <div
      class="el-menu el-menu-vertical-demo"
      :class="{ 'el-menu--collapse': isCollapse }"
      :default-active="active"
      :collapse="isCollapse"
    >
      <template v-for="item in routes" :key="item.name">
        <div
          :index="item.path"
          class="el-menu-item"
          :class="{ 'is-active': active == item.path }"
          @click.stop="handleSelect(item.path)"
        >
          <span>{{ item.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { routes } from '~/router/index'
import { useTabsStore } from '~/store/modules/tabs'
import { useGlobalStore } from '~/store'

const useTabs = useTabsStore()
const globalStore = useGlobalStore()
const { themeConfig } = storeToRefs(globalStore)
// const isCollapse = ref(false) // 展开的

const active = ref('')
// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0)
const minW = ref(1000)

const router = useRouter()
const isCollapse = computed(() => themeConfig.value.isCollapse)

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => router.currentRoute.value,
  () => {
    active.value = router.currentRoute.value.path || '/'
  },
  {
    immediate: true
  }
)

onMounted(() => {
  active.value = router.currentRoute.value.path || '/'
  setMenuFunc(active.value)
  // listeningWindow()
  window.addEventListener('resize', listeningWindow, false)
})

const handleSelect = (key: string) => {
  setMenuFunc(key)
  router.replace(key)
}

function setMenuFunc(key: string) {
  const item = routes.find((item) => item.path === key) as Record<string, unknown>
  useTabs.setMenuList(item)
}

function listeningWindow() {
  const timer = setTimeout(() => {
    screenWidth.value = document.body.clientWidth
    if (!isCollapse.value && screenWidth.value < minW.value)
      globalStore.handleToggle({ isCollapse: true })
    if (isCollapse.value && screenWidth.value > minW.value)
      globalStore.handleToggle({ isCollapse: false })
    clearTimeout(timer)
  }, 100)
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', listeningWindow)
})
</script>

<style lang="less" scoped>
.el-aside {
  box-sizing: border-box;
  flex-shrink: 0;
  width: auto;
  max-width: 210px;
  height: 100%;
  overflow: hidden;
  color: var(--el-text-color-primary);
  text-align: center;
  background-color: var(--el-menu-bg-color);
  border-right: 1px solid var(--el-border-color-light);

  .logo {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 60px;

    .icon {
      width: auto;
      height: 40px;
    }

    .desc {
      box-sizing: border-box;
      width: 46px;
      padding-left: 4px;
      font-size: 14px;
      opacity: 1;
      color: var(--el-menu-text-color);
      transition: all 0.3s;
      white-space: nowrap;

      &.hidW {
        width: 0px;
        opacity: 0;
        padding-left: 0;
      }
    }
  }

  .el-menu {
    border-right: none;
    background-color: var(--el-menu-bg-color);
    border-right: 1px solid var(--el-menu-border-color) #dcdfe6;
    box-sizing: border-box;
    list-style: none;
    margin: 0;
    padding-left: 0;
    width: auto;
    position: relative;

    .el-menu-item {
      align-items: center;
      box-sizing: border-box;
      color: var(--el-menu-text-color);
      cursor: pointer;
      display: flex;
      font-size: 14px;
      height: 56px;
      line-height: 56px;
      list-style: none;
      padding: 0 20px;
      position: relative;
      transition: border-color 0.3s background-color 0.3s, color 0.3s;

      &:hover {
        background-color: var(--el-menu-hover-bg-color);
      }

      &.is-active {
        color: var(--el-menu-active-color);
      }
    }
  }

  .el-menu-vertical-demo {
    &:not(.el-menu--collapse) {
      width: 210px;
    }
  }
}
</style>
