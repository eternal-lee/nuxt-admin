<template>
  <div class="aside-box">
    <div class="logo">
      <img
        src="~/assets/images/logo_jpg.png"
        class="icon"
        :class="{ isCollapse: isCollapse }"
        alt="ieternal后台管理系统-LOGO"
      />
      <div class="desc" :class="{ w: isCollapse }">工作台</div>
    </div>
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @select="handleSelect"
    >
      <template v-for="item in routes" :key="item.name">
        <el-menu-item :index="item.path" class="">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
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
  listeningWindow()
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
.aside-box {
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
      transition: all 0.3s;
      white-space: nowrap;

      &.w {
        width: 0px;
        opacity: 0;
      }
    }
  }

  .el-menu {
    border-right: none;
  }

  .el-menu-vertical-demo {
    &:not(.el-menu--collapse) {
      width: 210px;
    }
  }
}
</style>
