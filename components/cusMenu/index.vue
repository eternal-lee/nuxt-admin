<template>
  <div class="aside-box">
    <div class="logo">
      <img src="~/assets/images/logo.png" class="icon" alt="" />
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

const router = useRouter()
const isCollapse = computed(() => themeConfig.value.isCollapse)

onMounted(() => {
  active.value = router.currentRoute.value.path || '/'
  setMenuFunc(active.value)
})

const handleSelect = (key: string) => {
  setMenuFunc(key)
  router.replace(key)
}

function setMenuFunc(key: string) {
  const item = routes.find((item) => item.path === key) as Record<string, unknown>
  useTabs.setMenuList(item)
}
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
    padding-left: 15px;

    .icon {
      width: 40px;
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
