export const useTabsStore = defineStore(
  'tabsStore',
  () => {
    const tabsMenuList = ref<Record<string, any>[]>([])

    const router = useRouter()

    /**
     * 设置路由缓存
     * @param item 路由信息
     */
    function setMenuList(item: Record<string, any>) {
      const _arr = tabsMenuList.value
      const _idx = _arr.findIndex((i) => i.path == item.path)
      if (_idx == -1) tabsMenuList.value.push(item)
    }

    /**
     * 移除tab
     * @param path 路径
     */
    function removeTabs(path: string, isCurrent: boolean = true) {
      const _tabsMenu = tabsMenuList.value
      if (isCurrent) {
        _tabsMenu.forEach((item, index) => {
          if (item.path !== path) return
          const nextTab = _tabsMenu[index + 1] || _tabsMenu[index - 1]
          if (!nextTab) return
          router.push(nextTab.path)
        })
      }
      tabsMenuList.value = _tabsMenu.filter((i) => i.path != path)
    }

    return {
      tabsMenuList,

      setMenuList,
      removeTabs
    }
  },
  {
    persist: process.client && {
      storage: sessionStorage
    }
  }
)
