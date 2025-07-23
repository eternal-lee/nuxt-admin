// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore(
  'GlobalState',
  () => {
    // language
    const language = ref('')
    // themeConfig
    const themeConfig = ref({
      // 深色模式
      isDark: false,
      // 折叠菜单
      isCollapse: false
    })

    /**
     * 主题配置
     * @param config 单个配置属性
     */
    function handleToggle(config: Record<string, any>) {
      themeConfig.value = {
        ...themeConfig.value,
        ...config
      }
    }

    return {
      language,
      themeConfig,

      handleToggle
    }
  },
  {
    persist: process.client && {
      storage: sessionStorage,
      pick: ['themeConfig', 'isCollapse']
    }
  }
)
