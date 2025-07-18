import { computed } from 'vue'
import { useGlobalStore } from '~/store/index'

/**
 * @description 切换主题
 * */
export const useThemeHook = () => {
  const globalStore = useGlobalStore()
  const themeConfig = computed(() => globalStore.themeConfig)

  // 切换暗黑模式
  const switchDark = () => {
    const body = document.documentElement as HTMLElement
    if (themeConfig.value.isDark) body.setAttribute('class', 'dark')
    else body.setAttribute('class', '')
  }

  // 初始化 theme 配置
  const initTheme = () => {
    switchDark()
  }

  return {
    themeConfig,

    initTheme,
    switchDark
  }
}
