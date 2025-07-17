export const useMenuStore = defineStore(
  'menu',
  () => {
    const isCollapse = ref(false) // 展开的
    const menuList = ref<Record<string, unknown>[]>([])

    function handleToggle() {
      isCollapse.value = !isCollapse.value
    }

    function setMenuList(item: Record<string, unknown>) {
      const _arr = menuList.value
      const _idx = _arr.findIndex((i) => i.path == item.path)
      if (_idx == -1) menuList.value.push(item)
    }

    return {
      isCollapse,
      menuList,

      handleToggle,
      setMenuList
    }
  },
  {
    persist: process.client && {
      storage: sessionStorage,
      pick: ['menuList']
    }
  }
)
