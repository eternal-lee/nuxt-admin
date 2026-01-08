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
          <i class="el-icon">
            <component :is="item.icon"></component>
          </i>
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

const emits = defineEmits(['handleSelect'])
const useTabs = useTabsStore()
const globalStore = useGlobalStore()
const { themeConfig } = storeToRefs(globalStore)
// const isCollapse = ref(false) // 展开的

const active = ref('')
// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0)
const minW = ref(1000)

const router = useRouter()
const route = router.currentRoute.value
const isCollapse = computed(() => themeConfig.value.isCollapse)

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => router.currentRoute.value,
  (val) => {
    active.value = String(val.path).replace(/\/$/, '') || '/'
  },
  {
    immediate: true
  }
)

onMounted(() => {
  active.value = String(route.path).replace(/\/$/, '') || '/'
  setMenuFunc(active.value)
  // listeningWindow()
  window.addEventListener('resize', listeningWindow, false)
})

const handleSelect = (key: string) => {
  setMenuFunc(key)
  router.replace(key)
  emits('handleSelect')
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
@import url('~/assets/less/cusMenu.less');
</style>
