export const useTabsStore = defineStore(
  'tabsStore',
  () => {
    const tabsMenuList = ref<Record<string, any>[]>([])

    /**
     * 设置路由缓存
     * @param item 路由信息
     */
    function setMenuList(item: Record<string, any>) {
      const _arr = tabsMenuList.value
      const _idx = _arr.findIndex((i) => i.path == item.path)
      if (_idx == -1) tabsMenuList.value.push(item)
    }

    return {
      tabsMenuList,

      setMenuList
    }
  },
  {
    persist: process.client && {
      storage: sessionStorage
    }
  }
)
