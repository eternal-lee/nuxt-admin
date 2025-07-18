// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore(
  'GlobalState',
  () => {
    // token
    const token = ref('')
    // userInfo
    const userInfo = ref('')
    // language
    const language = ref('')
    // themeConfig
    const themeConfig = ref({
      // 深色模式
      isDark: false,
      // 折叠菜单
      isCollapse: false
    })

    return {
      token,
      userInfo,
      language,
      themeConfig
    }
  },
  {
    persist: process.client && {
      storage: sessionStorage
    }
  }
)
