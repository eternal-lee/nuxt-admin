<template>
  <header class="header">
    <div class="left flexCenter">
      <div class="collapse-icon" @click.stop="handleToggle">
        <i class="el-icon">
          <Fold v-if="!isCollapse" />
          <Expand v-else />
        </i>
      </div>
      <div class="brendCrumb" v-if="!!breadcrumbList.length">
        <div class="breadcrumb_item" v-for="(item, index) in breadcrumbList" :key="item.path">
          <div
            class="breadcrumb_inner"
            :class="{ 'is-link': index != breadcrumbList.length - 1 }"
            @click.stop="handleSelect(item.path, index)"
          >
            <i class="el-icon"><component :is="item.icon" /></i>
            {{ item.name }}
          </div>
          <i v-if="index != breadcrumbList.length - 1" class="el-icon separator"><ArrowRight /></i>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="theme-icon" @click="switchHandle">
        <i class="el-icon">
          <Moon v-if="themeConfig.isDark" />
          <Sunny v-if="!themeConfig.isDark" />
        </i>
      </div>
      <div class="userInfo">
        <div class="username">admin</div>
        <div class="portrait">
          <div class="loginOut flexCenter" @click.stop="loginOut">退出</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/store/index'
import { useTabsStore } from '~/store/modules/tabs'
import { useThemeHook } from '~/composables/useTheme'
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

const handleSelect = (key: string, index: number) => {
  const _len = breadcrumbList.value.length
  if (_len == 1 || (_len > 1 && index > 0)) return
  setMenuFunc(key)
  router.replace(key)
}

function setMenuFunc(key: string) {
  const item = routes.find((item) => item.path === key) as Record<string, unknown>
  useTabs.setMenuList(item)
}

function handleToggle() {
  useGlobal.handleToggle({ isCollapse: !isCollapse.value })
}

function switchHandle() {
  themeConfig.value.isDark = !themeConfig.value.isDark
  useTheme.switchDark()
}

function loginOut() {
  localStorage.removeItem('token')
  // 同步清理 cookie，支持服务端中间件校验
  const token = useCookie('token')
  if (token) token.value = null
  router.replace('/login')
}
</script>
<style lang="less" scoped>
@import url('~/assets/less/compHeader.less');
</style>
